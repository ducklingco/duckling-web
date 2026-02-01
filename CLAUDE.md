# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Duckling Web Player is a Nuxt 3 media presentation platform for browsing "Ducks" (collections of media content called "Ducklings"). Users can view media in carousel format, share content socially, join nests via invite links, and support campaigns with payments.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

## Architecture

### Data Flow
- **Backend**: Separate Duckling backend service (configured via `NUXT_PUBLIC_BACKEND_URL`)
- **Database**: SurrealDB for campaign data (connection managed in `server/databaseClient.ts`)
- **API**: Server routes in `server/api/` proxy to backend or handle payments directly

### Key Patterns

**Server-side rendering** is enabled. Routes under `/duck/**` use SWR caching (60s stale-while-revalidate).

**Pinia stores** (`stores/`):
- `ducks.ts` - Duck list with pagination, filtering (verified/featured/all), localStorage caching
- `user.ts` - User state

**Composables** (`composables/`):
- `usePlayer` - Media playback state
- `useCardNavigation` - Carousel navigation logic

**Card components** render different duckling types:
- `CardCover`, `CardImage`, `CardVideo`, `CardText`

### API Routes

| Route | Purpose |
|-------|---------|
| `/api/ducks` | List ducks with filtering |
| `/api/duck/[id]` | Get single duck details |
| `/api/payment/*` | QuickPay integration |
| `/api/proxy` | Proxy requests to backend |
| `/api/login` | Authentication |

### Environment Variables

Public (client-accessible):
- `NUXT_PUBLIC_BACKEND_URL` - Backend API URL
- `NUXT_PUBLIC_WEB_PLAYER_URL` - This app's URL

Private (server-only):
- `NUXT_QUICKPAY_API_KEY`, `NUXT_QUICKPAY_PRIVATE_KEY` - Payment processing
- `NUXT_CAMPAIGN_DB_*` - SurrealDB connection (URL, USERNAME, PASSWORD, NAMESPACE, DATABASE)

## Styling

Tailwind CSS with custom Duckling brand colors defined in `tailwind.config.ts`:
- Primary green: `#009c1a`
- Custom font: Newsreader (in `assets/fonts/`)

## Deployment

Production uses Docker (see `docker-compose.yml`):
- Nuxt container serves the app
- Nginx reverse proxy handles SSL termination
