"use client";

import { useActionState } from "react";

import { createCommentAction, type CreateCommentActionState } from "./actions";

type Props = {
  issueId: string;
};

const initialState: CreateCommentActionState = {
  error: null,
};

export function CommentForm({ issueId }: Props) {
  const [state, formAction, isPending] = useActionState(
    createCommentAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3 rounded border p-4">
      <input type="hidden" name="issueId" value={issueId} />

      <div className="space-y-2">
        <label htmlFor="body" className="block text-sm font-medium">
          New comment
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          className="w-full rounded border px-3 py-2 text-sm"
          placeholder="Write a comment..."
          disabled={isPending}
        />
      </div>

      {state.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded border px-3 py-2 text-sm disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Add comment"}
      </button>
    </form>
  );
}
