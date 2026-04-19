"use client";

import { useActionState } from "react";
import { useLazyLoadQuery } from "react-relay";

import type { usersListQuery as UsersListQueryType } from "@/__generated__/usersListQuery.graphql";
import { usersListQuery } from "@/app/users-list.query";
import { createCommentAction, type CreateCommentActionState } from "./actions";

type Props = {
  issueId: string;
};

const initialState: CreateCommentActionState = { error: null };

export function CommentForm({ issueId }: Props) {
  const [state, formAction, isPending] = useActionState(createCommentAction, initialState);

  const data = useLazyLoadQuery<UsersListQueryType>(
    usersListQuery,
    {},
    { fetchPolicy: "store-and-network" },
  );

  const users =
    data.usersCollection?.edges?.flatMap((e) => (e?.node ? [e.node] : [])) ?? [];

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <input type="hidden" name="issueId" value={issueId} />

      {users.length > 0 && (
        <div className="space-y-1.5">
          <label htmlFor="authorId" className="block text-sm font-medium">
            Comment as
          </label>
          <select
            id="authorId"
            name="authorId"
            defaultValue=""
            disabled={isPending}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300 disabled:opacity-50"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="body" className="block text-sm font-medium">
          Comment
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300 disabled:opacity-50"
          placeholder="Write a comment..."
          disabled={isPending}
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Add comment"}
      </button>
    </form>
  );
}
