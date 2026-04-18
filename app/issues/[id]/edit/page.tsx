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
      <h1 className="mb-6 text-2xl font-semibold">Edit Issue</h1>
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
