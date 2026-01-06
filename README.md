# Planet Eden

A clean, minimal, production-grade Next.js foundation ready for secure expansion.

## Tech Stack

- **Next.js 14** - App Router only
- **TypeScript** - Strict mode enabled
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
planeteden/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components (empty, ready for use)
├── lib/             # Utility functions and helpers
│   └── utils.ts      # Common utilities
├── services/         # Business logic (empty, ready for use)
├── contracts/        # Smart contract interfaces (empty, ready for use)
└── db/              # Database layer (empty, ready for use)
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## TypeScript Configuration

TypeScript is configured with strict mode enabled:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noUncheckedIndexedAccess: true`
- `noFallthroughCasesInSwitch: true`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Folder Structure Explanation

- **`/app`** - Next.js App Router directory. Contains routes, layouts, and pages.
- **`/components`** - Reusable React components. Empty, ready for your components.
- **`/lib`** - Utility functions and helpers. Contains common utilities.
- **`/services`** - Business logic layer. Empty, ready for service implementations.
- **`/contracts`** - Smart contract interfaces and types. Empty, ready for on-chain integration.
- **`/db`** - Database layer. Empty, ready for database schemas and utilities.

## Production Ready

This foundation is production-grade with:
- ✅ TypeScript strict mode
- ✅ Tailwind CSS configured
- ✅ Clean folder structure
- ✅ No demo or placeholder code
- ✅ Ready for secure expansion
