# Bavila Homes — website

16 static pages. No build step, no dependencies, no database. Upload the folder and it works.

---

## Before you launch — 5 things to swap

Do a find-and-replace across all `.html` files.

| Find | Replace with | Appears |
|---|---|---|
| `(555) 123-4567` | your phone number | every page |
| `+15551234567` | your number, digits only, e.g. `+12015550123` | every page |
| `13VH00000000` | your NJ HIC registration number | every page |
| `YOUR_FORM_ID` | your Formspree form ID | contact.html |
| `Replace with photo` | real before/after images | index, work |

On Mac: open the folder in a text editor like VS Code or Sublime, use Find in Folder, replace all.

### The form
Create a free account at formspree.io, make a form, copy the ID from the endpoint they give you, paste it in place of `YOUR_FORM_ID` in `contact.html`. Submissions land in your email. Free tier covers 50/month.

### Service towns
Listed in two places — `index.html` and `about.html`, in the `<ul class="towns">` blocks. Edit to match where you actually work. These help you show up in local searches, so use real town names, one per `<li>`.

---

## Hosting

**Easiest:** cloudflare.com/pages or netlify.com — drag the whole folder onto the deploy box. Free, HTTPS included, live in about a minute. Then point your domain at it.

**If you already have hosting:** upload the folder contents to your `public_html` or web root over FTP.

Do not rename `index.html` — that's the page that loads at your domain root.

---

## Page structure

```
index.html                 Home — the whole company
├── exteriors.html         Exterior carpentry (hub)
│   ├── rot-trim.html      Rot & Trim Repair      ← point your ads here
│   ├── siding.html        Siding
│   └── decks-porches.html Decks & Porches
├── framing.html           Framing & Structural (hub)
│   ├── additions.html     Additions
│   ├── structural-repair.html
│   └── dormers-garages.html
├── renovations.html       Renovations (hub)
│   ├── kitchens.html      Kitchens
│   ├── bathrooms.html     Bathrooms
│   └── basements.html     Basements & Interiors
├── work.html              Portfolio, filterable
├── about.html             About + service area + credentials
└── contact.html           Estimate request form

site.css                   All styling — one file
site.js                    All interactivity — one file
```

---

## How the pages connect

- **Dropdown nav** — every hub page opens to its three sub-pages, from anywhere on the site
- **Breadcrumbs** on every inner page, back up the chain
- **"Where this usually leads"** at the bottom of each service page, linking to the services that genuinely follow from it (rot → structural repair, kitchen → structural, deck → rim joist work). These are real relationships in the work, not filler links.
- **Portfolio entries** link through to the service page behind each job
- **CTA links carry the service with them.** `contact.html?service=kitchen` arrives with Kitchen already selected in the form dropdown. Every page's call-to-action does this, so you find out what someone was reading when they filled the form in.

---

## The two interactive pieces

**Home page — the scope ladder.** Four buttons: Repair / Restore / Rebuild / Build. Each adds a layer to the house illustration and swaps the caption, and each caption links to the relevant service. It makes the range of the company legible in about three seconds, and doubles as navigation.

**Rot & trim page — the wall cutaway.** Drag the slider and the painted exterior peels back to expose wet sheathing, rotted rafter tails and sill plate. It's the argument for hiring a framer instead of a trim installer, made visual. Keyboard-accessible, and it doesn't fight scrolling on a phone.

---

## Adding a job to the portfolio

In `work.html`, copy an existing `<div class="job">` block and edit it. The `data-cat` attribute controls which filter shows it — use `exteriors`, `framing`, `renovations`, or several separated by spaces.

Write the entries the way the existing ones are written: what you found, what you did about it, how long it took. The specifics are what sell — "the sheathing behind it was wet through and two rafter tails were going" does more work than any adjective.

---

## Photos

Every job, three shots, same positions every time:

1. Wide **before**, from the street or a fixed spot
2. Close-up of **the damage you cut out**
3. Wide **after**, from the identical angle as #1

The middle shot is the valuable one. It's the only real proof the work was done properly, and it's what makes the portfolio credible rather than decorative.

Replace the `<div class="job-img">...</div>` blocks with `<img src="photos/yourfile.jpg" alt="description">`. Put images in a `photos/` folder next to the HTML. Resize to about 1200px wide before uploading so pages stay fast.

---

## Regenerating

The site was generated from a small Python build script. If you have it, edit `pages.py` / `pages2.py` and run `python3 build.py` to rebuild — but note that overwrites anything you edited in `build/` directly. Once you start editing the HTML by hand, ignore the script and just edit the HTML.
