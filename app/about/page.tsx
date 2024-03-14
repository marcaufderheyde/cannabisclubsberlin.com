'use client'
import React, { useEffect } from 'react';
import HeadComponent from "../components/HeadComponent";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";

export default function About() {
  useEffect(() => {
    // Assuming you're using Next.js for SPA and React for UI, 
    // check for "index.html" in URL might not be directly applicable.
    // Adjust the logic based on your routing setup if needed.
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      // Handles smooth scrolling for '.nav-links a' and '.btn'
      const handleSmoothScroll = (selector: string) => {
        const links = document.querySelectorAll(selector);
        links.forEach(link => {
          link.addEventListener('click', function (this: HTMLAnchorElement, e: MouseEvent) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
              const targetSection = document.querySelector(href);
              if (targetSection) {
                targetSection.scrollIntoView({
                  behavior: 'smooth',
                });
              }
            }
          });
        });
      };

      // Initialize smooth scroll for both sets of links
      handleSmoothScroll('.nav-links a');
      handleSmoothScroll('.btn');
    }
  }, []);

  return (
    <div>
      <HeadComponent/>
      <HeaderComponent currentPage="about"/>
        <main>
            <section className="content-section">
                <h1>About</h1>
                <p>CannabisClubsBerlin.com is your premier source for insights into cannabis clubs in Berlin, offering comprehensive reviews and information to guide the Berlin population through the myriad of cannabis options available in the city. Our mission is to educate and inform users about the vibrant cannabis culture in Berlin and to navigate the local regulations regarding cannabis use and club memberships.</p>
                <br/>
                <p>
                    On this page you will find information about cannabis in Berlin, how it all works, where you can buy it, and how you can get started!
                </p>
                <br/>
                <p>The information provided on CannabisClubsBerlin.com aims to support, but not replace, the direct relationship between visitors and cannabis clubs or legal advisors.</p>
            </section>
        </main>
      <FooterComponent/>
    </div>
  );
}