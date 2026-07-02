'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-[#fafafa] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">

        {/* Icon */}
        <div className="mb-8 flex justify-center mt-6">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-red-200/60 flex items-center justify-center">
                <Icon icon="mdi:blood-bag" className="text-4xl text-[#c1121f]" />
              </div>
            </div>
            {/* Small pulse dot */}
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#c1121f] animate-ping opacity-75" />
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#c1121f]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
          Oops! <span className="text-[#c1121f]">Something</span> Went Wrong
        </h1>

        {/* Error message */}
        <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-lg mx-auto">
          {error?.message || 'We encountered an unexpected error. Please try again.'}
        </p>

        {/* Subtext */}
        <p className="text-sm md:text-base text-slate-400 mb-12">
          Our team has been notified. Try refreshing or head back home to continue.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onPress={() => reset()}
            className="bg-[#c1121f] hover:bg-[#780000] text-white px-8 py-6 text-base font-semibold rounded-xl"
          >
            <Icon icon="mdi:refresh" className="mr-2 text-lg" />
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="bordered"
              className="border-[#c1121f] text-[#c1121f] px-8 py-6 text-base font-semibold rounded-xl"
            >
              <Icon icon="mdi:home-outline" className="mr-2 text-lg" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Divider + links */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">Need help finding your way?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/" className="text-[#c1121f] hover:underline font-medium">
              Home
            </Link>
            
            <span className="text-slate-300">•</span>
            <Link href="/dashboard/donor/create-request" className="text-[#c1121f] hover:underline font-medium">
              Create Request
            </Link>
          </div>
        </div>

        {/* Dev-only error details */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-xs font-mono text-[#c1121f] break-all">
              Error: {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;