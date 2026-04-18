"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createComment } from "@/lib/issues/create-comment";

const createCommentSchema = z.object({
  issueId: z.uuid(),
  body: z
    .string()
    .trim()
    .min(1, "Comment is required")
    .max(1000, "Comment is too long"),
});

export type CreateCommentActionState = {
  error: string | null;
};

export async function createCommentAction(
  _prevState: CreateCommentActionState,
  formData: FormData,
) {
  const parsed = createCommentSchema.safeParse({
    issueId: formData.get("issueId"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];

    return {
      error: firstIssue?.message ?? "Invalid form data",
    };
  }

  await createComment({
    issueId: parsed.data.issueId,
    body: parsed.data.body,
  });

  revalidatePath(`/issues/${parsed.data.issueId}`);

  return {
    error: null,
  };
}
