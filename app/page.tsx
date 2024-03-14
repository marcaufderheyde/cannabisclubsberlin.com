'use client'
import Image from "next/image";
import React, { useEffect } from 'react';
import HeadComponent from "./components/HeadComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderHomeComponent from "./components/HeaderHomeComponent";
import Link from "next/link";

export default function Home() {
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
      <HeaderHomeComponent/>
      <main>
          <section id="home-banner">
              <div className="banner-content">
                  <h1>Welcome to Cannabis Clubs Berlin</h1>
                  <p>Discover the vibrant cannabis culture of Berlin.</p>
                  <Link href="#about" className="btn">Learn More</Link>
              </div>
          </section>

          <section id="home">
              <h1>Welcome to Cannabis Clubs Berlin</h1>
              <p>Explore the world of legal cannabis in Berlin, starting officially on the 1st of April, 2024!</p>
          </section>
          
          <section id="about">
              <h1>About</h1>
              <div className="content-with-image">
                  <Image src={"berlinBud1.webp"} width={100} height={100} alt="About Us"/>
                  <p>About our mission and the benefits of cannabis. We're dedicated to sustainability and health.</p>
              </div>
              <div className="right-button-section">
                  
                  <Link href="/about" className="aboutbtn">Learn More</Link>
              </div>
          </section>
          
          <section id="clubs">
              <h1>Clubs</h1>
              <div className="content-with-image">
                  <Image src="berlinBud2.webp" width={100} height={100} alt="Our Clubs"/>
                  <p>Find out more information about the various cannabis clubs available in Berlin.</p>
              </div>
              <div className="right-button-section">
                  <Link href="/clubs" className="aboutbtn">Learn More</Link>
              </div>
          </section>
          
          <section id="contact">
              <h1>Contact</h1>
              <div className="content-with-image">
                  <Image src="berlinBud3.webp" width={100} height={100} alt="Contact Us"/>
                  <p>Have questions or want to connect? Contact us through email, phone, or visit us at our location.</p>
              </div>
              <div className="right-button-section">
                  <Link href="/contact" className="aboutbtn">Learn More</Link>
              </div>
          </section>
      </main>
      <FooterComponent/>
    </div>
  );
}