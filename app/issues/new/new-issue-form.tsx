"use client";

import { useActionState } from "react";
import { useLazyLoadQuery } from "react-relay";

import type { labelsListQuery as LabelsListQueryType } from "@/__generated__/labelsListQuery.graphql";
import type { usersListQuery as UsersListQueryType } from "@/__generated__/usersListQuery.graphql";
import { labelsListQuery } from "@/app/labels-list.query";
import { usersListQuery } from "@/app/users-list.query";
import { IssueForm } from "@/components/issues/issue-form";

import { createIssueAction, type CreateIssueActionState } from "./actions";

const initialState: CreateIssueActionState = { error: null };

export function NewIssueForm() {
  const [state, action, isPending] = useActionState(createIssueAction, initialState);

  const usersData = useLazyLoadQuery<UsersListQueryType>(usersListQuery, {}, { fetchPolicy: "store-and-network" });
  const labelsData = useLazyLoadQuery<LabelsListQueryType>(labelsListQuery, {}, { fetchPolicy: "store-and-network" });

  const users =
    usersData.usersCollection?.edges?.flatMap((e) => (e?.node ? [e.node] : [])) ?? [];

  const labels =
    labelsData.labelsCollection?.edges?.flatMap((e) => (e?.node ? [e.node] : [])) ?? [];

  return (
    <IssueForm
      action={action}
      error={state.error}
      fieldErrors={state.fieldErrors}
      isPending={isPending}
      submitLabel="Create issue"
      users={users}
      labels={labels}
    />
  );
}
