"use client";

import { useOptimistic, useRef, useState, useTransition } from "react";
import { toggleIssueStatusAction } from "@/app/issues/toggle-status.action";
import { StatusIcon } from "./status-icon";

type Props = {
  issueId: string;
  status: string;
};

export function IssueStatusToggle({ issueId, status }: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);
  const [error, setError] = useState<string | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    const prevStatus = optimisticStatus;
    const nextStatus = prevStatus === "done" ? "todo" : "done";

    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setError(null);

    startTransition(async () => {
      setOptimisticStatus(nextStatus);

      const result = await toggleIssueStatusAction(issueId, prevStatus);

      if (!result.success) {
        setOptimisticStatus(prevStatus);
        setError(result.error);
        errorTimerRef.current = setTimeout(() => setError(null), 4000);
      }
    });
  };

  return (
    <span className="relative shrink-0">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        title={optimisticStatus === "done" ? "Mark as todo" : "Mark as done"}
        className="flex transition-opacity disabled:opacity-40 hover:opacity-70"
      >
        <StatusIcon status={optimisticStatus} />
      </button>
      {error && (
        <span className="absolute left-6 top-0 z-10 whitespace-nowrap rounded bg-red-100 px-2 py-0.5 text-xs text-red-700 shadow-sm">
          {error}
        </span>
      )}
    </span>
  );
}
