'use client';
import { useState } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const STATUS_FLOW = ['pending', 'inprogress', 'done'];

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

function nextStatus(current) {
  const idx = STATUS_FLOW.indexOf(current);
  if (idx === -1 || idx === STATUS_FLOW.length - 1) return null; // done or cancelled = no next
  return STATUS_FLOW[idx + 1];
}

export default function UsersTable({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [blockingId, setBlockingId] = useState(null);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.bloodGroup?.toLowerCase().includes(q) ||
      u.district?.toLowerCase().includes(q)
    );
  });

  const handleBlock = async (user) => {
    setBlockingId(user._id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/admin/users/${user._id}/block`,
        {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ isBlocked: !user.isBlocked }),
        }
      );
      if (!res.ok) throw new Error('Failed');
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
    } catch (err) {
      console.error('Block error:', err);
    } finally {
      setBlockingId(null);
    }
  };

  const handleStatusChange = async (user, newStatus) => {
    setStatusLoadingId(user._id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/admin/requests/${user._id}/status`,
        {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error('Failed');
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, status: newStatus } : u
        )
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
            User <span className="text-[#c1121f]">Management</span>
          </h1>
          <p className="text-sm text-slate-500">
            Manage donor accounts, block access, and track request status.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Users',  value: users.length,                                    icon: 'mdi:account-group-outline', color: 'text-slate-700' },
            { label: 'Active',       value: users.filter((u) => !u.isBlocked).length,        icon: 'mdi:account-check-outline', color: 'text-emerald-600' },
            { label: 'Blocked',      value: users.filter((u) => u.isBlocked).length,         icon: 'mdi:block-helper',          color: 'text-[#c1121f]' },
            { label: 'Pending',      value: users.filter((u) => u.status === 'pending').length, icon: 'mdi:clock-outline',      color: 'text-amber-600' },
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
            placeholder="Search by name, email, blood group or district…"
            className="w-full rounded-xl border border-black/8 bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#c1121f]/40"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">

          {/* Head */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span>Donor</span>
            <span>Email</span>
            <span>Blood</span>
            <span className="text-center">Account</span>
            <span className="text-center">Request</span>
            <span className="text-center">Actions</span>
          </div>

          {/* Empty */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Icon icon="mdi:account-search-outline" className="text-3xl text-slate-300" />
              <p className="text-sm text-slate-400">
                {users.length === 0 ? 'No users yet.' : 'No users match your search.'}
              </p>
            </div>
          )}

          {/* Rows */}
          {filtered.map((user, i) => {
            const statusStyle = STATUS_STYLES[user.status] || STATUS_STYLES.pending;
            const next = nextStatus(user.status);

            return (
              <div
                key={user._id || i}
                className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] gap-3 items-center border-b border-slate-100 px-6 py-4 last:border-b-0 hover:bg-slate-50/60 transition-colors"
              >
                {/* Donor */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-9 w-9 flex-shrink-0 rounded-full overflow-hidden border border-slate-200">
                    <Image
                      src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=c1121f&color=fff&bold=true`}
                      alt={user.name || 'User'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-black">{user.name || '—'}</p>
                    <p className="text-xs text-slate-400 capitalize">{user.role || 'donor'}</p>
                  </div>
                </div>

                {/* Email */}
                <p className="truncate text-sm text-slate-500">{user.email || '—'}</p>

                {/* Blood group */}
                <div className="flex md:justify-start">
                  <span className="inline-flex items-center rounded-lg border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-bold text-[#c1121f]">
                    {user.bloodGroup || '—'}
                  </span>
                </div>

                {/* Account status */}
                <div className="flex md:justify-center">
                  {user.isBlocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-[#c1121f]">
                      <Icon icon="mdi:block-helper" className="text-xs" />
                      Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                      <Icon icon="mdi:check-circle" className="text-xs" />
                      Active
                    </span>
                  )}
                </div>

                {/* Request status */}
                <div className="flex md:justify-center">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                    <Icon icon={statusStyle.icon} className="text-xs" />
                    {STATUS_LABELS[user.status] || 'Pending'}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 md:justify-center flex-wrap">
                  {/* Block / Unblock */}
                  <Button
                    size="sm"
                    isLoading={blockingId === user._id}
                    onPress={() => handleBlock(user)}
                    className={`text-xs font-semibold rounded-lg ${
                      user.isBlocked
                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        : 'bg-red-50 text-[#c1121f] hover:bg-red-100'
                    }`}
                  >
                    {blockingId !== user._id && (
                      <Icon icon={user.isBlocked ? 'mdi:lock-open-outline' : 'mdi:block-helper'} className="mr-1" />
                    )}
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </Button>

                  {/* Advance status */}
                  {next && user.status !== 'cancelled' && (
                    <Button
                      size="sm"
                      isLoading={statusLoadingId === user._id}
                      onPress={() => handleStatusChange(user, next)}
                      className="text-xs font-semibold rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      {statusLoadingId !== user._id && (
                        <Icon icon="mdi:arrow-right-circle-outline" className="mr-1" />
                      )}
                      → {STATUS_LABELS[next]}
                    </Button>
                  )}

                  {/* Cancel (only when pending or inprogress) */}
                  {(user.status === 'pending' || user.status === 'inprogress') && (
                    <Button
                      size="sm"
                      isLoading={statusLoadingId === user._id}
                      onPress={() => handleStatusChange(user, 'cancelled')}
                      className="text-xs font-semibold rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
                    >
                      {statusLoadingId !== user._id && (
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
            Showing {filtered.length} of {users.length} users
          </p>
        )}

      </div>
    </div>
  );
}