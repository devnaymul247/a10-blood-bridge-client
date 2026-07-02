import DashboardHeading from "@/components/DashboardHeading";
// import UpgradePremiumButton from "@/components/UpgradePremiumButton";
import { getUser } from "@/lib/api/session";

import { Card, Button } from "@heroui/react";
import { FaCrown, FaUsers, FaDollarSign, FaList } from "react-icons/fa"

const OrganizerOverviewPage = async () => {
    const stats = {
        totalBloodRequests: 150,
        totalFund: 2450,
        totalVolunteers: 250,
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
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Volunteer</span>
                            <h2 className="text-3xl font-extrabold">{stats.totalVolunteers}</h2>
                        </div>
                        <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20"><FaUsers size={24} /></div>
                    </div>
                </Card>
            </div>

            
        </div>
    )
}

export default OrganizerOverviewPage;