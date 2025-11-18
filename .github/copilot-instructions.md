## Purpose
This file tells AI coding agents how this repository is organized, how to run and change it, and which patterns and files matter most for productive edits.

**Quick Start**
- `dev`: Run `npm run dev` (uses `ts-node-dev`) to start the server with live reload. Entry: `src/server.ts`.
- `build`: Run `npm run build` to compile TypeScript to `dist/` (`tsc`) and then `npm run start` to run `dist/server.js`.
- `lint`: Run `npm run lint` to run ESLint over `./src`.

**Required env vars** (see `src/app/config/env.ts`)
- `PORT`, `MONGO_URL`, `BCRYPT_SALT_ROUNDS`, `NODE_ENV`
- `JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRES`, `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRES`

**Big Picture / Architecture**
- TypeScript Node + Express backend with Mongoose for MongoDB. App exported from `src/app.ts`; server bootstrap and DB connect in `src/server.ts`.
- Routing: `src/app/routes/index.ts` mounts per-module routers (e.g. `auth`, `teams`). Add new modules by following the existing module shape and registering the route.
- Modules follow a strict folder shape: `controller`, `service`, `route`, `model`, `validation`, `interface`. Example: `src/app/modules/auth/*`.

**Common patterns and conventions**
- Controllers are thin and async-wrapped with `catchAsync` (see `src/app/utils/catchAsync.ts`). Use `sendResponse` (in `src/app/utils/sendResponse.ts`) to marshal responses.
- Services contain business logic and return data consumed by controllers. Prefer returning plain objects (no Response objects) from services.
- Validation uses `zod`. Schemas live in `*.validation.ts` and route-level validation uses `validateSchema` middleware (`src/app/middleware/validateSchema.ts`).
- Errors flow through a central `globalErrorHandler` (`src/app/middleware/globalErrorHandler.ts`) which normalizes Mongoose, Zod, duplicate, and AppError instances.
- Models are Mongoose models in `*.model.ts` files under each module; interfaces describing DTOs are in `*.interface.ts`.
- Routes export an Express `Router` (example `authRoutes` in `src/app/modules/auth/auth.route.ts`) and are plugged in `src/app/routes/index.ts`.

**Utilities & integration points**
- Cookie helpers: `src/app/utils/setCookies.ts` and `userTokens.ts` manage access/refresh tokens.
- JWT helpers: see `src/app/utils/jwt.ts`.
- sendResponse: standard response shape (statusCode, success, message, data, meta).

**Editing guidance / good first changes**
- To add a module: copy shape from `src/app/modules/auth/` or `team/`, implement `route`, register in `src/app/routes/index.ts`.
- To add route-level validation: create a Zod schema in `module.validation.ts` and wrap routes with `validateSchema(...)`.
- To add a DB model change: update the model file and keep service/controller behavior backwards compatible; adjust error handling for Mongoose validation or duplicate keys.

**Debugging & Running**
- Development: `npm run dev`. Ensure `.env` has `MONGO_URL`; server logs occur in `src/server.ts`.
- Production build: `npm run build` then `npm run start` (reads compiled `dist/server.js`).
- If errors are swallowed in dev, `env.NODE_ENV` controls stack traces (see `catchAsync` & `globalErrorHandler`).

**Files to inspect first when making REST changes**
- `src/app/routes/index.ts` — where module routers are mounted
- `src/app/modules/*/*.route.ts` — route definitions and attached middleware
- `src/app/modules/*/*.controller.ts` — controller layer (uses `catchAsync`)
- `src/app/modules/*/*.service.ts` — business logic
- `src/app/modules/*/*.validation.ts` — request schema definitions

**What not to change lightly**
- `src/app/config/env.ts` — strict required env var checks; throws on missing vars.
- `src/app/middleware/globalErrorHandler.ts` — centralizes error shapes used across the app.

If any section is unclear or you want me to include examples (e.g., how to add a new `task` route or how to mock `MONGO_URL` for local runs), tell me which part to expand and I'll iterate.
