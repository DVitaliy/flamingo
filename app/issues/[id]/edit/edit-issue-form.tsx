"use client";

import { useActionState } from "react";
import { useLazyLoadQuery } from "react-relay";

import type { labelsListQuery as LabelsListQueryType } from "@/__generated__/labelsListQuery.graphql";
import type { usersListQuery as UsersListQueryType } from "@/__generated__/usersListQuery.graphql";
import type {
  issue_priority,
  issue_status,
} from "@/__generated__/issueDetailsQuery.graphql";
import { labelsListQuery } from "@/app/labels-list.query";
import { usersListQuery } from "@/app/users-list.query";
import { IssueForm } from "@/components/issues/issue-form";

import { updateIssueAction, type UpdateIssueActionState } from "./actions";

type Props = {
  issue: {
    id: string;
    title: string;
    description: string;
    status: issue_status;
    priority: issue_priority;
    assignee_id?: string | null;
    labelIds?: string[];
  };
};

const initialState: UpdateIssueActionState = { error: null };

export function EditIssueForm({ issue }: Props) {
  const [state, action, isPending] = useActionState(
    updateIssueAction,
    initialState,
  );

  const usersData = useLazyLoadQuery<UsersListQueryType>(
    usersListQuery,
    {},
    { fetchPolicy: "store-and-network" },
  );
  const labelsData = useLazyLoadQuery<LabelsListQueryType>(
    labelsListQuery,
    {},
    { fetchPolicy: "store-and-network" },
  );

  const users =
    usersData.usersCollection?.edges?.flatMap((e) =>
      e?.node ? [e.node] : [],
    ) ?? [];

  const labels =
    labelsData.labelsCollection?.edges?.flatMap((e) =>
      e?.node ? [e.node] : [],
    ) ?? [];

  return (
    <IssueForm
      action={action}
      error={state.error}
      fieldErrors={state.fieldErrors}
      isPending={isPending}
      submitLabel="Save changes"
      users={users}
      labels={labels}
      hiddenFields={{ id: issue.id }}
      defaultValues={{
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority,
        assigneeId: issue.assignee_id ?? undefined,
        labelIds: issue.labelIds,
      }}
    />
  );
}
