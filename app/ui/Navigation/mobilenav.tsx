'use client';

import HamburgerButton from '@/app/ui/Navigation/hamburgerbutton';
import OverlayNav from '@/app/ui/Navigation/overlaynav';
import { useState } from 'react';
import { LinkInfo } from './links';

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
