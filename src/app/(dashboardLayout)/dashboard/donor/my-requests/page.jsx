
import MyRequestCard from "@/components/MyRequestCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


// Server Component — fetch runs on the server at request time.
export default async function DonationRequestsPage() {

  const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/donor/my-requests/${user?.email}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  const bloodRequests = await res.json()

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">My Donation Requests</h1>
        <MyRequestCard bloodRequests={bloodRequests} />
      </div>
    </div>
  );
}