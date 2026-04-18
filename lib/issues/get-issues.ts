import type { issuesListQuery } from "@/__generated__/issuesListQuery.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";
import type { IssueStatus } from "@/lib/issues/issue-enums";

type IssueNode = NonNullable<
  NonNullable<
    NonNullable<issuesListQuery["response"]["issuesCollection"]>["edges"]
  >[number]
>["node"];

type IssuesResponse = issuesListQuery["response"];

type GetIssuesParams = {
  statuses?: IssueStatus[];
};

type IssuesVariables = {
  first: number;
  filter?: {
    status?: {
      in: IssueStatus[];
    };
  };
};

const query = `
  query issuesListQuery($first: Int!, $filter: issuesFilter) {
    issuesCollection(first: $first, filter: $filter) {
      edges {
        node {
          nodeId
          id
          title
          status
          priority
          created_at
        }
      }
    }
  }
`;

export async function getIssues({
  statuses = [],
}: GetIssuesParams = {}): Promise<IssueNode[]> {
  const variables: IssuesVariables = {
    first: 10,
  };

  if (statuses.length > 0) {
    variables.filter = {
      status: {
        in: statuses,
      },
    };
  }

  const data = await executeGraphQL<IssuesResponse, IssuesVariables>({
    query,
    variables,
  });

  return (
    data.issuesCollection?.edges
      ?.map((edge) => edge?.node)
      .filter(
        (issue): issue is IssueNode => issue !== null && issue !== undefined,
      ) || []
  );
}
