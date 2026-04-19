"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createComment } from "@/lib/issues/create-comment";

const createCommentSchema = z.object({
  issueId: z.uuid(),
  authorId: z
    .uuid()
    .optional()
    .or(z.literal("").transform(() => undefined)),
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
    authorId: formData.get("authorId"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];

    return {
      error: firstIssue?.message ?? "Invalid form data",
    };
  }

  const result = await createComment({
    issueId: parsed.data.issueId,
    authorId: parsed.data.authorId,
    body: parsed.data.body,
  });
  console.log("Created comment:", result);
  revalidatePath(`/issues/${parsed.data.issueId}`);

  return {
    error: null,
  };
}
