import DashboardHeading from "@/components/DashboardHeading";
// import UpgradePremiumButton from "@/components/UpgradePremiumButton";
import { getUser } from "@/lib/api/session";

import { Card, Button } from "@heroui/react";
import { FaCrown, FaUsers, FaDollarSign, FaList } from "react-icons/fa"

const OrganizerOverviewPage = async () => {
    // to fetch the total number of users from the server
    const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/admin/users`,
    {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      cache: 'no-store',
    }
  );
  const data = await res.json();
  const users = Array.isArray(data) ? data : data?.data || [];

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/donor/all-blood-requests`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  const bloodRequests = await response.json()

    const stats = {
        totalBloodRequests: bloodRequests.length,
        totalFund: 2450,
        totalUsers: users.length,
    };

    const user = await getUser();

    return (
        <div className="space-y-2 mt-4">
            <DashboardHeading
                title="Welcome to Your Dashboard"
                description="Dashboard Overview" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="glass border-white/25" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Blood Requests</span>
                            <h2 className="text-3xl font-extrabold">{stats.totalBloodRequests}</h2>
                        </div>
                        <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20"><FaList size={24} /></div>
                    </div>
                </Card>
                <Card className="glass border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Fund</span>
                            <h2 className="text-3xl font-extrabold ">{`$${stats.totalFund.toFixed(2)}`}</h2>
                        </div>
                        <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20"><FaDollarSign size={24} /></div>
                    </div>
                </Card>
                <Card className="glass border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Users</span>
                            <h2 className="text-3xl font-extrabold">{stats.totalUsers}</h2>
                        </div>
                        <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20"><FaUsers size={24} /></div>
                    </div>
                </Card>
            </div>

            
        </div>
    )
}

export default OrganizerOverviewPage;