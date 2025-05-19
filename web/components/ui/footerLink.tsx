import React, { JSX } from 'react';

export interface FooterLinkProps {
  icon: JSX.Element;
  href: string;
  label: string;
}

export default function FooterLink({ icon, href, label }: FooterLinkProps) {
  return (
    <a
      className="flex items-center gap-2 text-white hover:underline hover:underline-offset-4"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
      {label}
    </a>
  );
}
