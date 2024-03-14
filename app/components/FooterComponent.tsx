import Link from "next/link";

export default function FooterComponent() {
    return (
        <div>
                  <footer>
                    <div className="footer-content">
                        <p>&copy; 2024 CannabisClubsBerlin.com. All rights reserved.</p>
                        <ul className="footer-nav">
                            <li><Link href="/imprint">Imprint</Link></li>
                            <li><Link href="/termsofuse">Terms of Use</Link></li>
                        </ul>
                    </div>
                </footer>
        </div>
    );
}