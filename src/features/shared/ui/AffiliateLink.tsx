'use client';

import type { ReactNode } from 'react';
import { trackAffiliateClick } from '@/lib/api/tools';

interface AffiliateLinkProps {
  href: string;
  slug: string;
  children: ReactNode;
  className?: string;
}

export default function AffiliateLink({ href, slug, children, className }: AffiliateLinkProps) {
  const handleClick = () => {
    void trackAffiliateClick(slug);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
