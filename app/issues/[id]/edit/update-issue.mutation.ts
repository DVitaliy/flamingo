import { graphql } from "react-relay";

export const updateIssueMutation = graphql`
  mutation updateIssueMutation($id: UUID!, $set: issuesUpdateInput!) {
    updateissuesCollection(filter: { id: { eq: $id } }, set: $set) {
      records {
        id
        nodeId
        title
        description
        status
        priority
        assignee_id
      }
    }
  }
`;
