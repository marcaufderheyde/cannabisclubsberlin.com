// components/Footer.tsx
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
};

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div style={footerStyle}>
            <div className='text-center py-4'>
                <Link href='/imprint'>Imprint</Link>
                <span> | </span>
                <Link href='/terms-of-use'>Terms of Use</Link>
                <p>
                    © {currentYear} CannabisClubsBerlin.com. All rights
                    reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
