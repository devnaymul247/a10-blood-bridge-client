import DashboardHeading from "@/components/DashboardHeading";
import MyRequestCard from "@/components/MyRequestCard";
// import UpgradePremiumButton from "@/components/UpgradePremiumButton";
import { getUser } from "@/lib/api/session";
import { auth } from "@/lib/auth";

import { Card, Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import { FaCrown, FaUsers, FaDollarSign, FaList } from "react-icons/fa"

const OrganizerOverviewPage = async () => {
const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/donor/${user?.email}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  const bloodRequests = await res.json()

    return (
        <div className="space-y-2 mt-4">
            <DashboardHeading
                title="Welcome to Your Dashboard" />
            <div className="min-h-screen bg-black text-white p-6 md:p-8">
                  <div className="mx-auto max-w-6xl">
                    <MyRequestCard bloodRequests={bloodRequests} />
                    <div className='mt-6 text-center'>
                        <Link href={`/dashboard/${user.role}/my-requests`}>
                            <Button variant="primary" className="mt-4">
                      View All Requests
                    </Button>
                        </Link>
                    </div>
                  </div>
                </div>
        </div>
    )
}

export default OrganizerOverviewPage;