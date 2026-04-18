import { graphql } from "react-relay";

export const createIssueLabelsMutation = graphql`
  mutation createIssueLabelsMutation($inputs: [issue_labelsInsertInput!]!) {
    insertIntoissue_labelsCollection(objects: $inputs) {
      records {
        issue_id
        label_id
      }
    }
  }
`;
