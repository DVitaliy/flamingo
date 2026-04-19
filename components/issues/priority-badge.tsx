export function PriorityBadge({ priority, label }: { priority: string; label: string }) {
  const styles =
    priority === "high"
      ? "bg-red-100 text-red-700"
      : priority === "medium"
        ? "bg-amber-100 text-amber-700"
        : "bg-neutral-100 text-neutral-500";

  return (
    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${styles}`}>{label}</span>
  );
}
