import issueCommentsQueryNode, {
  type issueCommentsQuery,
} from "@/__generated__/issueCommentsQuery.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";

type CommentsResponse = issueCommentsQuery["response"];
type CommentsVariables = issueCommentsQuery["variables"];

type Edge = NonNullable<
  NonNullable<
    NonNullable<CommentsResponse["commentsCollection"]>["edges"]
  >[number]
>;

type CommentNode = Edge["node"];

export async function getIssueComments(
  issueId: string,
  {
    first = 10,
    after = null,
  }: {
    first?: number;
    after?: string | null;
  } = {},
): Promise<{
  items: CommentNode[];
  totalCount: number;
  pageInfo: NonNullable<
    NonNullable<CommentsResponse["commentsCollection"]>["pageInfo"]
  > | null;
}> {
  const data = await executeGraphQL<CommentsResponse, CommentsVariables>({
    query: issueCommentsQueryNode,
    variables: {
      issueId,
      first,
      after,
    },
  });

  const connection = data.commentsCollection;

  return {
    items:
      connection?.edges
        ?.map((edge) => edge?.node)
        .filter(
          (comment): comment is CommentNode =>
            comment !== null && comment !== undefined,
        ) || [],
    totalCount: connection?.totalCount ?? 0,
    pageInfo: connection?.pageInfo ?? null,
  };
}
