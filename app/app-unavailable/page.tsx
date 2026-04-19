import Link from "next/link";

export default function AppUnavailablePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col justify-center px-6 py-16">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
          Application unavailable
        </p>
        <h1 className="mb-4 text-3xl font-semibold text-neutral-950">
          The application is temporarily unavailable
        </h1>
        <p className="mb-4 text-sm leading-6 text-neutral-700">
          The application received an error from the database and cannot
          continue right now.
        </p>
        <p className="mb-6 text-sm leading-6 text-neutral-700">
          The exact database error is intentionally not shown on this page.
          Please go through the full installation and setup steps again from the
          beginning.
        </p>

        <div className="mb-6 rounded-xl bg-white/80 p-4 text-sm text-neutral-800">
          <p className="font-medium">Recommended steps</p>
          <p>1. Re-run the database setup from `README.md`.</p>
          <p>2. Apply `supabase/schema.sql`.</p>
          <p>3. Apply `supabase/seed.sql` if sample data is needed.</p>
          <p>4. Run `pnpm schema:sync`.</p>
          <p>5. Restart the app or redeploy the project.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
          >
            Go to home
          </Link>
          <Link
            href="https://github.com/DVitaliy/flamingo/issues"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800"
          >
            Create GitHub issue
          </Link>
        </div>
      </div>
    </main>
  );
}
