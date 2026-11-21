# Missing information & pending approvals

This site was built from a written brief. **No logo file, menu screenshot or photograph was
supplied with it.** Rather than invent any of it, every gap is either handled with an honest
in-product placeholder or left out of the interface entirely.

Status legend: 🔴 blocks launch · 🟠 should be resolved before launch · 🟢 optional polish

| # | Item | Status | What the site does today | Where to fix |
| - | ---- | ------ | ------------------------ | ------------ |
| 1 | **Brand logo** | 🔴 | Header uses a provisional typographic lockup ("Cake N Crush / Patisserie · Madurai") with a custom SVG cake mark. It keeps the name but is not the official logo. | `src/components/ui/Logo.jsx` + `public/assets/logo/` |
| 2 | **Product photography** | 🔴 | All imagery is AI-generated editorial styling, labelled "Illustrative image — not an actual product photo" in the UI and in every alt text. No image claims to be a specific cake the bakery has made. | `assets-src/` → `npm run images` → `src/data/imagery.js` |
| 3 | **Menu prices** | 🔴 | 18 cakes / 33 variants transcribed exactly from the brief. Marked provisional in the header notice, a menu-page callout, every product dialog footer, the footer and the docs. | `src/data/products.js` |
| 4 | **WhatsApp number** | 🔴 | `8838159344` used for both calls and WhatsApp, flagged provisional in the brief. Not test-sent (no access to a device). | `src/data/business.js` |
| 5 | **Production domain** | 🔴 | No domain purchased. Canonical/OG/sitemap use the documented placeholder `https://cakencrush.example.com` until `VITE_SITE_URL` is set. | Vercel env `VITE_SITE_URL` |
| 6 | **Ingredient descriptions / allergens** | 🟠 | No ingredients, flavour notes or allergen lists are claimed anywhere. Product dialog says details haven't been published and to ask on WhatsApp. A general "our kitchen handles wheat, dairy, eggs and nuts — tell us about allergies" notice is shown, which is a safety statement, not a claim. | `products.js` → `description` |
| 7 | **Bestseller flags** | 🟠 | No product is marked bestseller. Homepage copy explicitly says the selection is editorial, not a sales ranking. | `products.js` → `bestseller: true` after written confirmation |
| 8 | **Opening hours** | 🟠 | Not displayed as a value. Contact and visit blocks say hours are not yet published and to call before visiting. | `business.js` → `openingHours` |
| 9 | **Swiggy / Zomato URLs** | 🟠 | Both fields are `null`; the UI shows a "links pending" note. No guessed listing URLs, no dead links. | `business.js` → `swiggyUrl`, `zomatoUrl` |
| 10 | **Instagram / Facebook** | 🟢 | Not supplied; the contact page shows a "handles not supplied" note. | `business.js` → `instagramUrl`, `facebookUrl` |
| 11 | **Postal pincode** | 🟢 | The supplied address has no pincode, so none is shown or embedded in structured data. | `business.js` → `ADDRESS.postalCode` |
| 12 | **Pastries & brownies catalogue** | 🟠 | Both categories exist with an honest "menu pending" empty state and a WhatsApp CTA. No products or prices invented. | `products.js` |
| 13 | **Customer reviews** | 🟠 | `src/data/testimonials.js` is intentionally empty, so the homepage renders "No reviews published yet" instead of fake quotes. No `aggregateRating` in structured data. | `testimonials.js` |
| 14 | **Google Business Profile URL** | 🟢 | Directions use a Maps *search* URL built from the real address — not a claimed listing. | `business.js` → `googleBusinessUrl` |
| 15 | **Delivery / collection policy, lead times** | 🟢 | Not stated as fact. The custom-cake form says the bakery will confirm feasibility and date. | Copy in `CustomCakesPage.jsx` |
| 16 | **Legal entity name / GST / FSSAI** | 🟢 | Not displayed. If the business must show FSSAI licence details, add them to the footer. | `Footer.jsx` |

## Data interdependencies

- Changing the phone number: update `business.js` only. `tel:`, `wa.me`, structured data and
  the tests all derive from it (a test asserts the exact E.164 value).
- Changing a price: update the variant in `products.js` **and** the matching expectation in
  `src/lib/__tests__/catalogue.test.js` (that test exists to make price drift deliberate).
- Swapping a placeholder image: after `npm run images`, remove `placeholder: true` from the
  entry in `imagery.js` and the "illustrative" captions disappear automatically.
