import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";

import { PriorityBadge } from "@/components/issues/priority-badge";
import { getContrastTextColor } from "@/lib/color-contrast";
import { IssueStatusToggle } from "@/components/issues/issue-status-toggle";
import { formatDate } from "@/lib/format-date";
import { getIssueById } from "@/lib/issues/get-issue-by-id";

import { CommentListForm } from "./commentlist-form";

type Props = {
  params: Promise<{ id: string }>;
};

const issueIdSchema = z.uuid();

export default async function IssueDetailsPage({ params }: Props) {
  const { id } = await params;
  const parsedId = issueIdSchema.safeParse(id);

  if (!parsedId.success) notFound();

  const issue = await getIssueById(parsedId.data);

  if (!issue) notFound();

  const labels =
    issue.issue_labelsCollection?.edges?.flatMap((e) =>
      e?.node?.labels ? [e.node.labels] : [],
    ) ?? [];
  const priorityBg =
    issue.priority === "high"
      ? "bg-red-50"
      : issue.priority === "medium"
        ? "bg-amber-50"
        : "bg-neutral-50";

  return (
    <main className="max-w-3xl p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <IssueStatusToggle issueId={issue.id} status={issue.status} />
          <h1 className="text-2xl font-semibold">{issue.title}</h1>
        </div>
        <Link
          href={`/issues/${issue.id}/edit`}
          className="shrink-0 rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-200"
        >
          Edit
        </Link>
      </div>

      <div className={`mb-8 rounded-lg border border-neutral-200 ${priorityBg} p-4`}>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          <dt className="text-neutral-500">Priority</dt>
          <dd><PriorityBadge priority={issue.priority} label={issue.priority_normalized} /></dd>

          {issue.users && (
            <>
              <dt className="text-neutral-500">Assignee</dt>
              <dd className="flex items-center gap-2">
                {issue.users.avatar_url && (
                  <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={issue.users.avatar_url}
                      alt={issue.users.name}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="font-medium">{issue.users.name}</span>
              </dd>
            </>
          )}

          {labels.length > 0 && (
            <>
              <dt className="text-neutral-500">Labels</dt>
              <dd className="flex flex-wrap gap-1.5">
                {labels.map((label) => (
                  <span
                    key={label.id}
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: label.color, color: getContrastTextColor(label.color) }}
                  >
                    {label.name}
                  </span>
                ))}
              </dd>
            </>
          )}

          <dt className="text-neutral-500">Created</dt>
          <dd className="text-neutral-600">{formatDate(issue.created_at)}</dd>
        </dl>
      </div>

      {issue.description && (
        <div className="mb-8">
          <h2 className="mb-2 text-sm font-medium text-neutral-500">
            Description
          </h2>
          <p className="whitespace-pre-wrap text-sm text-neutral-800">
            {issue.description}
          </p>
        </div>
      )}

      <CommentListForm
        issueId={issue.id}
        totalCount={issue.commentsCollection?.totalCount ?? 0}
      />
    </main>
  );
}
