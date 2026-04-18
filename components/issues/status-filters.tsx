"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { issueStatusOptions, type IssueStatus } from "@/lib/issues/issue-enums";

export function StatusFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedStatuses = useMemo(() => {
    return new Set(searchParams.getAll("status") as IssueStatus[]);
  }, [searchParams]);

  const handleCheckedChange = (status: IssueStatus, checked: boolean) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    const currentStatuses = nextParams.getAll("status").filter(Boolean);

    nextParams.delete("status");
    nextParams.delete("after");

    const nextStatuses = checked
      ? Array.from(new Set([...currentStatuses, status]))
      : currentStatuses.filter((value) => value !== status);

    nextStatuses.forEach((value) => {
      nextParams.append("status", value);
    });

    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentUrl = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (nextUrl === currentUrl) {
      return;
    }

    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
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
            disabled={isPending}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
