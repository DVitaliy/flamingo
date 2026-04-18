"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FILTER_KEYS = ["status", "priority", "label"];

export function ClearFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const hasFilters = FILTER_KEYS.some((key) => searchParams.has(key));

  if (!hasFilters) return null;

  const handleClear = () => {
    const nextParams = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((key) => nextParams.delete(key));
    nextParams.delete("after");

    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(nextUrl);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleClear}
      disabled={isPending}
      className="flex items-center gap-1 rounded border border-neutral-300 px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-700 disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      Clear filters
    </button>
  );
}
