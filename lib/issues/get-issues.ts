import issuesListQueryNode, {
  type issuesListQuery,
} from "@/__generated__/issuesListQuery.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";
import type { IssueStatus } from "@/lib/issues/issue-enums";
import {
  issuePriorityLabels,
  issueStatusLabels,
} from "@/lib/issues/issue-enums";

type IssuesResponse = issuesListQuery["response"];
type IssuesVariables = issuesListQuery["variables"];

type GetIssuesParams = {
  statuses?: IssueStatus[];
  after?: string | null;
  first?: number;
};

export async function getIssues({
  statuses = [],
  after = null,
  first = 20,
}: GetIssuesParams = {}) {
  const variables: IssuesVariables = {
    first,
    after,
    filter:
      statuses.length > 0
        ? {
            status: {
              in: statuses,
            },
          }
        : undefined,
  };

  const data = await executeGraphQL<IssuesResponse, IssuesVariables>({
    query: issuesListQueryNode,
    variables,
  });

  const connection = data.issuesCollection;
  return {
    items:
      connection?.edges?.flatMap((edge) => {
        const node = edge?.node;

        if (!node) {
          return [];
        }

        return [
          {
            ...node,
            priority_normalized: issuePriorityLabels[node.priority],
            status_normalized: issueStatusLabels[node.status],
          },
        ];
      }) || [],
    pageInfo: connection?.pageInfo ?? null,
  };
}
