'use client';
import { useState } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const STATUS_STYLES = {
  pending:    { bg: 'bg-amber-50',   text: 'text-amber-600',   icon: 'mdi:clock-outline' },
  inprogress: { bg: 'bg-blue-50',    text: 'text-blue-600',    icon: 'mdi:progress-clock' },
  done:       { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'mdi:check-circle-outline' },
  cancelled:  { bg: 'bg-slate-100',  text: 'text-slate-500',   icon: 'mdi:cancel' },
};

const STATUS_LABELS = {
  pending: 'Pending',
  inprogress: 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
};

export default function MyRequestTable({ bloodRequests: initialRequests }) {
  const [requests, setRequests] = useState(initialRequests || []);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = requests.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.recipientName?.toLowerCase().includes(q) ||
      r.requesterEmail?.toLowerCase().includes(q) ||
      r.bloodGroup?.toLowerCase().includes(q) ||
      r.district?.toLowerCase().includes(q) ||
      r.hospitalName?.toLowerCase().includes(q)
    );
  });

  const handleStatusChange = async (req, newStatus) => {
    const id = req._id || req.id;
    setStatusLoadingId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/my-requests/${id}/status`,
        {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error('Failed');
      setRequests((prev) =>
        prev.map((r) => ((r._id || r.id) === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error('Status error:', err);
    } finally {
      setStatusLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-black">
            My <span className="text-[#c1121f]">Donation Requests</span>
          </h1>
          <p className="text-sm text-slate-500">
            Track your requests and update their status as donors respond.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Requests', value: requests.length, icon: 'mdi:water-outline', color: 'text-slate-700' },
            { label: 'In Progress',    value: requests.filter((r) => r.status === 'inprogress').length, icon: 'mdi:progress-clock', color: 'text-blue-600' },
            { label: 'Done',           value: requests.filter((r) => r.status === 'done').length, icon: 'mdi:check-circle-outline', color: 'text-emerald-600' },
            { label: 'Pending',        value: requests.filter((r) => !r.status || r.status === 'pending').length, icon: 'mdi:clock-outline', color: 'text-amber-600' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Icon icon={s.icon} className={`text-lg ${s.color}`} />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{s.label}</span>
              </div>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4 relative">
          <Icon icon="mdi:magnify" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient, email, blood group or district…"
            className="w-full rounded-xl border border-black/8 bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#c1121f]/40"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">

          {/* Head */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1.5fr] gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span>Patient</span>
            <span>Email</span>
            <span>Blood</span>
            <span className="text-center">Status</span>
            <span className="text-center">Actions</span>
          </div>

          {/* Empty */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Icon icon="mdi:water-off-outline" className="text-3xl text-slate-300" />
              <p className="text-sm text-slate-400">
                {requests.length === 0 ? 'No donation requests yet.' : 'No requests match your search.'}
              </p>
            </div>
          )}

          {/* Rows */}
          {filtered.map((req, i) => {
            const id = req._id || req.id;
            const status = req.status || 'pending';
            const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;
            const isFinal = status === 'done' || status === 'cancelled';

            return (
              <div
                key={id || i}
                className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_1.5fr] gap-3 items-center border-b border-slate-100 px-6 py-4 last:border-b-0 hover:bg-slate-50/60 transition-colors"
              >
                {/* Patient */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-xs font-bold text-[#c1121f]">
                    {req.bloodGroup || '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-black">
                      {req.recipientName || 'Unnamed patient'}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {req.hospitalName || '—'}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <a
                  href={req.requesterEmail ? `mailto:${req.requesterEmail}` : undefined}
                  className="truncate text-sm text-slate-500 hover:text-[#c1121f] transition-colors"
                >
                  {req.requesterEmail || '—'}
                </a>

                {/* Blood group */}
                <div className="flex md:justify-start">
                  <span className="inline-flex items-center rounded-lg border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-bold text-[#c1121f]">
                    {req.bloodGroup || '—'}
                  </span>
                </div>

                {/* Request status */}
                <div className="flex md:justify-center">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                    <Icon icon={statusStyle.icon} className="text-xs" />
                    {STATUS_LABELS[status] || 'Pending'}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 md:justify-center flex-wrap">
                  <Link href={`/donation-requests/${id}`}>
                    <Button
                      size="sm"
                      className="text-xs font-semibold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                    >
                      <Icon icon="mdi:eye-outline" className="mr-1" />
                      View
                    </Button>
                  </Link>

                  {!isFinal && (
                    <Button
                      size="sm"
                      isLoading={statusLoadingId === id}
                      onPress={() => handleStatusChange(req, 'done')}
                      className="text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    >
                      {statusLoadingId !== id && (
                        <Icon icon="mdi:check-circle-outline" className="mr-1" />
                      )}
                      Done
                    </Button>
                  )}

                  {!isFinal && (
                    <Button
                      size="sm"
                      isLoading={statusLoadingId === id}
                      onPress={() => handleStatusChange(req, 'cancelled')}
                      className="text-xs font-semibold rounded-lg bg-red-50 text-[#c1121f] hover:bg-red-100"
                    >
                      {statusLoadingId !== id && (
                        <Icon icon="mdi:cancel" className="mr-1" />
                      )}
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer count */}
        {filtered.length > 0 && (
          <p className="mt-3 text-right text-xs text-slate-400">
            Showing {filtered.length} of {requests.length} requests
          </p>
        )}

      </div>
    </div>
  );
}