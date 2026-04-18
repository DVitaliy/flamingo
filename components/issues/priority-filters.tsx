"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { issuePriorityOptions, type IssuePriority } from "@/lib/issues/issue-enums";

export function PriorityFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedPriorities = useMemo(() => {
    return new Set(searchParams.getAll("priority") as IssuePriority[]);
  }, [searchParams]);

  const handleChange = (priority: IssuePriority, checked: boolean) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    const current = nextParams.getAll("priority").filter(Boolean);

    nextParams.delete("priority");
    nextParams.delete("after");

    const next = checked
      ? Array.from(new Set([...current, priority]))
      : current.filter((v) => v !== priority);

    next.forEach((v) => nextParams.append("priority", v));

    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentUrl = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (nextUrl === currentUrl) return;

    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
  };

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">Priority</legend>
      <div className="flex flex-wrap gap-2">
        {issuePriorityOptions.map((option) => {
          const checked = selectedPriorities.has(option.value);
          return (
            <label
              key={option.value}
              className="cursor-pointer select-none"
              style={{ opacity: isPending ? 0.5 : 1 }}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={(e) => handleChange(option.value, e.target.checked)}
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
