"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Props = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export function IssuesPagination({ hasNextPage, endCursor }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const goToNextPage = () => {
    if (!hasNextPage || !endCursor) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("after", endCursor);

    const nextUrl = `${pathname}?${nextParams.toString()}`;

    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
  };

  const goToFirstPage = () => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("after");

    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
  };

  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        type="button"
        onClick={goToFirstPage}
        disabled={isPending}
        className="rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-200 disabled:opacity-50"
      >
        First page
      </button>

      <button
        type="button"
        onClick={goToNextPage}
        disabled={!hasNextPage || !endCursor || isPending}
        className="rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
