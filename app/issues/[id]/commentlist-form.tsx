"use client";

import { CommentForm } from "./comment-form";
import { IssueCommentsSectionV2 } from "./issue-comments-section";
import { useState } from "react";

type Props = {
  issueId: string;
  totalCount: number;
};
export function CommentListForm({ issueId, totalCount }: Props) {
  const [total, setTotal] = useState(totalCount);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Comments {total}</h2>
      {/* <IssueCommentsSection issueId={issueId} refreshKey={totalCount}
            /> */}
      <IssueCommentsSectionV2 issueId={issueId} refreshKey={total} />
      <br />
      <button onClick={() => setTotal((prev) => prev + 1)}>
        increment total
      </button>
      <CommentForm issueId={issueId} />
    </section>
  );
}
