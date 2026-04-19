"use server";

import { revalidatePath } from "next/cache";
import { updateIssueStatus } from "@/lib/issues/update-issue-status";

type ActionResult = { success: true } | { success: false; error: string };

export async function toggleIssueStatusAction(
  id: string,
  currentStatus: string,
): Promise<ActionResult> {
  try {
    const nextStatus = currentStatus === "done" ? "todo" : "done";
    await updateIssueStatus(id, nextStatus);
    revalidatePath("/");
    revalidatePath(`/issues/${id}`);
    return { success: true };
  } catch (e) {
    console.error("toggleIssueStatusAction error", e);
    return { success: false, error: "Failed to update status" };
  }
}
