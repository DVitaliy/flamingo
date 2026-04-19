import { graphql } from "react-relay";

export const issueCommentsQuery = graphql`
  query issueCommentsQuery($issueId: UUID!, $first: Int!, $after: Cursor) {
    ...issueComments_comments
      @arguments(issueId: $issueId, first: $first, after: $after)
  }
`;

export const issueCommentsPaginationFragment = graphql`
  fragment issueComments_comments on Query
  @argumentDefinitions(
    issueId: { type: "UUID!" }
    first: { type: "Int!" }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "IssueCommentsPaginationQuery") {
    commentsCollection(
      first: $first
      after: $after
      filter: { issue_id: { eq: $issueId } }
      orderBy: [{ created_at: DescNullsFirst }]
    ) @connection(key: "issueComments_commentsCollection") {
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
        endCursor
      }
    }
  }
`;

// export const issueCommentsQuery = graphql`
//   query issueCommentsQuery($issueId: UUID!, $first: Int!, $after: Cursor) {
//     commentsCollection(
//       first: $first
//       after: $after
//       filter: { issue_id: { eq: $issueId } }
//       orderBy: [{ created_at: AscNullsFirst }]
//     ) {
//       totalCount
//       edges {
//         cursor
//         node {
//           id
//           body
//           created_at
//           author_id
//           users {
//             name
//             avatar_url
//           }
//         }
//       }
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//     }
//   }
// `;
