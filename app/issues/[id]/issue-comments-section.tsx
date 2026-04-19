"use client";

import Image from "next/image";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import type { IssueCommentsPaginationQuery } from "@/__generated__/IssueCommentsPaginationQuery.graphql";
import type { issueComments_comments$key } from "@/__generated__/issueComments_comments.graphql";
import type { issueCommentsQuery as IssueCommentsQueryType } from "@/__generated__/issueCommentsQuery.graphql";
import { formatDate } from "@/lib/format-date";

import {
  issueCommentsQuery,
  issueCommentsPaginationFragment,
} from "./issue-comments.query";

export function IssueCommentsSectionV2({
  issueId,
  refreshKey,
}: {
  issueId: string;
  refreshKey: number;
}) {
  const queryData = useLazyLoadQuery<IssueCommentsQueryType>(
    issueCommentsQuery,
    { issueId, first: 2 },
    { fetchPolicy: "store-and-network", fetchKey: refreshKey },
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    IssueCommentsPaginationQuery,
    issueComments_comments$key
  >(issueCommentsPaginationFragment, queryData);

  const collection = data.commentsCollection;
  const edges = collection?.edges ?? [];

  return (
    <>
      {edges.map((edge) => {
        if (!edge?.node) return null;
        const { node } = edge;
        return (
          <article
            key={node.id}
            className="rounded-lg border border-neutral-200 bg-neutral-50 p-4"
          >
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
              <span className="text-xs text-neutral-500">
                {formatDate(node.created_at)}
              </span>
            </div>
            <p className="text-sm text-neutral-800">{node.body}</p>
          </article>
        );
      })}
      {hasNext && (
        <button
          className="rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-200 disabled:opacity-50"
          disabled={isLoadingNext}
          onClick={() => {
            loadNext(3);
          }}
        >
          load more
        </button>
      )}
    </>
  );
}
