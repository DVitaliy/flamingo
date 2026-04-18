import { graphql } from "react-relay";

export const updateIssueLabelsAddMutation = graphql`
  mutation updateIssueLabelsAddMutation($inputs: [issue_labelsInsertInput!]!) {
    insertIntoissue_labelsCollection(objects: $inputs) {
      records {
        issue_id
        label_id
      }
    }
  }
`;
