# Required Package Updates

## New Dependencies to Install

The analytics and experimentation system requires two additional packages:

### 1. Google Analytics Data API

\`\`\`bash
pnpm add @google-analytics/data
\`\`\`

**Purpose:** Fetch metrics from GA4 for custom dashboards  
**Used in:** `lib/ga4-data-api.ts`, `app/api/analytics/dashboard/route.ts`  
**Size:** ~500KB  
**License:** Apache-2.0  

### 2. Vercel Edge Config

\`\`\`bash
pnpm add @vercel/edge-config
\`\`\`

**Purpose:** Server-side A/B testing configuration  
**Used in:** `lib/ab-testing.ts`, `middleware.ts`  
**Size:** ~50KB  
**License:** Apache-2.0  

## Installation Commands

### Using pnpm (Recommended)

\`\`\`bash
pnpm add @google-analytics/data @vercel/edge-config
\`\`\`

### Using npm

\`\`\`bash
npm install @google-analytics/data @vercel/edge-config
\`\`\`

### Using yarn

\`\`\`bash
yarn add @google-analytics/data @vercel/edge-config
\`\`\`

## Verification

After installation, verify packages are in `package.json`:

\`\`\`json
{
  "dependencies": {
    "@google-analytics/data": "^4.x.x",
    "@vercel/edge-config": "^1.x.x",
    // ... other dependencies
  }
}
\`\`\`

## Alternative: Manual package.json Update

If you prefer to update `package.json` manually, add these lines to the `dependencies` section:

\`\`\`json
"@google-analytics/data": "^4.7.0",
"@vercel/edge-config": "^1.1.1"
\`\`\`

Then run:

\`\`\`bash
pnpm install
\`\`\`

## TypeScript Types

Both packages include TypeScript definitions, so no additional `@types/*` packages are needed.

## Build Verification

After installation, verify the build works:

\`\`\`bash
npm run build
\`\`\`

Expected output:
- No TypeScript errors
- No module resolution errors
- Build completes successfully

## Notes

- **@google-analytics/data** requires Node.js 14+ (already satisfied by Next.js 14)
- **@vercel/edge-config** requires Vercel Pro plan for production use
- Both packages are production-ready and actively maintained by Google/Vercel
