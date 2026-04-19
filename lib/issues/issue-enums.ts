import type {
  issue_priority,
  issue_status,
} from "@/__generated__/issueDetailsQuery.graphql";

export const issueStatusValues = ["todo", "done"] as const;
export const issuePriorityValues = ["low", "medium", "high"] as const;

export type IssueStatus = (typeof issueStatusValues)[number];
export type IssuePriority = (typeof issuePriorityValues)[number];

export const issueStatusLabels: Record<issue_status, string> = {
  todo: "To do",
  done: "Done",
  "%future added value": "Unknown",
};

export const issuePriorityLabels: Record<issue_priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  "%future added value": "Unknown",
};

export const issueStatusOptions = issueStatusValues.map((value) => ({
  value,
  label: issueStatusLabels[value],
}));

export const issuePriorityOptions = issuePriorityValues.map((value) => ({
  value,
  label: issuePriorityLabels[value],
}));
