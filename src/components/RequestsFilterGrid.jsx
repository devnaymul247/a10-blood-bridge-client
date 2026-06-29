'use client';
import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import RequestCard from './RequestCard';

const BLOOD_GROUPS = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function hoursLeftOf(req) {
  if (!req.requiredDate) return null;
  const target = new Date(`${req.requiredDate}T${req.requiredTime || '00:00'}:00`);
  if (Number.isNaN(target.getTime())) return null;
  return (target.getTime() - Date.now()) / (1000 * 60 * 60);
}

export default function RequestsFilterGrid({ appointments }) {
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('All');

  const filtered = useMemo(() => {
    return appointments.filter((r) => {
      const matchesGroup = groupFilter === 'All' || r.bloodGroup === groupFilter;
      const haystack = `${r.recipientName} ${r.hospitalName} ${r.district} ${r.upazila}`.toLowerCase();
      const matchesSearch = !search.trim() || haystack.includes(search.trim().toLowerCase());
      return matchesGroup && matchesSearch;
    });
  }, [appointments, groupFilter, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ha = hoursLeftOf(a);
      const hb = hoursLeftOf(b);
      const na = ha === null ? Infinity : ha < 0 ? Infinity - 1 : ha;
      const nb = hb === null ? Infinity : hb < 0 ? Infinity - 1 : hb;
      return na - nb;
    });
  }, [filtered]);

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            icon="mdi:magnify"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient, hospital, or location"
            className="w-full rounded-lg border bg-transparent py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {BLOOD_GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setGroupFilter(g)}
              className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              style={
                groupFilter === g
                  ? { borderColor: '#dc2626', background: 'rgba(220,38,38,0.15)', color: '#fca5a5' }
                  : { borderColor: 'rgba(255,255,255,0.12)', color: '#a1a1aa' }
              }
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Grid / empty state */}
      {sorted.length === 0 ? (
        <div
          className="flex flex-col items-center gap-2 rounded-xl border py-16 text-center"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <Icon icon="mdi:water-off-outline" className="text-3xl text-slate-500" />
          <p className="text-sm text-slate-400">
            {appointments.length === 0
              ? 'No donation requests yet. Create one to get started.'
              : 'No requests match your filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((req) => (
            <RequestCard key={req._id || req.id} req={req} />
          ))}
        </div>
      )}
    </>
  );
}