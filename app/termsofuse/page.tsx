'use client'
import React, { useEffect } from 'react';
import HeadComponent from "../components/HeadComponent";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";

export default function TermsOfUse() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
          const handleSmoothScroll = (selector: string) => {
            const links = document.querySelectorAll(selector);
            links.forEach(link => {
              link.addEventListener('click', function(e: Event) {
                e.preventDefault();
                const clickedElement = e.currentTarget as HTMLAnchorElement; // Safe cast since we know the context
                const href = clickedElement.getAttribute('href');
                if (href && href.startsWith('#')) {
                  const targetSection = document.querySelector(href) as HTMLElement; // Type assertion
                  if (targetSection) {
                    targetSection.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }
                }
              });
            });
          };
      
          // Example usage
          handleSmoothScroll('.nav-links a');
          handleSmoothScroll('.btn');
        }
      }, []); // Assuming no dependencies

  return (
    <div>
      <HeadComponent/>
      <HeaderComponent currentPage="termsofuse"/>
        <main>
            <section className="content-section">
                <h1>Terms of Use</h1>
                <br/>
                <p>Welcome to CannabisClubsBerlin.com. By accessing and using this website, you agree to the following terms and conditions:</p>
                <br/>

                <h2>1. Acceptance of Terms:</h2>
                <p>The services provided by CannabisClubsBerlin.com are subject to the following terms of use. We reserve the right to update the terms at any time without notice. Your continued use of the website after such modifications will constitute your acknowledgment and agreement to the modified terms and conditions.</p>
                <br/>

                <h2>2. Use of Website Information:</h2>
                <p>This website offers information about cannabis clubs in Berlin, including reviews and regulatory information. This information is provided for general informational purposes only and should not be considered as legal advice. Users are encouraged to consult with professional legal advisors for specific advice regarding cannabis regulations in Berlin.</p>
                <br/>

                <h2>3. Content Ownership and Copyright:</h2>
                <p>All content on this website, including text, graphics, logos, and images, is the property of CannabisClubsBerlin.com or its content suppliers and is protected by international copyright laws.</p>
                <br/>

                <h2>4. Limitation of Liability:</h2>
                <p>CannabisClubsBerlin.com will not be liable for any damages arising from the use of this website or from any information, content, materials, or products included on this site.</p>
                <br/>

                <h2>5. Links to Third-Party Websites:</h2>
                <p>CannabisClubsBerlin.com may include links to external websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</p>
                <br/>

                <h2>6. Governing Law:</h2>
                <p>These terms of use are governed by the laws of Germany. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts of Germany.</p>
                <br/>

                <p>By using CannabisClubsBerlin.com, you agree to comply with these Terms of Use. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            </section>
        </main>
      <FooterComponent/>
    </div>
  );
}