"use client";

import { useState } from "react";

import {
  type IssuePriority,
  type IssueStatus,
  issuePriorityOptions,
  issueStatusOptions,
} from "@/lib/issues/issue-enums";

type User = { id: string; name: string };
type Label = { id: string; name: string; color: string };

type DefaultValues = {
  title?: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  assigneeId?: string | null;
  labelIds?: string[];
};

type FieldErrors = Partial<Record<
  "title" | "description" | "status" | "priority" | "assigneeId" | "labelIds",
  string
>>;

type Props = {
  defaultValues?: DefaultValues;
  users?: User[];
  labels?: Label[];
  error?: string | null;
  fieldErrors?: FieldErrors;
  isPending?: boolean;
  submitLabel?: string;
  action: (payload: FormData) => void;
};

export function IssueForm({
  defaultValues = {},
  users = [],
  labels = [],
  error,
  fieldErrors,
  isPending,
  submitLabel = "Create issue",
  action,
}: Props) {
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(
    () => new Set(defaultValues.labelIds ?? []),
  );

  const toggleLabel = (id: string) => {
    setSelectedLabels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={defaultValues.title}
          disabled={isPending}
          placeholder="Issue title"
          className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-50"
        />
        {fieldErrors?.title && (
          <p className="text-xs text-red-600">{fieldErrors.title}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={defaultValues.description}
          disabled={isPending}
          placeholder="Add a description..."
          className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-50"
        />
        {fieldErrors?.description && (
          <p className="text-xs text-red-600">{fieldErrors.description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="space-y-1.5">
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues.status ?? "todo"}
            disabled={isPending}
            className="rounded border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-50"
          >
            {issueStatusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="priority" className="block text-sm font-medium">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue={defaultValues.priority ?? "medium"}
            disabled={isPending}
            className="rounded border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-50"
          >
            {issuePriorityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {users.length > 0 && (
          <div className="space-y-1.5">
            <label htmlFor="assigneeId" className="block text-sm font-medium">
              Assignee
            </label>
            <select
              id="assigneeId"
              name="assigneeId"
              defaultValue={defaultValues.assigneeId ?? ""}
              disabled={isPending}
              className="rounded border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-50"
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {labels.length > 0 && (
        <div className="space-y-1.5">
          <span className="block text-sm font-medium">Labels</span>
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => {
              const checked = selectedLabels.has(label.id);
              return (
                <button
                  key={label.id}
                  type="button"
                  disabled={isPending}
                  onClick={() => toggleLabel(label.id)}
                  className="rounded-full border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50"
                  style={{
                    borderColor: label.color,
                    backgroundColor: checked ? label.color : "transparent",
                    color: checked ? "#fff" : label.color,
                  }}
                >
                  {label.name}
                </button>
              );
            })}
          </div>
          {Array.from(selectedLabels).map((id) => (
            <input key={id} type="hidden" name="labelId" value={id} />
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded border bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
