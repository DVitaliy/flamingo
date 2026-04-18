export const issueStatusValues = ["todo", "in_progress", "done"] as const;
export const issuePriorityValues = ["low", "medium", "high"] as const;

export type IssueStatus = (typeof issueStatusValues)[number];
export type IssuePriority = (typeof issuePriorityValues)[number];

export const issueStatusLabels: Record<IssueStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

export const issuePriorityLabels: Record<IssuePriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const issueStatusOptions = issueStatusValues.map((value) => ({
  value,
  label: issueStatusLabels[value],
}));

export const issuePriorityOptions = issuePriorityValues.map((value) => ({
  value,
  label: issuePriorityLabels[value],
}));
