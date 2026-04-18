import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";

import { formatDate } from "@/lib/format-date";
import { getIssueById } from "@/lib/issues/get-issue-by-id";

import { CommentForm } from "./comment-form";
import { IssueCommentsSection } from "./issue-comments-section";

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

  return (
    <main className="max-w-3xl p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold">{issue.title}</h1>
        <Link
          href={`/issues/${issue.id}/edit`}
          className="shrink-0 rounded border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-50"
        >
          Edit
        </Link>
      </div>

      <div className="mb-8 rounded border p-4">
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          <dt className="text-neutral-500">Status</dt>
          <dd className="font-medium">{issue.status_normalized}</dd>

          <dt className="text-neutral-500">Priority</dt>
          <dd className="font-medium">{issue.priority_normalized}</dd>

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
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: label.color }}
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
          <h2 className="mb-2 text-sm font-medium text-neutral-500">Description</h2>
          <p className="whitespace-pre-wrap text-sm text-neutral-800">{issue.description}</p>
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Comments</h2>
        <IssueCommentsSection issueId={issue.id} />
        <CommentForm issueId={issue.id} />
      </section>
    </main>
  );
}
