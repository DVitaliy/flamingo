import { graphql } from "react-relay";

export const issuesListQuery = graphql`
  query issuesListQuery {
    issuesCollection(first: 10) {
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
