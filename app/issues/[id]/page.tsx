import { notFound } from "next/navigation";
import { z } from "zod";

// import { getIssueComments } from "@/lib/issues/get-issue-comments";
import { getIssueById } from "@/lib/issues/get-issue-by-id";
import { CommentForm } from "./comment-form";
import { IssueCommentsSection } from "./issue-comments-section";

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

      <div className="mb-8 space-y-2">
        <p className="text-sm text-neutral-600">Status: {issue.status}</p>
        <p className="text-sm text-neutral-600">Priority: {issue.priority}</p>
        <p className="text-sm text-neutral-700">{issue.description}</p>
        <p className="text-xs text-neutral-500">Issue id: {issue.id}</p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Comments</h2>
          <p className="text-sm text-neutral-500">
            {/* Total: {comments.totalCount} */}
          </p>
        </div>
        <pre>{JSON.stringify(issue, null, 2)}</pre>
        <IssueCommentsSection issueId={issue.id} />

        <CommentForm issueId={issue.id} />
      </section>
    </main>
  );
}
