# Security checklist

## Already built in
Server-side price and payment verification, signed + re-verified webhooks, atomic idempotent fulfilment, double-charge guard, bcrypt passwords, httpOnly SameSite cookie, Helmet + CSP (only Cashfree, YouTube-nocookie and Vimeo may be framed), rate limits (API, login/register, checkout), validated `?next=` redirects, validated e-book links/videos (no `javascript:` URLs; text is rendered as text, never as HTML), buyer-only content API, admin role checks, production start-up guard (see README).

## You must do
- [ ] **Rotate secrets.** The zip you sent contained a `server/.env` with a development JWT secret. Treat it as exposed: generate a new `JWT_SECRET`. If you ever pasted real Cashfree keys into a file that was zipped or emailed, regenerate them in the Cashfree dashboard.
- [ ] Set a **strong, unique admin password** (`ADMIN_PASSWORD`) before running `npm run seed`, then log in and keep it in a password manager.
- [ ] Keep secrets only in the host's environment settings. Never in Git, chat, screenshots or zips.
- [ ] Atlas: least-privilege DB user, strong password, network access restricted where possible, **backups on** (Flex/M10), alerts on.
- [ ] Turn on 2FA for GitHub, Render, Atlas, Cashfree and your domain registrar.
- [ ] Configure SMTP so password-reset and order emails really send.
- [ ] Edit the policy pages (`client/src/pages/Legal.jsx`) with real contact details and have the terms/refund wording reviewed.
- [ ] Run `npm audit` in `server/` and `client/` now and then; update dependencies.
- [ ] After go-live make a small real purchase + refund to confirm the whole chain.

## Known limits (honest list)
- E-book text is protected by login + purchase, but anyone who buys can still copy/screenshot it; no web page can prevent that.
- Video links to YouTube/Vimeo are only as private as those links; use *unlisted* videos at minimum, or a paid private video host for premium content.
- Sessions are 7-day cookies; changing a password does not log out other devices yet.
- Free-tier hosting is not suitable for production (see HOSTING.md).
