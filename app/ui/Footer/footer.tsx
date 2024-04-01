// components/Footer.tsx
import { useLocale } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const footerStyle: React.CSSProperties = {
  width: '100%',
  position: 'absolute',
  bottom: 0,
  backgroundColor: '#B6CF54',
  textAlign: 'center',
  padding: '1px 0',
  display: 'inline',
  zIndex: 3,
  marginTop: 'auto'
};

const Footer: React.FC = () => {
  const localActive = useLocale();
  const currentYear = new Date().getFullYear();
  return (
    <div style={footerStyle}>
      <div className='text-center py-4'>
        <Link href={`/${localActive}/imprint`}>Imprint</Link>
        <span> | </span>
        <Link href={`/${localActive}/termsofuse`}>Terms of Use</Link>
        <p>© {currentYear} CannabisClubsBerlin.com. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;