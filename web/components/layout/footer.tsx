import FooterLink, { FooterLinkProps } from '../ui/footerLink';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import Image from 'next/image';

export default function Footer() {
  const links: FooterLinkProps[] = [
    {
      icon: <GitHub />,
      href: 'https://github.com/CGR0/Vambe-Prueba',
      label: 'Repositorio',
    },
    {
      icon: <LinkedIn />,
      href: 'https://www.linkedin.com/in/cgarcesr/',
      label: 'LinkedIn',
    },
    {
      icon: <Email />,
      href: 'mailto:cargarcesr@gmail.com',
      label: 'Email',
    },
    {
      icon: <Image src="/vambeIcon.svg" alt="Vambe" width={24} height={24} />,
      href: 'https://vambe.ai/es/',
      label: 'Vambe',
    },
  ];

  return (
    <footer className="row-start-3 flex gap-[30px] flex-wrap items-center justify-center mb-10">
      {links.map((link) => (
        <FooterLink key={link.href} {...link} />
      ))}
    </footer>
  );
}
