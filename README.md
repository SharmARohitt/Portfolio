# Modern Portfolio Website

A modern, interactive portfolio website featuring:

## Features

- **Galaxy Background**: Interactive starfield that responds to mouse movements
- **Gooey Navigation**: Modern bubble-style menu with smooth animations
- **Skills Orbit**: Circular orbit display of skills with scroll-triggered animations
- **Rotating Text Effects**: Text with changing font styles
- **Dot Grid Background**: Interactive dot grid that responds to mouse position
- **Circular Project Gallery**: 3D carousel of projects with detailed modal views

## Tech Stack

- **Next.js**: React framework for server-rendered React applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: Animation library for advanced animations
- **Framer Motion**: Animation library for React
- **React Icons**: Icon library
- **OGL**: Minimal WebGL library for the Galaxy effect

## Project Structure

```
/src
  /app - Next.js app router pages
  /components - UI components
    /layouts - Layout components
    /ui - Reusable UI components
  /contexts - React context providers
  /utils - Utility functions
/public - Static assets
```

## Getting Started

First, run the development server:

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

## Customization

- Update personal information in `/src/app/page.tsx`
- Add your projects in `/src/components/CircularGallery.tsx`
- Customize skills in `/src/components/Skills.tsx`

## License

MIT
