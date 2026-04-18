import Link from "next/link";

import { StatusFilters } from "@/components/issues/status-filters";
import { getIssues } from "@/lib/issues/get-issues";
import { issueStatusValues, type IssueStatus } from "@/lib/issues/issue-enums";

import { IssuesListLiveUpdates } from "./issues-list-live-updates";

type Props = {
  searchParams: Promise<{
    status?: string | string[];
  }>;
};

function normalizeStatuses(status?: string | string[]): IssueStatus[] {
  const values = Array.isArray(status) ? status : status ? [status] : [];

  return values.filter((value): value is IssueStatus => {
    return issueStatusValues.includes(value as IssueStatus);
  });
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const statuses = normalizeStatuses(params.status);
  const issues = await getIssues({ statuses });

  return (
    <main className="p-6">
      <IssuesListLiveUpdates />
      <StatusFilters />
      <h1 className="mb-4 text-2xl font-semibold">Issues</h1>

      <div className="space-y-3">
        {issues.map((issue) => (
          <article key={issue.nodeId} className="rounded border p-4">
            <h2 className="font-medium">
              <Link href={`/issues/${issue.id}`} className="hover:underline">
                {issue.title}
              </Link>
            </h2>
            <p className="text-sm text-neutral-600">
              Status: {issue.status} · Priority: {issue.priority}
            </p>
            <p className="text-sm text-neutral-500">{issue.created_at}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
