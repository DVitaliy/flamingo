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

  console.log("isLoadingNext", isLoadingNext);
  console.log("hasNext", hasNext);
  console.log("data", data);

  const collection = data.commentsCollection;
  const edges = collection?.edges ?? [];

  return (
    <>
      {edges.map((edge) => {
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
      <button
        className="border border-gray-300 disabled:bg-gray-400 px-2.5 py-1"
        disabled={isLoadingNext || !hasNext}
        onClick={() => {
          loadNext(3);
        }}
      >
        load
      </button>
    </>
  );
}

/*
const COMMENTS_PER_PAGE = 2;

type PageEntry = {
  cursor: string | null;
  fetchKey: number;
};

type CommentsPageProps = {
  issueId: string;
  after: string | null;
  fetchKey: number;
  isLast: boolean;
  onLoadMore: (cursor: string) => void;
};

function CommentsPage({
  issueId,
  after,
  fetchKey,
  isLast,
  onLoadMore,
}: CommentsPageProps) {
  const data = useLazyLoadQuery<IssueCommentsQueryType>(
    issueCommentsQuery,
    { issueId, first: COMMENTS_PER_PAGE, after },
    { fetchPolicy: "store-and-network", fetchKey },
  );

  const collection = data.commentsCollection;
  const edges = collection?.edges ?? [];
  const pageInfo = collection?.pageInfo;

  return (
    <>
      {edges.map((edge) => {
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

      {isLast && pageInfo?.hasNextPage && pageInfo.endCursor && (
        <button
          onClick={() => onLoadMore(pageInfo.endCursor!)}
          className="w-full rounded border px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-50"
        >
          Load more
        </button>
      )}
    </>
  );
}

type Props = {
  issueId: string;
  refreshKey: number;
};

export function IssueCommentsSection({ issueId, refreshKey }: Props) {
  const [pages, setPages] = useState<PageEntry[]>([
    { cursor: null, fetchKey: refreshKey },
  ]);

  const handleLoadMore = (cursor: string) => {
    setPages((prev) => [...prev, { cursor, fetchKey: Date.now() }]);
  };

  return (
    <div className="space-y-3">
      {pages.map((page, i) => (
        <Suspense
          key={page.cursor ?? "__initial__"}
          fallback={<p className="text-sm text-neutral-400">Loading...</p>}
        >
          <CommentsPage
            issueId={issueId}
            after={page.cursor}
            fetchKey={page.fetchKey}
            isLast={i === pages.length - 1}
            onLoadMore={handleLoadMore}
          />
        </Suspense>
      ))}
    </div>
  );
}
*/
