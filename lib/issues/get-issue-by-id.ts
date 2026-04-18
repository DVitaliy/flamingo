import issueDetailsQueryNode, {
  type issueDetailsQuery,
} from "@/__generated__/issueDetailsQuery.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";
import {
  issuePriorityLabels,
  issueStatusLabels,
} from "@/lib/issues/issue-enums";

type IssueDetailsResponse = issueDetailsQuery["response"];
type IssueDetailsVariables = issueDetailsQuery["variables"];

export async function getIssueById(id: string) {
  const data = await executeGraphQL<
    IssueDetailsResponse,
    IssueDetailsVariables
  >({
    query: issueDetailsQueryNode,
    variables: { id },
  });

  const node = data.issuesCollection?.edges?.[0]?.node;

  if (!node) {
    return null;
  }

  const normalized = {
    priority_normalized: issuePriorityLabels[node.priority],
    status_normalized: issueStatusLabels[node.status],
  };

  return {
    ...node,
    ...normalized,
  };
}
