import updateIssueMutationNode, {
  type updateIssueMutation,
} from "@/__generated__/updateIssueMutation.graphql";
import updateIssueLabelsAddMutationNode, {
  type updateIssueLabelsAddMutation,
} from "@/__generated__/updateIssueLabelsAddMutation.graphql";
import updateIssueLabelsRemoveMutationNode, {
  type updateIssueLabelsRemoveMutation,
} from "@/__generated__/updateIssueLabelsRemoveMutation.graphql";
import { executeGraphQL } from "@/lib/graphql/execute-graphql";
import type { IssuePriority, IssueStatus } from "@/lib/issues/issue-enums";
import { getIssueById } from "@/lib/issues/get-issue-by-id";

type UpdateIssueInput = {
  id: string;
  title: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeId?: string;
  labelIds?: string[];
};

type UpdateIssueResponse = updateIssueMutation["response"];
type UpdateIssueVariables = updateIssueMutation["variables"];

type UpdateIssueLabelsAddResponse = updateIssueLabelsAddMutation["response"];
type UpdateIssueLabelsAddVariables = updateIssueLabelsAddMutation["variables"];

type UpdateIssueLabelsRemoveResponse =
  updateIssueLabelsRemoveMutation["response"];
type UpdateIssueLabelsRemoveVariables =
  updateIssueLabelsRemoveMutation["variables"];

export async function updateIssue(input: UpdateIssueInput) {
  const existingIssue = await getIssueById(input.id);

  if (!existingIssue) {
    throw new Error("Issue not found");
  }

  const currentLabelIds =
    existingIssue.issue_labelsCollection?.edges?.flatMap((edge) => {
      const labelId = edge?.node?.labels?.id;

      return labelId ? [labelId] : [];
    }) ?? [];

  const nextLabelIds = Array.from(new Set(input.labelIds ?? []));

  const labelsToAdd = nextLabelIds.filter(
    (labelId) => !currentLabelIds.includes(labelId),
  );
  const labelsToRemove = currentLabelIds.filter(
    (labelId) => !nextLabelIds.includes(labelId),
  );

  const issueData = await executeGraphQL<
    UpdateIssueResponse,
    UpdateIssueVariables
  >({
    query: updateIssueMutationNode,
    variables: {
      id: input.id,
      set: {
        title: input.title,
        description: input.description ?? "",
        status: input.status,
        priority: input.priority,
        assignee_id: input.assigneeId ?? null,
      },
    },
  });

  const issue = issueData.updateissuesCollection?.records?.[0] ?? null;

  if (!issue) {
    throw new Error("Failed to update issue");
  }

  if (labelsToAdd.length > 0) {
    await executeGraphQL<
      UpdateIssueLabelsAddResponse,
      UpdateIssueLabelsAddVariables
    >({
      query: updateIssueLabelsAddMutationNode,
      variables: {
        inputs: labelsToAdd.map((labelId) => ({
          issue_id: input.id,
          label_id: labelId,
        })),
      },
    });
  }

  if (labelsToRemove.length > 0) {
    await executeGraphQL<
      UpdateIssueLabelsRemoveResponse,
      UpdateIssueLabelsRemoveVariables
    >({
      query: updateIssueLabelsRemoveMutationNode,
      variables: {
        issueId: input.id,
        labelIds: labelsToRemove,
        atMost: labelsToRemove.length,
      },
    });
  }

  return issue;
}
