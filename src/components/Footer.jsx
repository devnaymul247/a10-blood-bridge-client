"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background/70 text-foreground border-t border-separator">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-divider bg-surface/70">
                <Image src="/blood-bridge-logo.webp" alt="BloodBridge logo" fill className="object-contain" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-foreground">BloodBridge</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Donate · Request · Save Lives</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">
              BloodBridge connects donors, patients, and care teams with urgent blood requests across your community.
              Search donors, post requests, and help save lives faster.
            </p>
            <div className="flex items-center gap-3">
              <Link href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-full border border-divider bg-surface/70 p-3 text-foreground transition hover:border-primary hover:text-primary">
                <FaFacebookF className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-full border border-divider bg-surface/70 p-3 text-foreground transition hover:border-primary hover:text-primary">
                <FaTwitter className="h-4 w-4" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-divider bg-surface/70 p-3 text-foreground transition hover:border-primary hover:text-primary">
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-divider bg-surface/70 p-3 text-foreground transition hover:border-primary hover:text-primary">
                <FaLinkedinIn className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Quick links
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/" className="text-foreground hover:text-primary transition">Home</Link>
              </li>
              <li>
                <Link href="/all-appointments" className="text-foreground hover:text-primary transition">Donation Requests</Link>
              </li>
              <li>
                <Link href="/search-donor" className="text-foreground hover:text-primary transition">Search Donor</Link>
              </li>
              <li>
                <Link href="/signup" className="text-foreground hover:text-primary transition">Become Donor</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/signin" className="text-foreground hover:text-primary transition">Login</Link>
              </li>
              <li>
                <Link href="mailto:support@bloodbridge.com" className="text-foreground hover:text-primary transition">Contact Support</Link>
              </li>
              <li>
                <Link href="/all-appointments" className="text-foreground hover:text-primary transition">Submit Request</Link>
              </li>
              <li>
                <Link href="/signup" className="text-foreground hover:text-primary transition">Register as Donor</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-separator pt-6 text-sm text-muted md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BloodBridge. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap gap-4 md:mt-0 md:gap-6">
            <Link href="/privacy" className="text-foreground hover:text-primary transition">Privacy Policy</Link>
            <Link href="/support" className="text-foreground hover:text-primary transition">Help Center</Link>
            <Link href="mailto:support@bloodbridge.com" className="text-foreground hover:text-primary transition">Email Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
