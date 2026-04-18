import { graphql } from "react-relay";

export const issuesListQuery = graphql`
  query issuesListQuery($first: Int!, $after: Cursor, $filter: issuesFilter) {
    issuesCollection(
      first: $first
      after: $after
      filter: $filter
      orderBy: [{ created_at: DescNullsLast }]
    ) {
      edges {
        cursor
        node {
          nodeId
          id
          title
          status
          priority
          created_at
          commentsCollection {
            totalCount
          }
          users {
            name
            avatar_url
          }
          issue_labelsCollection {
            edges {
              node {
                labels {
                  id
                  name
                  color
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
