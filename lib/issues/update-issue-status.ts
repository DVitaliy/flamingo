import updateIssueMutationNode, {
  type updateIssueMutation,
} from "@/__generated__/updateIssueMutation.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";

type Response = updateIssueMutation["response"];
type Variables = updateIssueMutation["variables"];

export async function updateIssueStatus(id: string, status: "todo" | "done") {
  await executeGraphQL<Response, Variables>({
    query: updateIssueMutationNode,
    variables: {
      id,
      set: { status },
    },
  });
}
