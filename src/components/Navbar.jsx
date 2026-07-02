'use client';
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, toast, useTheme } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle, FaSignOutAlt, FaThLarge, FaUser } from "react-icons/fa";
import { FaMoon, FaUserDoctor } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";


const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const pathname = usePathname();

    const isActive = (href) => {
        return pathname === href ? "text-[#c1121f] font-semibold" : "hover:text-[#c1121f]";
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const userData = authClient.useSession();
    const user = userData?.data?.user;
    console.log("User data in Navbar:", user);

    useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                            src="/blood-bridge-logo.webp"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <p className="font-extrabold text-2xl"><span className="text-[#c1121f]">Blood</span>Bridge</p>
                    </Link>
                </div>
                <ul className="hidden items-center gap-4 md:flex font-semibold">
                    <li>
                        <Link href="/" className={isActive("/")} >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/donation-requests" className={isActive("/donation-requests")}>Donation Requests</Link>
                    </li>
                    <li>
                        <Link href="/search-donor" className={isActive("/search-donor")}>Search Donor</Link>
                    </li>
                </ul>
                {user ? (
                    <div className="hidden md:flex items-center gap-3 relative" ref={dropdownRef}>
                        <Button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center transition-transform hover:scale-115 outline-none focus:outline-none cursor-pointer bg-transparent">
                            <Avatar size="sm">
                                <Avatar.Image
                                    alt="John Doe"
                                    src={user?.photo}
                                    referrerPolicy="no-referrer"
                                />
                                <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                        </Button>

                        {dropdownOpen && (
                <div className="absolute right-12 top-7 mt-3 w-56 bg-[#003049] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-55 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User info */}
                  <div className="px-4 py-2.5 border-b border-white/5 mb-1.5 cursor-default">
                    <p className="text-[10px] text-[#669bbc] font-bold uppercase tracking-wider">
                      {user.role} Account
                    </p>
                    <p className="font-bold text-white text-sm mt-0.5">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{user.email}</p>
                  </div>

                  {/* Actions */}
                  <Link
                    href={`/dashboard/${user.role}`}
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
                  >
                    <FaThLarge className="text-slate-400 text-sm shrink-0" />
                    <span>My Dashboard</span>
                  </Link>

                  <Link
                    href={`/dashboard/${user.role}/profile`}
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
                  >
                    <FaUser className="text-slate-400 text-sm shrink-0" />
                    <span>Profile Settings</span>
                  </Link>

                  <div className="border-t border-white/5 my-1.5" />

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-[#c1121f] hover:text-[#ff0000] hover:bg-red-500/5 transition cursor-pointer"
                  >
                    <FaSignOutAlt className="text-sm shrink-0 text-[#c1121f]" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}

                        <Button size="sm" variant="tertiary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                            {theme === "dark" ? <FiSun /> : <FaMoon />} {theme === "dark" ? "Light" : "Dark"} Mode
                        </Button>
                    </div>
                ) : (
                    <div className="hidden items-center gap-4 md:flex">
                        <Link href="/signin" className="block py-2 text-center hover:text-[#c1121f] font-semibold">
                            Login
                        </Link>

                        <Link href="/signup" className="block py-2">
                            <Button className="bg-[#c1121f] hover:bg-[#780000] font-semibold"><FaRegUserCircle /> Sign Up</Button>
                        </Link>
                    </div>
                )}
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4 font-semibold">
                        <li>
                            <Link href="/" className={`block py-2 ${isActive("/")}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/donation-requests" className={`block py-2 ${isActive("/donation-requests")}`}>
                                Donation Requests
                            </Link>
                        </li>
                        <li>
                            <Link href="/search-donor" className={`block py-2 ${isActive("/search-donor")}`}>
                                Search Donor
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
                            <Link href="/signin" className="block py-2 text-center hover:text-[#c1121f]">
                                Login
                            </Link>

                            <Link href="/signup" className="block py-2">
                                <Button className="w-full bg-[#c1121f] hover:bg-[#780000] font-semibold"><FaRegUserCircle /> Sign Up</Button>
                            </Link>
                        </div>
                    )}

                </div>
            )}
        </nav>
    );
};

export default Navbar;