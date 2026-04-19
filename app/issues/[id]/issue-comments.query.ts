import { graphql } from "react-relay";

export const issueCommentsQuery = graphql`
  query issueCommentsQuery($issueId: UUID!, $first: Int!, $after: Cursor) {
    commentsCollection(
      first: $first
      after: $after
      filter: { issue_id: { eq: $issueId } }
      orderBy: [{ created_at: DescNullsLast }]
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          body
          created_at
          author_id
          users {
            name
            avatar_url
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
