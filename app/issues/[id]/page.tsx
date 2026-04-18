import { notFound } from "next/navigation";
import { z } from "zod";

import { getIssueById } from "@/lib/issues/get-issue-by-id";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const issueIdSchema = z.uuid();
export default async function IssueDetailsPage({ params }: Props) {
  const { id } = await params;
  const parsedId = issueIdSchema.safeParse(id);

  if (!parsedId.success) {
    notFound();
  }

  const issue = await getIssueById(parsedId.data);

  if (!issue) {
    notFound();
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">{issue.title}</h1>

      <div className="space-y-2">
        <p className="text-sm text-neutral-600">Status: {issue.status}</p>
        <p className="text-sm text-neutral-600">Priority: {issue.priority}</p>
        <p className="text-sm text-neutral-700">{issue.description}</p>
        <p className="text-xs text-neutral-500">Issue id: {issue.id}</p>
      </div>
    </main>
  );
}
