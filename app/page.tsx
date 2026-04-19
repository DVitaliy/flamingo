import Image from "next/image";
import Link from "next/link";

import { FiltersPanel } from "@/components/issues/filters-panel";
import { IssuesPagination } from "@/components/issues/issues-pagination";
import { getIssues } from "@/lib/issues/get-issues";
import { formatDate } from "@/lib/format-date";
import {
  issueStatusLabels,
  issuePriorityLabels,
  type IssueStatus,
  type IssuePriority,
} from "@/lib/issues/issue-enums";

import { IssuesListLiveUpdates } from "./issues-list-live-updates";

type Props = {
  searchParams: Promise<{
    status?: string | string[];
    priority?: string | string[];
    after?: string;
  }>;
};

function normalizeStatuses(status?: string | string[]) {
  const values = Array.isArray(status) ? status : status ? [status] : [];
  return values.filter((value): value is IssueStatus => value in issueStatusLabels);
}

function normalizePriority(priority?: string | string[]) {
  const values = Array.isArray(priority) ? priority : priority ? [priority] : [];
  return values.filter((value): value is IssuePriority => value in issuePriorityLabels);
}

function StatusIcon({ status }: { status: string }) {
  if (status === "done") {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0 text-purple-500" aria-label="Done">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
        <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "in_progress") {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0 text-yellow-500" aria-label="In progress">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
        <path d="M8 4.5V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0 text-neutral-400" aria-label="Todo">
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
    </svg>
  );
}

function PriorityBadge({ priority, label }: { priority: string; label: string }) {
  const styles =
    priority === "high"
      ? "bg-red-100 text-red-700"
      : priority === "medium"
        ? "bg-amber-100 text-amber-700"
        : "bg-neutral-100 text-neutral-500";

  return (
    <span className={`rounded px-1.5 py-0.5 font-medium ${styles}`}>{label}</span>
  );
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const statuses = normalizeStatuses(params.status);
  const priority = normalizePriority(params.priority);

  const after =
    typeof params.after === "string" && params.after.length > 0
      ? params.after
      : null;

  const issues = await getIssues({ statuses, priority, after, first: 15 });

  return (
    <main className="p-6">
      <IssuesListLiveUpdates />
      <FiltersPanel />
      <h1 className="my-4 text-2xl font-semibold">Issues</h1>

      <div className="space-y-1">
        {issues.items.map((issue) => {
          const priorityBg =
            issue.priority === "high"
              ? "bg-red-50 hover:bg-red-100"
              : issue.priority === "medium"
                ? "bg-amber-50 hover:bg-amber-100"
                : "bg-neutral-50 hover:bg-neutral-100";

          return (
          <article
            key={issue.nodeId}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 ${priorityBg}`}
          >
            <StatusIcon status={issue.status} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-base font-semibold hover:text-blue-600 hover:underline"
                >
                  {issue.title}
                </Link>
                {issue.issue_labelsCollection?.edges?.map(({ node }) => (
                  <span
                    key={node.labels.id}
                    style={{ backgroundColor: node.labels.color }}
                    className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                  >
                    {node.labels.name}
                  </span>
                ))}
              </div>
              <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
                <PriorityBadge priority={issue.priority} label={issue.priority_normalized} />
                <span>· opened {formatDate(issue.created_at)}</span>
              </p>
            </div>

            {(issue.commentsCollection?.totalCount ?? 0) > 0 && (
              <Link
                href={`/issues/${issue.id}`}
                className="flex shrink-0 items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700"
                title={`${issue.commentsCollection?.totalCount} comments`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
                </svg>
                {issue.commentsCollection?.totalCount}
              </Link>
            )}

            {issue.users?.avatar_url && (
              <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-gray-200" title={issue.users.name}>
                <Image
                  src={issue.users.avatar_url}
                  alt={issue.users.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
            )}
          </article>
          );
        })}
      </div>

      <IssuesPagination
        hasNextPage={issues.pageInfo?.hasNextPage ?? false}
        endCursor={issues.pageInfo?.endCursor ?? null}
      />
    </main>
  );
}
