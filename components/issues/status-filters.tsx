"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { issueStatusOptions, type IssueStatus } from "@/lib/issues/issue-enums";

export function StatusFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selected = searchParams.get("status") as IssueStatus | null;

  const handleChange = (status: IssueStatus) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("after");
    nextParams.delete("before");

    if (selected === status) {
      nextParams.delete("status");
    } else {
      nextParams.set("status", status);
    }

    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
  };

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">Status</legend>
      <div className="flex flex-wrap gap-2">
        {issueStatusOptions.map((option) => {
          const checked = selected === option.value;
          return (
            <label
              key={option.value}
              className="cursor-pointer select-none"
              style={{ opacity: isPending ? 0.5 : 1 }}
            >
              <input
                type="radio"
                name="status"
                className="sr-only"
                checked={checked}
                onChange={() => handleChange(option.value)}
                disabled={isPending}
              />
              <span
                className={`flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  checked
                    ? "border-neutral-600 bg-neutral-600 text-white"
                    : "border-neutral-300 text-neutral-600"
                }`}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
