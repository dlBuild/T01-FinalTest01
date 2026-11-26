# REST API (base: `/api`)

Auth uses an httpOnly cookie set at login/register. `A` = admin only.

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /auth/register | - | name, email, phone (10-digit), password (min 8) |
| POST | /auth/login | - | email, password |
| POST | /auth/logout | - | clears cookie |
| GET / PUT | /auth/me | user | current user / update name, phone |
| POST | /auth/forgot-password | - | emails reset link |
| PUT | /auth/reset-password/:token | - | set new password |
| GET | /products | - | `?category=&q=&featured=true&page=&limit=` |
| GET | /products/:slug | - | product details |
| GET | /content/home | - | landing page content |
| POST | /orders/checkout | user | `{productId}` -> creates order, returns Cashfree session (or `free:true`) |
| GET | /orders/:orderId/status | user | verifies with Cashfree and returns status |
| GET | /orders/my | user | my orders |
| POST | /orders/:orderId/mock-pay | user | mock mode only |
| POST | /payments/webhook | Cashfree | signed webhook (raw body) |
| GET | /library | user | unlocked products |
| GET | /library/:productId/open | user | link URL or download route (needs access) |
| GET | /library/:productId/download | user | file stream (needs access) |
| GET | /admin/stats | A | revenue, counts, recent orders |
| GET / PUT | /admin/users, /admin/users/:id/toggle-status | A | manage users |
| GET | /admin/orders | A | `?status=&q=` |
| POST | /admin/orders/:orderId/verify | A | re-check with gateway |
| GET / POST / PUT / DELETE | /admin/products(/:id) | A | multipart: thumbnail, file |
| PUT | /admin/content/:key | A | `{data}` |


## Added in v2 (e-book + gated Explore)

| Method & path | Auth | Purpose |
|---|---|---|
| `GET /products/featured` | public | up to 6 featured cards for the landing page |
| `GET /products`, `GET /products/:slug` | login | Explore Products / Product Details |
| `GET /products/:slug/outline` | login | chapter + topic titles and counts only (no content) |
| `GET /reader/:slug` | buyer or admin | the e-book (quiz answers removed) + your progress |
| `PUT /reader/:slug/tasks/:blockId` `{done}` | buyer | tick / untick a task or activity |
| `POST /reader/:slug/quiz/:blockId` `{choice}` | buyer | server-checked answer -> `{correct, explanation?}` |
| `PUT /reader/:slug/position` `{topicId}` | buyer | remember where the reader stopped |
| `GET /admin/products/:id/ebook` | admin | full content for the builder |
| `PUT /admin/products/:id/ebook` `{chapters}` | admin | validated save (ids are kept stable so progress survives edits) |
