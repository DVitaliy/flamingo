export function StatusIcon({ status }: { status: string }) {
  if (status === "done") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 text-purple-500"
        aria-label="Done"
      >
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
        <path
          d="M4.5 8.5L6.5 10.5L11.5 5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-neutral-400"
      aria-label="Todo"
    >
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
    </svg>
  );
}
