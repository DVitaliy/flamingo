"use server";

import { revalidatePath } from "next/cache";
import { updateIssueStatus } from "@/lib/issues/update-issue-status";

export async function toggleIssueStatusAction(id: string, currentStatus: string) {
  const nextStatus = currentStatus === "done" ? "todo" : "done";
  await updateIssueStatus(id, nextStatus);
  revalidatePath("/");
  revalidatePath(`/issues/${id}`);
}
