import { Icon } from '@iconify/react';

const STATUS_STYLES = {
  pending:    { bg: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-200',   icon: 'mdi:clock-outline',        label: 'Pending' },
  inprogress: { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-200',    icon: 'mdi:progress-clock',       label: 'In Progress' },
  done:       { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: 'mdi:check-circle-outline', label: 'Done' },
  cancelled:  { bg: 'bg-slate-100',  text: 'text-slate-500',   border: 'border-slate-200',   icon: 'mdi:cancel',               label: 'Cancelled' },
};

export default async function DonationSinglePage({ params }) {
  const { donationID } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-requests/${donationID}`,
    {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      cache: 'no-store',
    }
  );
  const donationRequest = await res.json();

  const {
    requesterName,
    requesterEmail,
    recipientName,
    bloodGroup,
    district,
    upazila,
    hospitalName,
    hospitalAddress,
    requiredDate,
    requiredTime,
    requestMessage,
    status = 'pending',
  } = donationRequest;

  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Page heading */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-black">
            Request <span className="text-[#c1121f]">Details</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            View urgency, location, and requirements.
          </p>
        </div>

        {/* Status badge — top right */}
        {/* <div className="mb-4 flex justify-end">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
            <Icon icon={statusStyle.icon} />
            {statusStyle.label}
          </span>
        </div> */}

        {/* Main card */}
        <div className="rounded-3xl border border-black/5 bg-white shadow-sm p-6 md:p-8">

          {/* Recipient + blood group */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-red-50">
                <Icon icon="mdi:account-outline" className="text-3xl text-[#c1121f]" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-black">{recipientName}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Recipient · Patient
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-red-50 px-5 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c1121f] text-base font-black text-white">
                {bloodGroup}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c1121f]">Required</p>
                <p className="text-sm font-bold text-black">Blood Group</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 mb-8" />

          {/* Location + Timing */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* Location Details */}
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Location Details
              </p>
              <div className="flex flex-col gap-5">

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <Icon icon="mdi:hospital-building" className="text-lg text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Hospital</p>
                    <p className="text-sm font-bold text-black">{hospitalName}</p>
                    <p className="text-xs text-slate-500">{upazila}, {district}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <Icon icon="mdi:map-marker" className="text-lg text-[#c1121f]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Full Address</p>
                    <p className="text-sm font-medium text-black">{hospitalAddress}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Timing & Urgency */}
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Timing & Urgency
              </p>
              <div className="flex flex-col gap-5">

                <div className="flex items-center gap-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-red-50">
                      <Icon icon="mdi:calendar" className="text-lg text-[#c1121f]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Required Date</p>
                      <p className="text-sm font-bold text-black">{requiredDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100">
                      <Icon icon="mdi:clock-outline" className="text-lg text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Time</p>
                      <p className="text-sm font-bold text-black">{requiredTime}</p>
                    </div>
                  </div>
                </div>

                {requestMessage && (
                  <div className="rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3">
                    <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-600">
                      <Icon icon="mdi:message-outline" />
                      Request Message
                    </p>
                    <p className="text-sm italic text-slate-600">{requestMessage}</p>
                  </div>
                )}

              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 my-8" />

          {/* Requester info */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl bg-slate-50 px-5 py-4 mb-8">
            <Icon icon="mdi:account-circle-outline" className="text-2xl text-slate-400" />
            <div>
              <p className="text-xs text-slate-400 font-semibold">Requested by</p>
              <p className="text-sm font-bold text-black">{requesterName}</p>
            </div>
            {requesterEmail && (
              <>
                <div className="hidden sm:block h-8 w-px bg-slate-200" />
                <a
                  href={`mailto:${requesterEmail}`}
                  className="flex items-center gap-1.5 text-sm text-[#c1121f] hover:underline"
                >
                  <Icon icon="mdi:email-outline" />
                  {requesterEmail}
                </a>
              </>
            )}
          </div>

          {/* Donate Now */}
          <button className="w-full rounded-2xl bg-[#c1121f] py-4 text-base font-bold text-white hover:bg-[#780000] transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Icon icon="mdi:heart" className="text-lg" />
            Donate Now
          </button>

        </div>
      </div>
    </div>
  );
}