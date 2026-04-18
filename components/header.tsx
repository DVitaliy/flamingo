import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-3">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Flamingo
      </Link>
    </header>
  );
}
