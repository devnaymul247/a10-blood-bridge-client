'use client';
import { Card, Button, Separator } from '@heroui/react';
import { Icon } from '@iconify/react';

const TONE_STYLES = {
  critical: { ring: '#dc2626', bg: 'rgba(220,38,38,0.12)', text: '#fca5a5' },
  soon: { ring: '#f59e0b', bg: 'rgba(245,158,11,0.10)', text: '#fcd34d' },
  planned: { ring: '#669bbc', bg: 'rgba(102,155,188,0.10)', text: '#93c5dd' },
  past: { ring: '#52525b', bg: 'rgba(82,82,91,0.15)', text: '#a1a1aa' },
  neutral: { ring: '#3f3f46', bg: 'rgba(63,63,70,0.15)', text: '#a1a1aa' },
};

function getUrgency(dateStr, timeStr) {
  if (!dateStr) return { label: 'No date set', tone: 'neutral' };
  const target = new Date(`${dateStr}T${timeStr || '00:00'}:00`);
  if (Number.isNaN(target.getTime())) return { label: 'No date set', tone: 'neutral' };

  const hoursLeft = (target.getTime() - Date.now()) / (1000 * 60 * 60);

  if (hoursLeft < 0) return { label: 'Past due', tone: 'past' };
  if (hoursLeft <= 12) return { label: `${Math.max(1, Math.round(hoursLeft))}h left`, tone: 'critical' };
  if (hoursLeft <= 48) return { label: `${Math.round((hoursLeft / 24) * 10) / 10 || 1}d left`, tone: 'soon' };
  return { label: `${Math.round(hoursLeft / 24)}d away`, tone: 'planned' };
}

function formatDateTime(dateStr, timeStr) {
  if (!dateStr) return '—';
  const d = new Date(`${dateStr}T${timeStr || '00:00'}:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  const datePart = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  const timePart = timeStr ? d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : null;
  return timePart ? `${datePart} · ${timePart}` : datePart;
}

export default function RequestCards({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-default-200/20 py-16 text-center">
        <Icon icon="mdi:water-off-outline" className="text-3xl text-slate-500" />
        <p className="text-sm text-slate-400">No donation requests yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((req) => {
        const urgency = getUrgency(req.requiredDate, req.requiredTime);
        const tone = TONE_STYLES[urgency.tone];
        const group = req.bloodGroup || '?';

        return (
          <Card
            key={req._id || req.id}
            className="relative overflow-hidden border bg-default-100/5 backdrop-blur-sm"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex gap-4 p-5">
              {/* Blood-group glyph, color-coded by urgency */}
              <div
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border text-2xl font-black"
                style={{ borderColor: tone.ring, background: tone.bg, color: tone.ring }}
                aria-label={`Blood group ${group}`}
              >
                {group}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-white">
                      {req.recipientName || 'Unnamed patient'}
                    </h3>
                    <p className="truncate text-xs text-slate-400">
                      requested by {req.requesterName || 'Anonymous'}
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{ background: tone.bg, color: tone.text }}
                  >
                    {urgency.label}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-sm text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Icon icon="mdi:hospital-building" className="text-[#669bbc] flex-shrink-0" />
                    <span className="truncate">{req.hospitalName || '—'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon icon="mdi:map-marker" className="text-[#669bbc] flex-shrink-0" />
                    <span className="truncate">
                      {[req.upazila, req.district].filter(Boolean).join(', ') || '—'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon icon="mdi:calendar-clock" className="text-[#669bbc] flex-shrink-0" />
                    <span>{formatDateTime(req.requiredDate, req.requiredTime)}</span>
                  </div>
                </div>

                {req.requestMessage && (
                  <p className="line-clamp-2 text-xs text-slate-500 italic">{req.requestMessage}</p>
                )}
              </div>
            </div>

            <Separator className="bg-default-200/10" />

            <div className="flex flex-col items-center justify-between gap-2 px-5 py-3">
              <a
                href={req.requesterEmail ? `mailto:${req.requesterEmail}` : undefined}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#669bbc] transition-colors"
              >
                <Icon icon="mdi:email-outline" />
                <span className="truncate">{req.requesterEmail || 'No contact'}</span>
              </a>
              <Button size="sm" color="danger" className="font-semibold">
                <Icon icon="mdi:hand-heart" className="mr-1" />
                I can help
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}