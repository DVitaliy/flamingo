import createIssueMutationNode, {
  type createIssueMutation,
} from "@/__generated__/createIssueMutation.graphql";
import createIssueLabelsMutationNode, {
  type createIssueLabelsMutation,
} from "@/__generated__/createIssueLabelsMutation.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";
import type { IssuePriority, IssueStatus } from "@/lib/issues/issue-enums";

type CreateIssueResponse = createIssueMutation["response"];
type CreateIssueVariables = createIssueMutation["variables"];

type CreateIssueLabelsResponse = createIssueLabelsMutation["response"];
type CreateIssueLabelsVariables = createIssueLabelsMutation["variables"];

type CreateIssueInput = {
  title: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeId?: string;
  labelIds?: string[];
};

export async function createIssue(input: CreateIssueInput) {
  const issueData = await executeGraphQL<
    CreateIssueResponse,
    CreateIssueVariables
  >({
    query: createIssueMutationNode,
    variables: {
      input: {
        title: input.title,
        description: input.description ?? "",
        status: input.status,
        priority: input.priority,
        assignee_id: input.assigneeId ?? null,
      },
    },
  });

  const issue = issueData.insertIntoissuesCollection?.records?.[0] ?? null;

  if (!issue) {
    throw new Error("Failed to create issue");
  }

  if (input.labelIds && input.labelIds.length > 0) {
    await executeGraphQL<CreateIssueLabelsResponse, CreateIssueLabelsVariables>(
      {
        query: createIssueLabelsMutationNode,
        variables: {
          inputs: input.labelIds.map((labelId) => ({
            issue_id: issue.id,
            label_id: labelId,
          })),
        },
      },
    );
  }

  return issue;
}
