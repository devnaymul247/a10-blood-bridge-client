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
    const isPremium = user?.isPremium;

    return (
        <div className="space-y-6 mt-6">
            <DashboardHeading
                title="Overview"
                description="Dashboard Overview" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass border-white/25" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Blood Requests</span>
                            <h2 className="text-3xl font-extrabold text-black/75">{stats.totalBloodRequests}</h2>
                        </div>
                        <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20"><FaList size={24} /></div>
                    </div>
                </Card>
                <Card className="glass border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Fund</span>
                            <h2 className="text-3xl font-extrabold text-black/75">{`$${stats.totalFund.toFixed(2)}`}</h2>
                        </div>
                        <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20"><FaDollarSign size={24} /></div>
                    </div>
                </Card>
                <Card className="glass border-white/5" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Volunteer</span>
                            <h2 className="text-3xl font-extrabold text-black/75">{stats.totalVolunteers}</h2>
                        </div>
                        <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20"><FaUsers size={24} /></div>
                    </div>
                </Card>
            </div>

            {/* todo: if not needed the premium card can be removed and the below code can be removed as well. */}
            {!isPremium ? (
                <Card className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent relative overflow-hidden" radius="lg">
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-400 flex items-center gap-2"><FaCrown className="text-yellow-400" /> Unlock Unlimited Blood Request Creation</h3>
                            <p className="text-slate-400 text-xs max-w-xl leading-relaxed">Standard organizer accounts are limited to <strong>3 requests</strong>. Upgrade to our Premium Package for <strong>$29.00</strong> to place unlimited requests.</p>
                        </div>
                        {/* <UpgradePremiumButton /> */}
                    </div>
                </Card>
            ) : (
                <Card className="border border-green-500/20 bg-gradient-to-r from-green-500/5 via-amber-600/5 to-transparent relative overflow-hidden" radius="lg">
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-400 flex items-center gap-2"><FaCrown className="text-green-400" /> Welcome to premium dashboard</h3>
                            <p className="text-slate-400 text-xs max-w-xl leading-relaxed">You can create more then 3 Requests now...</p>
                        </div>

                    </div>
                </Card>
            )}
        </div>
    )
}

export default OrganizerOverviewPage;