# StoreFront - Product Dashboard

A modern product dashboard built with React, Redux Toolkit, and custom CSS styling. This application allows users to browse products from the Fake Store API, filter and sort them, view detailed product information, and maintain a list of favorite products.

## Features

- Product listing with responsive grid layout
- Product search with debounced input
- Category filtering and price/rating sorting
- Detailed product pages
- Favorites management with localStorage persistence
- Light/dark theme toggle
- Comprehensive test coverage

## Tech Stack

- React 18 with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Custom CSS for styling (no UI libraries)
- Vitest for testing
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:5173 to view the application in your browser.

## Testing

Run tests with:

```bash
npm test
```

## Build

To build the application for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── filters/       # Search and filter components
│   ├── layout/        # Layout components (Header, Footer)
│   └── products/      # Product-related components
├── hooks/             # Custom hooks
├── pages/             # Page components
├── store/             # Redux store setup
│   └── slices/        # Redux slices
├── types/             # TypeScript types
└── __tests__/         # Test files
```

## Features

### Products Page
- Displays all products in a responsive grid
- Allows filtering by category
- Provides sorting by price and rating
- Implements debounced search functionality

### Product Detail Page
- Shows complete product information
- Displays product image, price, description, and rating
- Allows adding/removing products from favorites

### Favorites Page
- Lists all favorited products
- Provides ability to remove products from favorites
- Shows empty state when no favorites exist

### Theme Toggle
- Supports light and dark themes
- Persists theme preference in localStorage
- Automatically detects system preference on first visit