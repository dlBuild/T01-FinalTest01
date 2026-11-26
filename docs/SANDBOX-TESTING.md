# Cashfree sandbox test plan (do all of these before going live)

Set in `server/.env`: `PAYMENT_MODE=cashfree`, `CASHFREE_ENV=sandbox`, your **sandbox** App ID / Secret Key. Webhooks need a public https URL (e.g. `ngrok http 5000`, put it in `SERVER_PUBLIC_URL`, and add `<url>/api/payments/webhook` in the Cashfree sandbox dashboard). Use Cashfree's published sandbox test cards / UPI IDs.

| # | Test | Expected |
|---|---|---|
| 1 | Logged out -> click Explore -> register | Lands on Explore automatically |
| 2 | Buy Now -> pay successfully | Status page shows PAID; product appears in My Learning; **Open my e-book** works |
| 3 | Pay, then close the tab before returning | After the webhook (or opening the order later) access is granted anyway |
| 4 | Failed payment, then Retry | Order FAILED; retry creates a new order; no access until paid |
| 5 | Abandon checkout, click Buy Now again | Old attempt cancelled, new order created |
| 6 | Paid on an older attempt, then Buy Now again | "Your earlier payment went through" - **no second charge** |
| 7 | Refresh / reopen the status page several times | One Access record, `salesCount` +1 only |
| 8 | Send the webhook without / with a wrong signature (`curl`) | `401` |
| 9 | Edit the price in the browser's network tab | Ignored - server price is used |
| 10 | Open `/learn/<slug>` of a product you did not buy | 403, no content |
| 11 | Admin -> Orders -> *Verify* on a stuck order | Re-checks with Cashfree and fixes status |
| 12 | Free product | Unlocks instantly, no gateway |

Only after all rows pass: follow step 7 of `HOSTING.md`.
