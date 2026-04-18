import Image from "next/image";
import Link from "next/link";

import { IssuesPagination } from "@/components/issues/issues-pagination";
import { StatusFilters } from "@/components/issues/status-filters";
import { getIssues } from "@/lib/issues/get-issues";
import { issueStatusLabels, type IssueStatus } from "@/lib/issues/issue-enums";

import { IssuesListLiveUpdates } from "./issues-list-live-updates";

type Props = {
  searchParams: Promise<{
    status?: string | string[];
    after?: string;
  }>;
};

function normalizeStatuses(status?: string | string[]) {
  const values = Array.isArray(status) ? status : status ? [status] : [];

  return values.filter((value): value is IssueStatus => {
    return value in issueStatusLabels;
  });
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const statuses = normalizeStatuses(params.status);

  const after =
    typeof params.after === "string" && params.after.length > 0
      ? params.after
      : null;

  const issues = await getIssues({ statuses, after, first: 15 });

  return (
    <main className="p-6">
      <IssuesListLiveUpdates />
      <StatusFilters />
      <h1 className="mb-4 text-2xl font-semibold">Issues</h1>

      <div className="space-y-3">
        {issues.items.map((issue) => (
          <article key={issue.nodeId} className="flex rounded border p-4 gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
              {issue.users?.avatar_url && (
                <Image
                  src={issue.users.avatar_url}
                  alt={issue.users.name}
                  fill
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

              <p className="text-sm text-neutral-500">{issue.created_at}</p>

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
