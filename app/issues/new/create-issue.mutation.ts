import { graphql } from "react-relay";

export const createIssueMutation = graphql`
  mutation createIssueMutation($input: issuesInsertInput!) {
    insertIntoissuesCollection(objects: [$input]) {
      records {
        id
        nodeId
        title
        description
        status
        priority
        assignee_id
        created_at
      }
    }
  }
`;
