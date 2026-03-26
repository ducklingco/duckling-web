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

## SurrealDB v2 Compatibility

### Fix query parameter `$` prefix in payment webhook

**Task:** Remove `$` prefix from query binding keys in `server/api/payment/webhook.ts`.

SurrealDB v2 expects binding keys *without* the `$` prefix — the server adds it internally. The current code passes `{ $timestamp, $orderId }` which means the query's `$orderId` resolves to nothing, so the `UPDATE campaign_supporter` in the webhook silently matches zero records. Payments get created but are never marked as captured.

The same pattern should be checked in any other `dbClient.query()` call site.

### Fix `dbClient.ready` connection check

**Task:** Replace `dbClient.ready` boolean checks in `server/databaseClient.ts` with `dbClient.status` checks.

In `surrealdb` JS SDK v1.2.1, `ready` is `Promise<void> | undefined` — once a connection is attempted it becomes a Promise (always truthy), even if the connection later drops. The reconnection logic in `checkDbConnection()` and `checkConnectionAndReturnClient()` never triggers a reconnect after the initial connection. Use `dbClient.status === "connected"` instead.

### Await `dbClient.create()` in payment creation

**Task:** Add `await` to the `dbClient.create()` call in `server/api/payment/create.ts:168`.

The campaign supporter record creation is fire-and-forget — if it fails, the error is silently swallowed and no record is persisted. The payment flow continues regardless, leaving the system with a QuickPay payment but no matching database record.

