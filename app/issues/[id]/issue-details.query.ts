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
        }
      }
    }
  }
`;
