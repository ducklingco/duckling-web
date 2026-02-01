# Backlog

## Code Quality

### Fix TypeScript errors in components

**Task:** Investigate and fix TypeScript errors throughout the codebase.

Running `vue-tsc --noEmit` shows multiple errors in:
- `components/CarouselDrawer.vue` - implicit `any` types, property access on `never`
- `components/DuckCarousel.client.vue` - property access on `never` types
- `components/QRCode.vue` - type mismatches with `qr-code-styling` library

These errors should be addressed to ensure type safety and catch potential bugs.

### Audit server-side logging

**Task:** Review and improve server-side logging for error tracking and debugging.

Check if the Nuxt server has proper logging configured:
- Are errors being logged with sufficient context?
- Is there structured logging for production debugging?
- Are API route errors properly captured?
- Consider adding a logging library if needed (e.g., pino, consola)

## Documentation

### Update CLAUDE.md to use pnpm commands

**Task:** Replace `npm` with `pnpm` in CLAUDE.md commands section.

The project uses pnpm (has `pnpm-lock.yaml`) but the documentation shows `npm run dev`, `npm run build`, etc. This should be updated to `pnpm run dev`, `pnpm run build`, etc. to match actual usage.
