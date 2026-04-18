"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLazyLoadQuery } from "react-relay";

import type { labelsListQuery as LabelsListQueryType } from "@/__generated__/labelsListQuery.graphql";
import { labelsListQuery } from "@/app/labels-list.query";

export function LabelFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const data = useLazyLoadQuery<LabelsListQueryType>(
    labelsListQuery,
    {},
    { fetchPolicy: "store-and-network" },
  );

  const labels =
    data.labelsCollection?.edges?.flatMap((edge) => {
      const node = edge?.node;
      return node ? [node] : [];
    }) ?? [];

  const selectedLabels = useMemo(
    () => new Set(searchParams.getAll("label")),
    [searchParams],
  );

  const handleChange = (id: string, checked: boolean) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    const current = nextParams.getAll("label").filter(Boolean);

    nextParams.delete("label");
    nextParams.delete("after");

    const next = checked
      ? Array.from(new Set([...current, id]))
      : current.filter((v) => v !== id);

    next.forEach((v) => nextParams.append("label", v));

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

  if (labels.length === 0) return null;

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">Labels</legend>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => {
          const checked = selectedLabels.has(label.id);
          return (
            <label
              key={label.id}
              className="cursor-pointer select-none"
              style={{ opacity: isPending ? 0.5 : 1 }}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={(e) => handleChange(label.id, e.target.checked)}
                disabled={isPending}
              />
              <span
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
                style={{
                  borderColor: label.color,
                  backgroundColor: checked ? label.color : "transparent",
                  color: checked ? "#fff" : label.color,
                }}
              >
                {label.name}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
