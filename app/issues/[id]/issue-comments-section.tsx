"use client";

import { useLazyLoadQuery } from "react-relay";
import type { issueCommentsQuery as IssueCommentsQueryType } from "@/__generated__/issueCommentsQuery.graphql";
import { issueCommentsQuery } from "./issue-comments.query";

type Props = {
  issueId: string;
};

export function IssueCommentsSection({ issueId }: Props) {
  const data = useLazyLoadQuery<IssueCommentsQueryType>(
    issueCommentsQuery,
    {
      issueId,
      first: 3,
      after: null,
    },
    {
      fetchPolicy: "store-and-network",
    },
  );

  const comments = data.commentsCollection;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Comments</h2>
        <p className="text-sm text-neutral-500">
          Total: {comments?.totalCount ?? 0}
        </p>
      </div>

      <div className="space-y-3">
        {comments?.edges?.map((edge) => {
          if (!edge?.node) {
            return null;
          }

          return (
            <article key={edge.node.id} className="rounded border p-4">
              <p className="text-sm text-neutral-800">{edge.node.body}</p>
              <p className="mt-2 text-xs text-neutral-500">
                {edge.node.created_at}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
