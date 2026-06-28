import Link from "next/link";
import { AiOutlineLock } from "react-icons/ai";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background text-foreground px-6 py-10">
      <div className="w-full max-w-4xl rounded-[2rem] border border-separator bg-surface/90 p-10 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#c1121f]/10 text-[#c1121f] shadow-lg shadow-[#c1121f]/20">
            <AiOutlineLock className="h-10 w-10" />
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Access Denied</p>
            <h1 className="text-4xl font-bold sm:text-5xl">Unauthorized</h1>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted sm:text-base">
              You don’t have permission to view this page. Sign in with an authorized account or contact support if you believe this is an error.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2">
            <Link
              href="/signin"
              className="inline-flex items-center justify-center rounded-full bg-[#c1121f] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#a10f1d]"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-separator bg-transparent px-8 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Return Home
            </Link>
          </div>

          <div className="grid w-full gap-3 text-sm text-muted sm:grid-cols-3">
            <Link href="/all-appointments" className="hover:text-primary transition">
              Donation Requests
            </Link>
            <Link href="/search-donor" className="hover:text-primary transition">
              Search Donor
            </Link>
            <Link href="/contact" className="hover:text-primary transition">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
