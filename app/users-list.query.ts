import { graphql } from "react-relay";

export const usersListQuery = graphql`
  query usersListQuery {
    usersCollection(first: 10) {
      edges {
        node {
          id
          nodeId
          name
          avatar_url
        }
      }
    }
  }
`;
