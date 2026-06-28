"use client";
import Link from "next/link";
import { FaHeartbeat, FaSearch, FaUserCheck } from "react-icons/fa";

const features = [
  {
    title: "Fast donor matching",
    description:
      "Find compatible donors quickly for urgent blood requests and reduce delays when every minute matters.",
    icon: FaSearch,
  },
  {
    title: "Trusted community",
    description:
      "Join a verified network of donors, patients, and organizers working together to save lives.",
    icon: FaUserCheck,
  },
  {
    title: "Life-saving impact",
    description:
      "Every donation request brings people closer to timely care and a second chance at life.",
    icon: FaHeartbeat,
  },
];

const FeaturedSection = () => {
  return (
    <section className="w-full bg-background py-20 text-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Why BloodBridge?
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A better way to connect donors with urgent needs.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-muted">
                BloodBridge helps communities respond faster with verified donor access, real-time requests, and a simple path to save lives.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-full bg-[#c1121f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a10f1d]"
              >
                Become a Donor
              </Link>
              <Link
                href="/donation-requests"
                className="rounded-full border border-separator bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                View Requests
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-separator bg-surface/70 p-6 shadow-sm backdrop-blur"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#c1121f]/10 text-[#c1121f]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-7 text-muted">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
