# ModeX
A modern, fully client-side e-commerce web application built with **Next.js 15** and **TypeScript**. ModeX supports product browsing with advanced filtering, a shopping cart, wishlist, user authentication, profile management, and a checkout flow — all without a backend or database.


## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Form Handling: React Hook Form + Zod
- Auth: Custom (bcryptjs-react, localStorage)
- Image Slider: Swiper.js

## Features
- Product listing — grid view with search, sort, and multi-filter support (gender, category, size, color, price range, season)
- Product detail — image carousel, size/color selector, stock tracking, add to cart
- Reviews — users can leave comments and star ratings, persisted in localStorage
- Shopping cart — add/remove items, quantity management, real-time stock enforcement
- Wishlist — save favourite products across sessions
- Authentication — register and login with password hashing via bcrypt
- User profile — update personal info, upload profile picture, manage saved payment cards
- Checkout — order summary, address form, discount code support
- Contact form — sends messages via EmailJS
- Dark / light theme — toggle with system preference detection and persistence
- Error boundaries — graceful fallback UI for unexpected runtime errors

## Data & Storage
ModeX has no backend. All data is handled client-side:

- Product catalogue - `public/data/products.json`
- User accounts - `localStorage` (password hashed with bcrypt) 
- Cart - `localStorage` 
- Wishlist - `localStorage` 
- Stock levels - `localStorage` (deducted on checkout)
- Product reviews - `localStorage` per product 
- Payment cards - `localStorage` 
- Profile image - `localStorage` (base64) 
- Theme preference - `localStorage` 

## Getting Started

### Prerequisites
 
- Node.js 18+
- npm
### Installation
 
**1. Clone the repository**
```bash
git clone https://github.com/AminAgayev7/FinalProject.git
cd modex
```
 
**2. Install dependencies**
```bash
npm install
```
 
**3. Run the development server**
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 


## Available Scripts
- npm run dev - Start development server
- npm run build - Build for production
- npm run start - Start production server
- npm run lint - Run ESLint

## Pages
- `/` - Homepage 
- `/products` - Product listing with filters 
- `/products/[id]` - Product detail with reviews 
- `/cart` - Shopping cart 
- `/checkout` - Order checkout 
- `/wishlist` - Saved products 
- `/auth/login` - Login
- `/auth/register` - Register 
- `/profile` - User profile
- `/contact` - Contact form

## Notes
 
- All user data persists in the browser's `localStorage` — clearing browser data will reset accounts, cart, and wishlist.
- Product stock is tracked per session; purchasing an item reduces its available stock in localStorage.
- The app uses **Next.js App Router** with a mix of Server Components (for metadata/SEO) and Client Components (for interactivity).
- Password hashing is done in the browser via `bcryptjs-react` — suitable for demos but not for production use with sensitive data.
