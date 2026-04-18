"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { issueStatusOptions, type IssueStatus } from "@/lib/issues/issue-enums";

export function StatusFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedStatuses = useMemo(() => {
    return new Set(searchParams.getAll("status") as IssueStatus[]);
  }, [searchParams]);

  const handleCheckedChange = (status: IssueStatus, checked: boolean) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    const currentStatuses = nextParams.getAll("status").filter(Boolean);

    nextParams.delete("status");

    const nextStatuses = checked
      ? Array.from(new Set([...currentStatuses, status]))
      : currentStatuses.filter((value) => value !== status);

    nextStatuses.forEach((value) => {
      nextParams.append("status", value);
    });

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <fieldset className="mb-4 space-y-2">
      <legend className="text-sm font-medium">Status</legend>

      {issueStatusOptions.map((option) => (
        <label key={option.value} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selectedStatuses.has(option.value)}
            onChange={(event) =>
              handleCheckedChange(option.value, event.target.checked)
            }
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
