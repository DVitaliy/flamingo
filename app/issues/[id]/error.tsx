"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function IssueDetailsError({ error, reset }: Props) {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Failed to load issue</h1>
      <p className="mb-4 text-sm text-neutral-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded border px-3 py-2 text-sm"
      >
        Try again
      </button>
    </main>
  );
}
