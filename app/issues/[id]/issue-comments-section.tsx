"use client";

import Image from "next/image";
import { useLazyLoadQuery } from "react-relay";

import type { issueCommentsQuery as IssueCommentsQueryType } from "@/__generated__/issueCommentsQuery.graphql";
import { formatDate } from "@/lib/format-date";

import { issueCommentsQuery } from "./issue-comments.query";

type Props = {
  issueId: string;
};

export function IssueCommentsSection({ issueId }: Props) {
  const data = useLazyLoadQuery<IssueCommentsQueryType>(
    issueCommentsQuery,
    { issueId, first: 2, after: null },
    { fetchPolicy: "store-and-network" },
  );

  const comments = data.commentsCollection;

  if (!comments?.edges?.length) {
    return <p className="text-sm text-neutral-400">No comments yet.</p>;
  }

  return (
    <div className="space-y-3">
      {comments.edges.map((edge) => {
        if (!edge?.node) return null;
        const { node } = edge;

        return (
          <article key={node.id} className="rounded border p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-gray-200">
                {node.users?.avatar_url && (
                  <Image
                    src={node.users.avatar_url}
                    alt={node.users.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                )}
              </div>
              <span className="text-sm font-medium">
                {node.users?.name ?? "Unknown"}
              </span>
              <span className="text-xs text-neutral-400">
                {formatDate(node.created_at)}
              </span>
            </div>
            <p className="text-sm text-neutral-800">{node.body}</p>
          </article>
        );
      })}
    </div>
  );
}
