import { graphql } from "react-relay";

export const updateIssueLabelsRemoveMutation = graphql`
  mutation updateIssueLabelsRemoveMutation(
    $issueId: UUID!
    $labelIds: [UUID!]!
    $atMost: Int!
  ) {
    deleteFromissue_labelsCollection(
      filter: { issue_id: { eq: $issueId }, label_id: { in: $labelIds } }
      atMost: $atMost
    ) {
      records {
        issue_id
        label_id
      }
    }
  }
`;
