"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createIssue } from "@/lib/issues/create-issue";
import {
  issuePriorityValues,
  issueStatusValues,
} from "@/lib/issues/issue-enums";

const createIssueSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title is too long"),
  description: z
    .string()
    .trim()
    .max(10000, "Description is too long")
    .optional(),
  status: z.enum(issueStatusValues),
  priority: z.enum(issuePriorityValues),
  assigneeId: z
    .uuid()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  labelIds: z.array(z.uuid()).optional(),
});

export type FieldErrors = Partial<
  Record<keyof z.infer<typeof createIssueSchema>, string>
>;

export type CreateIssueActionState = {
  error: string | null;
  fieldErrors?: FieldErrors;
};

export async function createIssueAction(
  _prevState: CreateIssueActionState,
  formData: FormData,
): Promise<CreateIssueActionState> {
  const parsed = createIssueSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    assigneeId: formData.get("assigneeId"),
    labelIds: formData.getAll("labelId"),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten((issue) => issue.message).fieldErrors;

    const fieldErrors: FieldErrors = Object.fromEntries(
      Object.entries(flat).map(([key, value]) => [key, value?.[0]]),
    );

    return {
      error: null,
      fieldErrors,
    };
  }

  let issue: Awaited<ReturnType<typeof createIssue>>;

  try {
    issue = await createIssue({
      title: parsed.data.title,
      description: parsed.data.description,
      status: parsed.data.status,
      priority: parsed.data.priority,
      assigneeId: parsed.data.assigneeId,
      labelIds: parsed.data.labelIds,
    });
  } catch (error) {
    console.error("createIssueAction error", error);

    return {
      error: "Failed to create issue",
    };
  }

  if (!issue) {
    return {
      error: "Failed to create issue",
    };
  }

  redirect(`/issues/${issue.id}`);
}
