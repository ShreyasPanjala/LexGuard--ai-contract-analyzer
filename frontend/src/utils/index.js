/**
 * Shared frontend utility functions.
 */

/**
 * Formats bytes into human-readable file size.
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Returns Tailwind class string for a given risk level badge.
 * @param {'High'|'Medium'|'Low'} risk
 * @returns {string}
 */
export function getRiskBadgeClasses(risk) {
  switch (risk) {
    case 'High':
      return 'text-red-400 bg-red-400/10 border-red-400/30';
    case 'Medium':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
    case 'Low':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    default:
      return 'text-slate-400 bg-slate-400/10 border-slate-400/30';
  }
}

/**
 * Returns hex color and Tailwind text class for a numeric risk score.
 * @param {number} score 0–100
 * @returns {{ hex: string, textClass: string, label: string }}
 */
export function getRiskScoreInfo(score) {
  if (score >= 70) {
    return { hex: '#ef4444', textClass: 'text-red-400', label: 'High Risk' };
  }
  if (score >= 40) {
    return { hex: '#f59e0b', textClass: 'text-amber-400', label: 'Medium Risk' };
  }
  return { hex: '#10b981', textClass: 'text-emerald-400', label: 'Low Risk' };
}

/**
 * Conditionally joins class names.
 * @param {...string} classes
 * @returns {string}
 */
export function clsx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Truncates a filename for display if it's too long.
 * @param {string} name
 * @param {number} maxLen
 * @returns {string}
 */
export function truncateFilename(name, maxLen = 32) {
  if (name.length <= maxLen) return name;
  const ext = name.slice(name.lastIndexOf('.'));
  const base = name.slice(0, maxLen - ext.length - 3);
  return `${base}...${ext}`;
}
