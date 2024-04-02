[33mcommit 1bc6d778210cabf59e75a01f7932f60aa3dc4eb9[m[33m ([m[1;36mHEAD -> [m[1;32mfrontend/clubspage[m[33m, [m[1;31morigin/frontend/clubspage[m[33m)[m
Author: Fabrizio <fabiecatinella@gmail.com>
Date:   Mon Apr 1 17:35:52 2024 +0100

    [CAN-21] Fix image URL not loading in clubs
    Problem
    Images no loading on clubs page due to /en | /de relative links
    
    Solution
    Removed root directory from middleware.
    Changed Club-listing component from html5 img tag to nextjs img tag
    Note
    N/A

[1mdiff --git a/app/[locale]/clubs/club-list.tsx b/app/[locale]/clubs/club-list.tsx[m
[1mindex b46ff27..c128473 100644[m
[1m--- a/app/[locale]/clubs/club-list.tsx[m
[1m+++ b/app/[locale]/clubs/club-list.tsx[m
[36m@@ -1,156 +1,157 @@[m
 import { useTranslations } from 'next-intl';[m
 import styles from './ClubCard.module.css';[m
 import Logo from '@/public/logo';[m
[32m+[m[32mimport Image from 'next/image';[m
 [m
 const clubs = [[m
     {[m
[31m-        "key": "club1",[m
[31m-      "name": "CSC High Ground Berlin e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "berlinBud1.webp",[m
[31m-        "clubPageUrl": ""[m
[32m+[m[32m        key: 'club1',[m
[32m+[m[32m        name: 'CSC High Ground Berlin e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '/berlinBud1.webp',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club2",[m
[31m-      "name": "Green Social Club e.V., im Norden von Berlin",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club2',[m
[32m+[m[32m        name: 'Green Social Club e.V., im Norden von Berlin',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club3",[m
[31m-      "name": "Aero Cannabis Club e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club3',[m
[32m+[m[32m        name: 'Aero Cannabis Club e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club4",[m
[31m-      "name": "Green Leaf Society e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club4',[m
[32m+[m[32m        name: 'Green Leaf Society e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club5",[m
[31m-      "name": "420 Club Berlin",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club5',[m
[32m+[m[32m        name: '420 Club Berlin',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club6",[m
[31m-      "name": "Bastardo CSC Berlin",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club6',[m
[32m+[m[32m        name: 'Bastardo CSC Berlin',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club7",[m
[31m-      "name": "CSC Berlin e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club7',[m
[32m+[m[32m        name: 'CSC Berlin e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club8",[m
[31m-      "name": "1000 Berlin 15 e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club8',[m
[32m+[m[32m        name: '1000 Berlin 15 e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club9",[m
[31m-      "name": "Cannabis Social Club Köpenick",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club9',[m
[32m+[m[32m        name: 'Cannabis Social Club Köpenick',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club10",[m
[31m-      "name": "CSC High on Earth e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club10',[m
[32m+[m[32m        name: 'CSC High on Earth e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club11",[m
[31m-      "name": "CSC Home of Hemp Berlin e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club11',[m
[32m+[m[32m        name: 'CSC Home of Hemp Berlin e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club12",[m
[31m-      "name": "Cannabis Social Club Prenzlauer Berg Berlin e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club12',[m
[32m+[m[32m        name: 'Cannabis Social Club Prenzlauer Berg Berlin e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club13",[m
[31m-      "name": "Cannabis Social Club meridiem Brandenburgo et Berolina e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club13',[m
[32m+[m[32m        name: 'Cannabis Social Club meridiem Brandenburgo et Berolina e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club14",[m
[31m-      "name": "Cannabis-Club Lammbock e. V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club14',[m
[32m+[m[32m        name: 'Cannabis-Club Lammbock e. V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club15",[m
[31m-      "name": "Cannamo Cannabis Club e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club15',[m
[32m+[m[32m        name: 'Cannamo Cannabis Club e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club16",[m
[31m-      "name": "High Society Cannabis Club e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club16',[m
[32m+[m[32m        name: 'High Society Cannabis Club e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club17",[m
[31m-      "name": "Hype and Dope, Cannabis Club Berlin e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club17',[m
[32m+[m[32m        name: 'Hype and Dope, Cannabis Club Berlin e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club18",[m
[31m-      "name": "Koala Cannabis Social Club Berlin e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club18',[m
[32m+[m[32m        name: 'Koala Cannabis Social Club Berlin e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club19",[m
[31m-      "name": "We Love Weed (WLW) – Cannabis Social Club Berlin Kreuzberg e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club19',[m
[32m+[m[32m        name: 'We Love Weed (WLW) – Cannabis Social Club Berlin Kreuzberg e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club20",[m
[31m-      "name": "Anbaufreunde Berlin Social Club e. V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[32m+[m[32m        key: 'club20',[m
[32m+[m[32m        name: 'Anbaufreunde Berlin Social Club e. V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
     },[m
     {[m
[31m-        "key": "club21",[m
[31m-      "name": "Cannabis Club Lammbock e.V.",[m
[31m-      "description": "",[m
[31m-      "imageUrl": "",[m
[31m-      "clubPageUrl": ""[m
[31m-    }[m
[31m-  ];[m
[32m+[m[32m        key: 'club21',[m
[32m+[m[32m        name: 'Cannabis Club Lammbock e.V.',[m
[32m+[m[32m        description: '',[m
[32m+[m[32m        imageUrl: '',[m
[32m+[m[32m        clubPageUrl: '',[m
[32m+[m[32m    },[m
[32m+[m[32m];[m
 [m
 export default function ClubsList() {[m
     const t = useTranslations('ClubsPage');[m
[36m@@ -159,22 +160,24 @@[m [mexport default function ClubsList() {[m
     });[m
     return ([m
         <div className={styles.container}>[m
[31m-          {clubs.map((club, index) => ([m
[31m-            <div className={styles.card} key={index}>[m
[31m-              <div className={styles.cardNumber}>#{index + 1}</div>[m
[31m-              <img[m
[31m-                src={club.imageUrl}[m
[31m-                alt={club.name + " Club Picture"}[m
[31m-                className={styles.cardImage}[m
[31m-              />[m
[31m-              <div className={styles.cardContent}>[m
[31m-                <h3 className={styles.cardTitle}>{club.name}</h3>[m
[31m-                <p className={styles.cardDescription}>[m
[31m-                  {club.description}[m
[31m-                </p>[m
[31m-              </div>[m
[31m-            </div>[m
[31m-          ))}[m
[32m+[m[32m            {clubs.map((club, index) => ([m
[32m+[m[32m                <div className={styles.card} key={index}>[m
[32m+[m[32m                    <div className={styles.cardNumber}>#{index + 1}</div>[m
[32m+[m[32m                    <Image[m
[32m+[m[32m                        src={club.imageUrl}[m
[32m+[m[32m                        alt={club.name + ' Club Picture'}[m
[32m+[m[32m                        width={300}[m
[32m+[m[32m                        height={300}[m
[32m+[m[32m                        className={styles.cardImage}[m
[32m+[m[32m                    />[m
[32m+[m[32m                    <div className={styles.cardContent}>[m
[32m+[m[32m                        <h3 className={styles.cardTitle}>{club.name}</h3>[m
[32m+[m[32m                        <p className={styles.cardDescription}>[m
[32m+[m[32m                            {club.description}[m
[32m+[m[32m                        </p>[m
[32m+[m[32m                    </div>[m
[32m+[m[32m                </div>[m
[32m+[m[32m            ))}[m
         </div>[m
[31m-      );[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m    );[m
[32m+[m[32m}[m
[1mdiff --git a/middleware.ts b/middleware.ts[m
[1mindex 492b417..df1061f 100644[m
[1m--- a/middleware.ts[m
[1m+++ b/middleware.ts[m
[36m@@ -10,5 +10,5 @@[m [mexport default createMiddleware({[m
  [m
 export const config = {[m
   // Match only internationalized pathnames[m
[31m-  matcher: ['/', '/(de|en)/:path*'][m
[32m+[m[32m  matcher: ['/(de|en)/:path*'][m
 };[m
\ No newline at end of file[m
