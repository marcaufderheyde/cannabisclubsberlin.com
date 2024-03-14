'use client'
import React, { useEffect } from 'react';
import HeadComponent from "../components/HeadComponent";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";

export default function Clubs() {
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
      <HeaderComponent currentPage="clubs"/>
        <main>
            <section className="content-section">
                <h1>Clubs</h1>
                <p>CannabisClubsBerlin.com is your premier source for insights into cannabis clubs in Berlin, offering comprehensive reviews and information to guide the Berlin population through the myriad of cannabis options available in the city. Our mission is to educate and inform users about the vibrant cannabis culture in Berlin and to navigate the local regulations regarding cannabis use and club memberships.</p>
                <br/>
                <p>
                    On this page you will find information on all the cannabis clubs in Berlin.
                </p>
                <br/>
                <p>The information provided on CannabisClubsBerlin.com aims to support, but not replace, the direct relationship between visitors and cannabis clubs or legal advisors.</p>
            </section>
        </main>
      <FooterComponent/>
    </div>
  );
}