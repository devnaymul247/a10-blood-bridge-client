'use client';
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, toast, useTheme } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaMoon, FaUserDoctor } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";


const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();

  const isActive = (href) => {
    return pathname === href ? "text-[#0D7674] font-semibold" : "hover:text-[#0D7674]";
  };

  const userData = authClient.useSession();
  const user = userData?.data?.user;
  // console.log(user);

  const handleSignOut = async () => {
    await authClient.signOut();

    toast.success("Signed out successfully");
    window.location.reload();
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/doc-appoint-logo.png"
                alt="DocAppoint Logo"
                width={40}
                height={40}
              />
              <p className="font-bold text-xl text-[#0D7674]">DocAppoint</p>
            </Link>
        </div>
        <ul className="hidden items-center gap-4 md:flex font-semibold">
          <li>
            <Link href="/" className={isActive("/")} >
              Home
            </Link>
          </li>
          <li>
            <Link href="/all-appointments" className={isActive("/all-appointments")}>All Appointments</Link>
          </li>
          <li>
            <Link href="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
          </li>
        </ul>
        {user ? (
          <div className="hidden md:flex items-center gap-3">
            <Avatar size="sm">
              <Avatar.Image
                alt="John Doe"
                src={user?.image}
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
            </Avatar>

            <Button onClick={handleSignOut} size="sm" variant="danger">SignOut</Button>

            <Button size="sm" variant="tertiary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <FiSun /> : <FaMoon />} {theme === "dark" ? "Light" : "Dark"} Mode
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/login" className="block py-2 text-center hover:text-[#0D7674] font-semibold">
              Login
            </Link>

            <Link href="/signup" className="block py-2">
              <Button className="bg-[#0D7674] hover:bg-[#0A5F5D] font-semibold">Sign Up</Button>
            </Link>
          </div>
        )}
      </header>

      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4 font-semibold">
            <li>
              <Link href="/" className={`block py-2 ${isActive("/")}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/all-appointments" className={`block py-2 ${isActive("/all-appointments")}`}>
                All Appointments
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={`block py-2 ${isActive("/dashboard")}`}>
                Dashboard
              </Link>
            </li>
          </ul>

          {user ? (
            <div className="flex gap-3">
              <Avatar size="sm">
                <Avatar.Image
                  alt="John Doe"
                  src={user?.image}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <Button onClick={handleSignOut} size="sm" variant="danger">SignOut</Button>
            </div>
          ) : (

            <div className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              <Link href="/login" className="block py-2 text-center hover:text-[#0D7674]">
                Login
              </Link>

              <Link href="/signup" className="block py-2">
                <Button className="w-full bg-[#0D7674] hover:bg-[#0A5F5D] font-semibold">Sign Up</Button>
              </Link>
            </div>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;