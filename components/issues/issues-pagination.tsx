"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { issuesListQuery$data } from "@/__generated__/issuesListQuery.graphql.ts";

type Props = {
  pageInfo: NonNullable<issuesListQuery$data["issuesCollection"]>["pageInfo"];
};

export function IssuesPagination({ pageInfo }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const goToNextPage = () => {
    if (!pageInfo.hasNextPage || !pageInfo.endCursor) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("before");
    nextParams.set("after", pageInfo.endCursor);

    const nextUrl = `${pathname}?${nextParams.toString()}`;

    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
  };

  const goToPrevPage = () => {
    if (!pageInfo.hasPreviousPage || !pageInfo.startCursor) {
      return;
    }
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("after");
    nextParams.set("before", pageInfo.startCursor);

    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
  };

  const disabledPrev =
    !pageInfo.hasPreviousPage || !pageInfo.startCursor || isPending;
  const disabledNext =
    !pageInfo.hasNextPage || !pageInfo.endCursor || isPending;

  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        type="button"
        onClick={goToPrevPage}
        disabled={disabledPrev}
        className="rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-200 disabled:opacity-50"
      >
        Prev
      </button>

      <button
        type="button"
        onClick={goToNextPage}
        disabled={disabledNext}
        className="rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
