import { graphql } from "react-relay";

export const createCommentMutation = graphql`
  mutation createCommentMutation($input: commentsInsertInput!) {
    insertIntocommentsCollection(objects: [$input]) {
      records {
        id
        issue_id
        body
        created_at
        author_id
      }
    }
  }
`;
