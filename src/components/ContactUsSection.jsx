"use client";
import Link from "next/link";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ContactUsSection = () => {
  return (
    <section className="w-full bg-background py-20 text-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-separator bg-surface/70 p-8 shadow-sm backdrop-blur lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Contact us
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Need help or want to partner with BloodBridge?
              </h2>
              <p className="max-w-xl text-lg leading-8 text-muted">
                Reach out to our support team for donor questions, urgent requests, or partnership opportunities. We’re here to help.
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-separator bg-background/70 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c1121f]/10 text-[#c1121f]">
                  <FaPhoneAlt className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Call us</p>
                  <a href="tel:+8801712345678" className="text-sm text-muted hover:text-primary">
                    +880 1712-345678
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c1121f]/10 text-[#c1121f]">
                  <FaEnvelope className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email us</p>
                  <a href="mailto:support@bloodbridge.com" className="text-sm text-muted hover:text-primary">
                    support@bloodbridge.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4 rounded-2xl border border-separator bg-background/70 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-separator bg-transparent px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-separator bg-transparent px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full rounded-xl border border-separator bg-transparent px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Message</label>
              <textarea
                rows="5"
                placeholder="Tell us about your concern or request..."
                className="w-full rounded-xl border border-separator bg-transparent px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#c1121f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a10f1d]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
