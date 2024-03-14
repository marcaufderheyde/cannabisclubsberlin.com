import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function HeaderHomeComponent() {
    const navLinksRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        if (navLinksRef.current) {
            const navLinks = navLinksRef.current;
            const isVisible = window.getComputedStyle(navLinks).display === "block";
            
            if (!isVisible) {
            navLinks.style.display = "block";
            navLinks.style.maxHeight = "0px";
            setTimeout(() => {
                navLinks.style.transition = "max-height 0.5s ease-in";
                navLinks.style.maxHeight = "500px"; // Adjust as needed to fit all menu items
            }, 10);
            } else {
            navLinks.style.maxHeight = "0px";
            setTimeout(() => {
                navLinks.style.display = "none";
            }, 500); // Match this timeout to the transition duration
            }
        }
    };

    return (
        <div>
            <header>
                <nav id="navbar">
                    <div className="logo-mobile">
                        <Link href="/">
                            <Image src="/logo.webp" width={75} height={75} alt="Cannabis Clubs Berlin Logo"/>
                            <span>Cannabis Clubs Berlin</span>
                        </Link>            </div>
                    <div className="toggle-button" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="nav-links" ref={navLinksRef}>
                        <li><Link href="#home" className="active">Home</Link></li>
                        <li><Link href="#about">About</Link></li>
                        <li><Link href="#clubs">Clubs</Link></li>
                        <li><Link href="#contact">Contact</Link></li>
                    </div>
                </nav>
                <div className="logo-desktop">
                    <Link href="/">
                        <span>Cannabis Clubs Berlin</span>
                        <Image src={"/logo.webp"} width={75} height={75} alt="Cannabis Clubs Berlin Logo"/>
                    </Link>        
                </div>
            </header>
        </div>
    )
}