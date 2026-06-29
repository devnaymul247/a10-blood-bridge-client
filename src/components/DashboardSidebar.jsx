'use client';
import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaBuilding, FaCalendarAlt, FaHistory, FaHome, FaList, FaPlus, FaSignInAlt, FaSignOutAlt, FaTicketAlt, FaUser, FaUserCircle, FaUsers, FaUserShield } from "react-icons/fa";


const DashboardSideBar = () => {
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully");
    window.location.reload();
  }


  const donorMenu = [
    { key: "overview", label: "Overview", icon: FaList, href: "/dashboard/donor" },
    { key: "profile", label: "Profile", icon: FaUser, href: "/dashboard/donor/profile" },
    { key: "my-requests", label: "My Requests", icon: FaHistory, href: "/dashboard/donor/my-requests" },
    { key: "create-request", label: "Create Request", icon: FaPlus, href: "/dashboard/donor/create-request" },
  ]

  const volunteerMenu = [
    { key: "overview", label: "Overview", icon: FaUserCircle, href: "/dashboard/volunteer" },
    { key: "tickets", label: "My Tickets", icon: FaTicketAlt, href: "/dashboard/volunteer/tickets" },
    { key: "payments", label: "Payments", icon: FaHistory, href: "/dashboard/volunteer/payments" },
  ]

  const adminMenu = [
    { key: "users", label: "Users", icon: FaUserShield, href: "/dashboard/users" },
    { key: "events", label: "Approve Events", icon: FaCalendarAlt, href: "/dashboard/events" },
    { key: "transactions", label: "Transaction Logs", icon: FaHistory, href: "/dashboard/transactions" },
  ]

  const role = session?.user?.role;

  const manuItems = role === "donor" ? donorMenu : role === "volunteer" ? volunteerMenu : role === "admin" ? adminMenu : null;

  return (
    <aside className="w-64 h-screen border-r border-white/25">
      <div className="h-full flex flex-col bg-slate-900 backdrop-blur-xl">
        {/* Brand / Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Logo />
        </div>

        {/* User Profile */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-500/60 shrink-0">
              <Image
                width={50}
                height={50}
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name)}&background=8FA1B9&color=000&bold=true`}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-bold truncate leading-tight">
                {session?.user?.name}
              </p>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "volunteer" ? "text-indigo-400" : "text-red-400"}`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">Navigation</p>
          {
            manuItems?.map(({ key, label, icon: Icon, href }) => {

              return (
                <Link
                  key={key}
                  href={href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer text-slate-400 hover:text-white hover:bg-white/5"
                            `}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors bg-white/5 text-slate-400`}>
                    <Icon size={20} />
                  </span>
                  <span>{label}</span>
                </Link>
              )
            })
          }

        </nav>

        {/* Bottom Links */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150">
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaHome size={13} />
            </span>
            Back to Site
          </Link>
          
          {
            session ? (
                <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaSignOutAlt size={13} />
            </span>
            Sign Out
          </button>
            ) : (
                <Link href="/signin" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150">

            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaSignInAlt size={13} />
            </span>
                  Sign In
                </Link>
            )
          }
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideBar;