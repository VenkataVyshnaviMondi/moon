import type { ReactNode } from 'react';
type IconName = 'arrow' | 'right' | 'check' | 'brand' | 'social' | 'search' | 'meta' | 'video' | 'web' | 'code' | 'projects' | 'mail' | 'phone' | 'pin' | 'linkedin' | 'instagram';
const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 19 19 5M5 5h14v14" />,
  right: <path d="M4 12h16m-6-6 6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  brand: <path d="m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" />,
  social: <><rect x="3" y="4" width="18" height="13" rx="3" /><path d="m8 17-2 4 7-4M8 9h8m-8 4h5" /></>,
  search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6M7 11l2-3 2 2 2-3" /></>,
  meta: <path d="M12 12C8 3 5 4 3 9c-3 8 1 13 5 7l8-10c5-6 10 15 3 13-3-1-4-4-7-7Z" />,
  video: <><rect x="3" y="5" width="18" height="14" rx="4" /><path d="m10 9 5 3-5 3Z" /></>,
  web: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.1m3 0h.1M7 13h4m-4 3h8" /></>,
  code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />,
  projects: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M14 6h4v8M10 18H6v-8" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  phone: <path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3v3c-10 3-21-8-18-18Z" />,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  linkedin: <path d="M4 9v12M4 4v.1M10 21V9h5v2c4-5 6-1 6 2v8M10 12v9" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></>,
};
export default function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
