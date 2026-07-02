import RequestCards from '@/components/RequestCard';
import React from 'react';

const allDonationRequestPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/donor/my-requests`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
  const bloodRequests = await res.json()

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-8">
              <div className="mx-auto max-w-6xl">
                <h1 className="text-2xl font-bold mb-6">All Donation Requests for Blood</h1>
                <RequestCards bloodRequests={bloodRequests} />
              </div>
            </div>
    );
};

export default allDonationRequestPage;