# The CCB Project

Main repository for [cannabisclubsberlin.com](https://cannabisclubsberlin.com), [berlincannabisclubs.de](https://berlincannabisclubs.de), and [berlincannabisclubs.info](https://berlincannabisclubs.info)

## About the Project

This project is a collaborative effort by Marc Auf der Heyde, Hector Jones, and Fabrizio Catinella to create a user-centred web application that helps users discover new cannabis clubs in Berlin. The web application aims to make all important cannabis-related information accessible in a post-legalization Berlin. Which clubs are available, which offer specific harm reduction services, alongside club ratings will be featured on the web application.

## Environment Requirements

- **NodeJS v20 (LTS):** [Download NodeJS](https://nodejs.org/en)
- **NPM:** Comes with NodeJS
- **NextJS:** The React framework for production

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
│   │   ├── ActionButton
│   │        ├── ActionButton.test.tsx
│   │        ├── ActionButton.test.tsx
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
│   └──
└── 
```

- **[locale]/(withheaderfooter)** Pages and their content.
- **[locale]/(withoutheaderfooter)** Pages and their content without header and footer, for map pages.
- **app/components:** Reusable components used throughout the application.
- **app/helpers:** Utility functions and helpers.
- **public:** Static assets like images, fonts, etc.

## Coding Conventions

To maintain consistency across the project, we follow these coding conventions:

### 1. **JavaScript/TypeScript:**
   - Use TypeScript for type safety.
   - Use `const` and `let` instead of `var`.
   - Prefer arrow functions over regular functions (unless for function components).
   - Use template literals for string concatenation.

### 2. **React/NextJS:**
   - Use functional components with hooks.
   - Organize components in the `components` folder.
   - Name component files with PascalCase (e.g., `ContactForm.tsx`).
   - Use the `useEffect` hook for side effects.

### 3. **CSS/Styling:**
   - Use CSS modules or styled-components for component-specific styles.
   - Global styles should be placed in `globals.css`.
   - Follow a BEM-like naming convention for class names.

### 4. **Testing:**
   - Write tests for components and helpers.
   - Use Jest and React Testing Library for testing.
   - Mock dependencies and APIs in tests.
   - Place test files alongside the components/helpers they test, with a `.test.tsx` or `.test.ts` extension.

## Contributing

We welcome contributions! Please follow the coding conventions outlined above, and ensure that all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License.