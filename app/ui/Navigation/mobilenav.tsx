'use client';

import LinkInfo from '@/app/ui/Navigation/linkinfo';
import HamburgerButton from '@/app/ui/Navigation/hamburgerbutton';
import OverlayNav from '@/app/ui/Navigation/overlaynav';
import { useState } from 'react';

export default function MobileNav({ links }: { links: Array<LinkInfo> }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const hamburgerButton = (
        <HamburgerButton handleClick={() => setShowOverlay(true)} />
    );
    const overlayNav = (
        <OverlayNav handleClick={() => setShowOverlay(false)} links={links} />
    );

    return <div>{showOverlay ? overlayNav : hamburgerButton}</div>;
}
