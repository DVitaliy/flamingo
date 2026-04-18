"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  issuePriorityValues,
  issueStatusValues,
} from "@/lib/issues/issue-enums";
import { updateIssue } from "@/lib/issues/update-issue";

const updateIssueSchema = z.object({
  id: z.uuid(),
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
  Record<keyof z.infer<typeof updateIssueSchema>, string>
>;

export type UpdateIssueActionState = {
  error: string | null;
  fieldErrors?: FieldErrors;
};

export async function updateIssueAction(
  _prevState: UpdateIssueActionState,
  formData: FormData,
): Promise<UpdateIssueActionState> {
  const parsed = updateIssueSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    assigneeId: formData.get("assigneeId"),
    labelIds: formData.getAll("labelId"),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten((i) => i.message).fieldErrors;
    const fieldErrors: FieldErrors = Object.fromEntries(
      Object.entries(flat).map(([k, v]) => [k, v?.[0]]),
    );
    return { error: null, fieldErrors };
  }

  try {
    await updateIssue({ ...parsed.data, labelIds: parsed.data.labelIds ?? [] });
  } catch (e) {
    console.error("updateIssueAction error", e);
    return { error: "Failed to update issue" };
  }

  revalidatePath(`/issues/${parsed.data.id}`);
  redirect(`/issues/${parsed.data.id}`);
}
