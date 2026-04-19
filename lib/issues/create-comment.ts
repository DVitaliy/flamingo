import createCommentMutationNode, {
  type createCommentMutation,
} from "@/__generated__/createCommentMutation.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";
// import { FALLBACK_AUTHOR_ID } from "@/lib/users/current-user";

type CreateCommentResponse = createCommentMutation["response"];
type CreateCommentVariables = createCommentMutation["variables"];

export async function createComment(input: { issueId: string; body: string }) {
  const data = await executeGraphQL<
    CreateCommentResponse,
    CreateCommentVariables
  >({
    query: createCommentMutationNode,
    variables: {
      input: {
        issue_id: input.issueId,
        body: input.body,
        // author_id: FALLBACK_AUTHOR_ID,
      },
    },
  });

  return data.insertIntocommentsCollection?.records?.[0] ?? null;
}
