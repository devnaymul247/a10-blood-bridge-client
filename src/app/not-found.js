import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-[#fafafa] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">

        {/* 404 */}
        <div className="mb-4 relative inline-block">
          <h1 className="text-9xl md:text-[150px] font-extrabold text-[#c1121f] leading-none select-none">
            404
          </h1>
          {/* Blood drop icon sitting inside the 0 */}
          <Icon
            icon="healthicons:blood-drop"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-[#c1121f]/20 pointer-events-none"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4">
          Page <span className="text-[#c1121f]">Not Found</span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-lg mx-auto">
          Sorry, the page you are looking for does not exist. It might have been moved or deleted.
        </p>

        {/* Subtext */}
        <p className="text-sm md:text-base text-slate-400 mb-12">
          Let&apos;s get you back to saving lives with Blood Bridge.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button className="bg-[#c1121f] hover:bg-[#780000] text-white px-8 py-6 text-base font-semibold rounded-xl">
              <Icon icon="mdi:home-outline" className="mr-2 text-lg" />
              Back to Home
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;