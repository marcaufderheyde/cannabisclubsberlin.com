[![deployment](https://github.com/marcaufderheyde/cannabisclubsberlin.com/actions/workflows/nextjs.yml/badge.svg?branch=main)](https://github.com/marcaufderheyde/cannabisclubsberlin.com/actions/workflows/nextjs.yml)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

# The CCB Project

Main repository for [cannabisclubsberlin.com](https://cannabisclubsberlin.com), [berlincannabisclubs.de](https://berlincannabisclubs.de), and [berlincannabisclubs.info](https://berlincannabisclubs.info)

## About the Project

This project is a collaborative effort by Marc Auf der Heyde, Hector Jones, and Fabrizio Catinella to create a user-centred web application that helps users discover new cannabis clubs in Berlin. The web application aims to make all important cannabis-related information accessible in a post-legalization Berlin. Which clubs are available, which offer specific harm reduction services, alongside club ratings will be featured on the web application.

## Environment Requirements

-   **NodeJS v20 (LTS):** [Download NodeJS](https://nodejs.org/en)
-   **NPM:** Comes with NodeJS
-   **NextJS:** The React framework for production

## Getting Started

First, install dependencies:

```bash
npm install
```

Next, run the setup scripts:

```bash
npm run prestart
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project is organized as follows, please note this structure is in draft and yet to be finalized:

```plaintext
├── app
│   ├── [locale]
│   │   ├── (withheaderfooter)
│   │        ├── about
│   │           ├── about-content.tsx
│   │           ├── page.tsx
│   │        ├── clubs
│   │           ├── [club_name]
│   │               ├── page.tsx
│   │        ├── contact
│   │           ├── contact-content.tsx
│   │           ├── page.tsx
│   │        ├── imprint
│   │           ├── imprint-content.tsx
│   │           ├── page.tsx
│   │        ├── law
│   │           ├── law-content.tsx
│   │           ├── page.tsx
│   │        ├── termsofuse
│   │           ├── termsofuse-content.tsx
│   │           ├── page.tsx
│   │        ├── favicon.ico
│   │        ├── layout.tsx
│   │        ├── page.tsx
│   │   ├── (withoutheaderfooter)
│   │        ├── clubs
│   │        │  ├── club-list.tsx
│   │        │  ├── clubs-content.tsx
│   │        │  ├── page.tsx
│   │        ├── clubs
│   ├── components
│   │   ├── AutoScaler
│   │        ├── helpers
│   │        │  ├── classNameMatcher.tsx
│   │        │  ├── classNameMatcher.test.tsx
│   │        ├── AutoScaler.test.tsx
│   │        ├── AutoScaler.test.tsx
│   ├── data
│   │   ├── clubs.ts
│   ├── helpers
│   │   ├── clubsListContent.test.ts
│   │   ├── clubsListContent.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
├── messages
│   ├── de.json
│   ├── en.json
├── public
│   ├── images
├── scripts
│   ├── pre-push
├── .eslintrc.json
├── .gitignore
├── .gitmessage
├── CNAME
├── generate-sitemap.mjs
├── i18n.ts
├── jest.config.js
├── jest.setup.js
├── next-sitemap.config.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── robots.txt
├── tailwind.config.ts
├── tsconfig.jest.json
├── tsconfig.json
├── .github/workflows
├── __mocks__
│   ├── next-intl.js
└──
```

-   **[locale]/(withheaderfooter)** Pages and their content.
-   **[locale]/(withoutheaderfooter)** Pages and their content without header and footer, for map pages.
-   **app/components:** Reusable components used throughout the application.
-   **app/components/[ComponentName]:** Reusable components used throughout the application, specific to the component, ComponentName (i.e., they are only used by the main component with name ComponentName).
-   **app/components/[ComponentName]/helpers:** Helpers specific to ComponentName, not used by other components.
-   **app/data:** Static content used across the site, clubs.ts holds core information that requires no translation.
-   **app/helpers:** Utility functions and helpers used by multiple components.
-   **public:** Static assets like images, fonts, etc.

## Coding Conventions

To maintain consistency across the project, we follow these coding conventions:

### 1. **JavaScript/TypeScript:**

-   Use TypeScript for type safety.
-   Use `const` and `let` instead of `var`.
-   Prefer arrow functions over regular functions (unless for function components).
-   Use template literals for string concatenation.

### 2. **React/NextJS:**

-   Use functional components with hooks.
-   Organize components in the `components` folder.
-   Name component files with PascalCase (e.g., `ContactForm.tsx`).
-   Use the `useEffect` hook for side effects.

### 3. **CSS/Styling:**

-   Use CSS modules or styled-components for component-specific styles.
-   Global styles should be placed in `globals.css`.
-   Follow a BEM-like naming convention for class names.

### 4. **Testing:**

-   Write tests for components and helpers.
-   Use Jest and React Testing Library for testing.
-   Mock dependencies and APIs in tests.
-   Place test files alongside the components/helpers they test, with a `.test.tsx` or `.test.ts` extension.

### 5. **Git Commit Messages:**

-   Follow .gitmessage found in the root directory.

## Contributing

We welcome contributions! Please follow the coding conventions outlined above, and ensure that all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License.
