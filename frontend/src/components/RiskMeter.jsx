import { useEffect, useState } from 'react';
import { getRiskScoreInfo } from '../utils';

/**
 * RiskMeter — SVG semicircle arc gauge.
 *
 * Animates from 0 → score on mount using CSS transition on strokeDashoffset.
 * Color transitions from green (low) through amber (medium) to red (high).
 *
 * @param {{ score: number }} props  score: 0–100 integer
 */
function RiskMeter({ score }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Delay so initial CSS transition plays on mount
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, [score]);

  const radius = 70;
  const cx = 100;
  const cy = 102;
  const circumference = Math.PI * radius; // half-circle arc length

  // strokeDashoffset: 0 = fully filled, circumference = empty
  const offset = animated
    ? circumference - (score / 100) * circumference
    : circumference;

  const { hex, textClass, label } = getRiskScoreInfo(score);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 200 120"
        className="w-52 overflow-visible"
        aria-label={`Risk score: ${score}%`}
      >
        {/* ── Colored segment zones (decorative background) ── */}
        <defs>
          <linearGradient id="gauge-track" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="50%"  stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* ── Background track ── */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#1e293b"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* ── Score arc ── */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={hex}
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease',
            filter: `drop-shadow(0 0 6px ${hex}80)`,
          }}
        />

        {/* ── Tip dot ── */}
        {animated && (
          <circle
            cx={cx + radius * Math.cos(Math.PI - (score / 100) * Math.PI)}
            cy={cy - radius * Math.sin((score / 100) * Math.PI)}
            r="5"
            fill={hex}
            style={{ filter: `drop-shadow(0 0 6px ${hex})` }}
          />
        )}

        {/* ── Score text ── */}
        <text
          x={cx}
          y={cy - 16}
          textAnchor="middle"
          fill="white"
          fontSize="26"
          fontWeight="800"
          fontFamily="Inter, sans-serif"
        >
          {score}%
        </text>

        {/* ── Sub-label ── */}
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill="#64748b"
          fontSize="8.5"
          fontFamily="Inter, sans-serif"
          letterSpacing="1.2"
        >
          RISK SCORE
        </text>

        {/* ── Range ticks ── */}
        <text x={cx - radius} y={cy + 18} textAnchor="middle" fill="#334155" fontSize="8.5">0</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fill="#334155" fontSize="8.5">50</text>
        <text x={cx + radius} y={cy + 18} textAnchor="middle" fill="#334155" fontSize="8.5">100</text>
      </svg>

      <span className={`text-sm font-bold -mt-1 ${textClass}`}>{label}</span>
    </div>
  );
}

export default RiskMeter;
