import Image from "next/image";
import Link from "next/link";

import { FiltersPanel } from "@/components/issues/filters-panel";
import { IssuesPagination } from "@/components/issues/issues-pagination";
import { getIssues } from "@/lib/issues/get-issues";
import {
  issueStatusLabels,
  issuePriorityLabels,
  type IssueStatus,
  type IssuePriority,
} from "@/lib/issues/issue-enums";
import { formatDate } from "@/lib/format-date";

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

  return values.filter((value): value is IssueStatus => {
    return value in issueStatusLabels;
  });
}

function normalizePriority(priority?: string | string[]) {
  const values = Array.isArray(priority)
    ? priority
    : priority
      ? [priority]
      : [];

  return values.filter((value): value is IssuePriority => {
    return value in issuePriorityLabels;
  });
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const statuses = normalizeStatuses(params.status);
  const priority = normalizePriority(params.priority);

  const after =
    typeof params.after === "string" && params.after.length > 0
      ? params.after
      : null;

  const issues = await getIssues({ statuses, priority, after, first: 2 });

  return (
    <main className="p-6">
      <IssuesListLiveUpdates />
      <FiltersPanel />
      <h1 className="my-4 text-2xl font-semibold">Issues</h1>

      <div className="space-y-3">
        {issues.items.map((issue) => (
          <article key={issue.nodeId} className="flex rounded border p-4 gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
              {issue.users?.avatar_url && (
                <Image
                  src={issue.users.avatar_url}
                  alt={issue.users.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="font-medium">
                <Link href={`/issues/${issue.id}`} className="hover:underline">
                  {issue.title}
                </Link>
              </h2>
              <p className="text-sm text-neutral-600">
                Status: {issue.status_normalized} · Priority:{" "}
                {issue.priority_normalized} · Comments:{" "}
                {issue.commentsCollection?.totalCount ?? 0}
              </p>

              <p className="text-sm text-neutral-500">
                Assigned: {issue.users?.name ?? "none"}
              </p>

              <p className="text-sm text-neutral-500">
                {formatDate(issue.created_at)}
              </p>

              {(issue.issue_labelsCollection?.edges?.length ?? 0) > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
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
              )}
            </div>
          </article>
        ))}
      </div>

      <IssuesPagination
        hasNextPage={issues.pageInfo?.hasNextPage ?? false}
        endCursor={issues.pageInfo?.endCursor ?? null}
      />
    </main>
  );
}
