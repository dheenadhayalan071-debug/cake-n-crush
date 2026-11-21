# Owner approval & launch sign-off

Everything a business owner needs to review, in plain language. Two sections: what the site
*says*, and what it *does*.

---

## A. Content that needs written sign-off

| # | Item | Current state | Approve / change |
| - | ---- | ------------- | ---------------- |
| 1 | **All menu prices** (18 cakes, 33 variants) | Transcribed from the brief, labelled "provisional pending owner approval" in five places | ☐ Approved  ☐ Changes: ____________ |
| 2 | **WhatsApp number** `8838159344` | Used for calls *and* WhatsApp, marked provisional | ☐ Approved  ☐ Correct number: ____________ |
| 3 | **Address** | Shown exactly as supplied (no pincode) | ☐ Approved  ☐ Pincode: ____________ |
| 4 | **Logo** | Provisional typographic lockup, not the official mark | ☐ Supply logo file  ☐ Keep typographic version |
| 5 | **Photography** | AI-generated editorial styling, labelled "illustrative" throughout | ☐ Supply real photos  ☐ Launch with labelled placeholders |
| 6 | **Product descriptions** | None claimed — no ingredients or flavour notes | ☐ Supply copy  ☐ Launch as-is ("ask on WhatsApp") |
| 7 | **Bestsellers** | None marked | ☐ Confirm list: ____________ |
| 8 | **Opening hours** | Not displayed ("please call before visiting") | ☐ Supply hours  ☐ Leave off |
| 9 | **Swiggy listing URL** | Pending — no link shown | ☐ URL: ____________ |
| 10 | **Zomato listing URL** | Pending — no link shown | ☐ URL: ____________ |
| 11 | **Instagram / Facebook** | Pending — no link shown | ☐ Handles: ____________ |
| 12 | **Pastries & brownies** | Category exists, marked "menu pending", no prices invented | ☐ Supply menu  ☐ Keep pending |
| 13 | **Customer reviews** | None published; homepage states this openly | ☐ Supply verified reviews |
| 14 | **Domain & canonical URL** | Placeholder `cakencrush.example.com` | ☐ Domain purchased: ____________ |
| 15 | **Allergen statement** | Generic "our kitchen handles wheat, dairy, eggs and nuts" safety notice | ☐ Approved  ☐ Replace with official wording |

> The site is built so items 7–13 can be switched on later without a redesign: each has a
> data field or a documented component slot.

---

## B. Features & interactions requiring approval

| Feature | What it does | Needs approval on |
| ------- | ------------ | ----------------- |
| **Variant pricing** | Each card shows weight + eggless/regular + the exact price; the WhatsApp message repeats the selected variant and price | Correct price ↔ variant mapping |
| **WhatsApp enquiries** | Opens `wa.me` with a pre-written message; nothing is sent until the customer presses send | That the bakery accepts enquiries on WhatsApp |
| **Click-to-call** | `tel:+918838159344` on header, footer, mobile bar, product dialog, contact | Phone number is a mobile that accepts calls |
| **Custom Cake Studio** | Validated form → formatted WhatsApp message incl. name, phone, flavour, weight, dietary, theme, message-on-cake, date, instructions | The fields match how the bakery quotes jobs (e.g., is 500 g enough? do they need a lead-time warning?) |
| **Reference image** | The page stores/validates a local file choice but **cannot attach it** — it tells the customer to attach in chat | That this workflow is acceptable (alternatives: email, Instagram DM) |
| **Menu filters** | Category, eggless/regular, weight, live search, shareable URLs | Category names match how customers ask |
| **"Menu pending" categories** | Pastries and brownies show an enquiry prompt instead of an empty grid | Whether they want pastries/brownies listed at launch |
| **Gallery** | Filterable, keyboard-navigable lightbox of illustrative imagery | Real photos before launch |
| **Google Maps embed** | Address-based search embed + directions link | Address resolves correctly on Google Maps |
| **Mobile sticky bar** | Call / WhatsApp / Custom Cake on every mobile page except the form | Placement and labels |

---

## C. Explicitly *not* built (by design)

- No shopping cart, checkout, payment gateway or order confirmation.
- No user accounts, login or saved addresses.
- No database, admin dashboard or CMS.
- No automated order confirmation — every channel ends in a human conversation.
- No review collection system, no rating plugin, no fake social proof.
- No analytics or tracking pixels (can be added later with the owner's consent).

---

## D. Sign-off block

| | |
| - | - |
| Business owner | ______________________________ |
| Date | ______________________________ |
| Prices approved | ☐ Yes  ☐ No |
| Contact details approved | ☐ Yes  ☐ No |
| Placement of "provisional" notices accepted | ☐ Yes  ☐ No |
| Ready to launch on the purchased domain | ☐ Yes  ☐ No |

Launch day instructions and the pre-launch checklist are in
[`DEPLOYMENT.md`](DEPLOYMENT.md#pre-launch-checklist).
