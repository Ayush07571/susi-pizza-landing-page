# Susi's Universe 🍕

A cinematic, scroll-driven Next.js website for Susi Pizza, a real local pizza brand in Ranchi, Jharkhand, India. 
Built using Next.js 14, React Three Fiber, Three.js, GSAP, Lenis, Framer Motion, and Zustand.

## Tech Stack
- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber, Drei, Three.js (GLSL Shaders)
- **Animation**: GSAP (ScrollTrigger), Framer Motion
- **Scrolling**: Lenis
- **State Management**: Zustand

## Quick Start

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This project is fully optimized for Vercel deployment.
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and log in.
3. Click **Add New** > **Project** and import your GitHub repository.
4. Leave the default settings (Next.js framework) and click **Deploy**.
5. Once complete, your project will be live!

## Image Replacement Guide

For the initial build, we generated SVG placeholders for all the visual assets to ensure the project runs seamlessly while waiting for the real production photos.
When you are ready to replace them, simply drop your real image files (matching the exact filename and correct extension) into the `public/images/` directory.

**Note:** The current placeholders use the `.svg` extension for best browser compatibility. Once you replace them, make sure to update the extensions in `lib/constants.ts` and the `src/` prop in your `<Image>` components to match `.jpg` or `.png`.

| Filename | Description / What to replace with |
|----------|------------------------------------|
| `logo-dark.svg` | Real Susi Pizza logo files (Dark variant) |
| `logo-light.svg` | Real Susi Pizza logo files (Light variant) |
| `entrance-hero-bg.svg` | Real restaurant interior photo |
| `flour-texture.svg` | Flour particle texture |
| `pizza-hero.svg` | Real product photo of signature pizza |
| `topping-babycorn.svg` | Real close-up photo of Baby Corn |
| `topping-paneer.svg` | Real close-up photo of Paneer |
| `topping-mushroom.svg` | Real close-up photo of Mushroom |
| `topping-capsicum.svg` | Real close-up photo of Capsicum |
| `topping-tomato.svg` | Real close-up photo of Tomato |
| `topping-cheese.svg` | Real close-up photo of Cheese Pull |
| `space-bg.svg` | Deep space background (or keep placeholder) |
| `cheese-drip-texture.svg` | Real macro cheese photo for GLSL shader |
| `station-dough.svg` | Real station photo (Dough station) |
| `station-sauce.svg` | Real station photo (Sauce station) |
| `station-oven.svg` | Real station photo (Oven station) |
| `kitchen-bg.svg` | Real kitchen panorama photo |
| `menu-pizza-base.svg` | Real top-down pizza base photo |
| `menu-panel-bg.svg` | Menu panel background (or keep placeholder) |
| `price-tag.svg` | Price tag UI element (or keep placeholder) |
| `ranchi-map-stylised.svg` | Stylised map of Ranchi (or keep placeholder) |
| `outlet-harmu.svg` | Real photo of the Harmu outlet |
| `outlet-lalpur.svg` | Real photo of the Lalpur outlet |
| `footer-dust.svg` | Flour dust particles for footer animation |
| `og-image.svg` | Final branded Open Graph social share image |

## Architecture Notes
- The application automatically switches between a robust 3D environment for Desktop and Tablet, and an optimized 2D fallback for Mobile using the custom `useDeviceDetect` hook.
- Ensure all 3D Canvas components remain wrapped in `next/dynamic` with `{ ssr: false }` to prevent hydration mismatches.
