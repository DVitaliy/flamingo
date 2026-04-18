import { graphql } from "react-relay";

export const labelsListQuery = graphql`
  query labelsListQuery {
    labelsCollection {
      edges {
        node {
          id
          name
          color
        }
      }
    }
  }
`;
