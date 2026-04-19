"use client";

import { useTransition } from "react";
import { toggleIssueStatusAction } from "@/app/issues/toggle-status.action";
import { StatusIcon } from "./status-icon";

type Props = {
  issueId: string;
  status: string;
};

export function IssueStatusToggle({ issueId, status }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      toggleIssueStatusAction(issueId, status);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      title={status === "done" ? "Mark as todo" : "Mark as done"}
      className="shrink-0 transition-opacity disabled:opacity-40 hover:opacity-70"
    >
      <StatusIcon status={status} />
    </button>
  );
}
