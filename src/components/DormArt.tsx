import { useState } from 'react';

interface DormArtProps {
  className?: string;
}

// Fallback illustration, shown only if the real dorm photo isn't present.
function DormIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* sky */}
      <rect width="320" height="180" rx="20" fill="#E0F2FE" />
      {/* sun */}
      <circle cx="268" cy="46" r="20" fill="#FBBF24" />
      <g stroke="#FBBF24" strokeWidth="3" strokeLinecap="round">
        <line x1="268" y1="14" x2="268" y2="6" />
        <line x1="298" y1="46" x2="306" y2="46" />
        <line x1="290" y1="24" x2="296" y2="18" />
      </g>
      {/* clouds */}
      <g fill="#FFFFFF">
        <ellipse cx="70" cy="40" rx="26" ry="13" />
        <ellipse cx="95" cy="44" rx="20" ry="11" />
        <ellipse cx="180" cy="30" rx="20" ry="10" />
      </g>
      {/* grass */}
      <path d="M0 150 Q160 132 320 150 L320 180 L0 180 Z" fill="#22C55E" opacity="0.9" />
      <path d="M0 158 Q160 146 320 158 L320 180 L0 180 Z" fill="#16A34A" opacity="0.5" />
      {/* building */}
      <rect x="96" y="70" width="128" height="86" rx="8" fill="#2563EB" />
      <rect x="96" y="70" width="128" height="16" rx="8" fill="#1D4ED8" />
      {/* roof */}
      <path d="M88 72 L160 44 L232 72 Z" fill="#1E3A8A" />
      {/* windows */}
      <g fill="#E0F2FE">
        <rect x="112" y="96" width="22" height="22" rx="4" />
        <rect x="149" y="96" width="22" height="22" rx="4" />
        <rect x="186" y="96" width="22" height="22" rx="4" />
      </g>
      {/* door */}
      <rect x="150" y="128" width="20" height="28" rx="4" fill="#FBBF24" />
      <circle cx="166" cy="142" r="1.6" fill="#1E3A8A" />
      {/* little tree */}
      <rect x="52" y="128" width="7" height="24" rx="3" fill="#92400E" />
      <circle cx="55" cy="122" r="16" fill="#22C55E" />
      <circle cx="66" cy="128" r="11" fill="#16A34A" />
    </svg>
  );
}

// The dorm hero image on the student home. Shows the real campus photo
// (public/dorm.jpg); if that file is missing, falls back to the illustration
// so the app still looks complete.
export function DormArt({ className = 'h-40 w-full' }: DormArtProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <DormIllustration className={className} />;
  }

  return (
    <img
      src="/dorm.jpg"
      alt="Jakarta International University campus"
      className={`${className} object-cover`}
      onError={() => setFailed(true)}
    />
  );
}
