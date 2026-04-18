import { graphql } from "react-relay";

export const issueDetailsQuery = graphql`
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
          assignee_id
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
    }
  }
`;
