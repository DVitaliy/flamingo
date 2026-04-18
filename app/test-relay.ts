import { graphql } from "react-relay";

export const testQuery = graphql`
  query testRelayQuery {
    issuesCollection(first: 1) {
      edges {
        node {
          id
          nodeId
          title
        }
      }
    }
  }
`;
