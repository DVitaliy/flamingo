"use client";

import { useState } from "react";

import { ClearFilters } from "./clear-filters";
import { LabelFilters } from "./label-filters";
import { PriorityFilters } from "./priority-filters";
import { StatusFilters } from "./status-filters";

export function FiltersPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1.5 rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filters
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
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <ClearFilters />
      </div>

      <div
        className={`grid transition-all duration-200 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <StatusFilters />
            <PriorityFilters />
            <LabelFilters />
          </div>
        </div>
      </div>
    </div>
  );
}
