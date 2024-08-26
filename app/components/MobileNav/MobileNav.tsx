'use client';

import HamburgerButton from '@/app/components/MobileNav/Hamburgerbutton';
import OverlayNav from '@/app/components/OverlayNav/Overlaynav';
import { useState } from 'react';
import { LinkInfo } from '../Navbar/Links';

export default function MobileNav({ links }: { links: Array<LinkInfo> }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const hamburgerButton = (
        <HamburgerButton showOverlay={() => setShowOverlay(true)} />
    );
    const overlayNav = (
        <OverlayNav closeOverlay={() => setShowOverlay(false)} links={links} />
    );

    return <div>{showOverlay ? overlayNav : hamburgerButton}</div>;
}
