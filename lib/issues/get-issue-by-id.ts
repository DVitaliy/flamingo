import type { issueDetailsQuery } from "@/__generated__/issueDetailsQuery.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";

type IssueNode = NonNullable<
  NonNullable<
    NonNullable<issueDetailsQuery["response"]["issuesCollection"]>["edges"]
  >[number]
>["node"];

type IssueDetailsResponse = issueDetailsQuery["response"];

const query = `
  query issueDetailsQuery($id: UUID!) {
    issuesCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          id
          nodeId
          title
          description
          status
          priority
        }
      }
    }
  }
`;

export async function getIssueById(id: string): Promise<IssueNode | null> {
  const data = await executeGraphQL<IssueDetailsResponse, { id: string }>({
    query,
    variables: { id },
  });

  return data.issuesCollection?.edges?.[0]?.node ?? null;
}
