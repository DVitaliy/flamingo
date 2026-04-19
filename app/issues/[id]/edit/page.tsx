import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";

import { getIssueById } from "@/lib/issues/get-issue-by-id";

import { EditIssueForm } from "./edit-issue-form";

type Props = {
  params: Promise<{ id: string }>;
};

const issueIdSchema = z.uuid();

export default async function EditIssuePage({ params }: Props) {
  const { id } = await params;
  const parsedId = issueIdSchema.safeParse(id);

  if (!parsedId.success) notFound();

  const issue = await getIssueById(parsedId.data);

  if (!issue) notFound();

  const labelIds =
    issue.issue_labelsCollection?.edges?.flatMap((e) =>
      e?.node?.labels?.id ? [e.node.labels.id] : [],
    ) ?? [];

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href={`/issues/${parsedId.data}`}
          className="flex items-center text-neutral-400 transition-colors hover:text-neutral-900"
          title="Back to issue"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold">Edit Issue</h1>
      </div>
      <div className="max-w-xl">
        <EditIssueForm
          issue={{
            id: issue.id,
            title: issue.title,
            description: issue.description,
            status: issue.status,
            priority: issue.priority,
            assignee_id: issue.assignee_id,
            labelIds,
          }}
        />
      </div>
    </main>
  );
}
