# beyond-himalaya

A React + TypeScript + Vite transaction management dashboard application.

## Prerequisites

- Node.js (v16 or higher)
- pnpm package manager

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd beyond-himalaya
```

2. Install dependencies:
```bash
pnpm install
```

### Development

To start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build

To build the project for production:

```bash
pnpm build
```

### Preview

To preview the production build locally:

```bash
pnpm preview
```

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `hooks/` - Custom React hooks
  - `services/` - API services
  - `lib/` - Utility functions
  - `types/` - TypeScript type definitions
  - `providers/` - React context providers
- `public/data/` - Mock transaction data

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching and caching
- **Radix UI** - Headless UI components
- **Recharts** - Chart visualization
- **Sonner** - Toast notifications
