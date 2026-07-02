"use client";

import Link from "next/link";
import { Button, Card } from "@heroui/react";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaTint,
  FaHeartbeat,
  FaSearch,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/blood donation banner.avif')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            ❤️ Every Donation Can Save Lives
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Be Someone&apos;s
            <span className="block text-danger">
              Lifesaving Hero
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
            Connect with patients in need, donate blood, and become
            part of a community dedicated to saving lives every day.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                radius="full"
                className="bg-[#c1121f] hover:bg-[#780000] font-semibold"
              ><FaHeartbeat />
                Become A Donor
              </Button>
            </Link>

            <Link href="/search" className="w-full sm:w-auto">
              <Button
                variant="bordered"
                size="lg"
                radius="full"
                className="border-white text-white bg-white/10 hover:bg-white/30"
              ><FiSearch />
                Search Donors
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
          <Card
            variant="secondary"
            className="border border-white/10 bg-white/10 backdrop-blur-md"
          >
            <Card.Content className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-danger/20 p-4">
                <FaUsers className="text-2xl text-danger" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  5,200+
                </h3>
                <p className="text-gray-300">
                  Active Donors
                </p>
              </div>
            </Card.Content>
          </Card>

          <Card
            variant="secondary"
            className="border border-white/10 bg-white/10 backdrop-blur-md"
          >
            <Card.Content className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-success/20 p-4">
                <FaHandHoldingHeart className="text-2xl text-success" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  $48K
                </h3>
                <p className="text-gray-300">
                  Total Funding
                </p>
              </div>
            </Card.Content>
          </Card>

          <Card
            variant="secondary"
            className="border border-white/10 bg-white/10 backdrop-blur-md"
          >
            <Card.Content className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-warning/20 p-4">
                <FaTint className="text-2xl text-warning" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  1,850+
                </h3>
                <p className="text-gray-300">
                  Total Requests
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}