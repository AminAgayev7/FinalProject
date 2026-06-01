# ModeX
A modern e-commerce web application built with Next.js 15, featuring product browsing, cart management, user authentication, and more.


## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Form Handling: React Hook Form + Zod
- Auth: Custom (bcryptjs-react, localStorage)
- Image Slider: Swiper.js

## Features
- Simple and user-friendly interface
- Product listing with search-bar and filteration system
- Product detail page with image slider and reviews
- Shopping cart with quantity management and stock tracking
- Wishlist
- User authentication (register, login, logout)
- Password hashing via bcrypt
- User profile with payment card management and profile image upload
- Reviewing products via Local Storage
- Checkout with discount code support
- Dark / light theme toggle
- Error boundaries for graceful error handling

## Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/your-username/modex.git
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

## Notes
- User data (auth, cart, wishlist, cards) is stored in `localStorage` — no backend or database required.
- Product data is served from `public/data/products.json`.
- Stock levels are tracked per session via `localStorage`.
