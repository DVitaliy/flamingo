"use client";

import { CommentForm } from "./comment-form";
import { IssueCommentsSectionV2 } from "./issue-comments-section";

type Props = {
  issueId: string;
  totalCount: number;
};
export function CommentListForm({ issueId, totalCount }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs text-gray-500">
        Comments <span className="text-sm font-bold ">{totalCount}</span>
      </h2>
      <IssueCommentsSectionV2 issueId={issueId} refreshKey={totalCount} />
      <CommentForm issueId={issueId} />
    </section>
  );
}
