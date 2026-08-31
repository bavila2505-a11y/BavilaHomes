# Bavila Homes — website

20 static pages. No build step, no dependencies, no database. Push the folder and it's live.

---

## How the site is put together

Three shared files do all the common work. Change one and every page changes.

| File | What it controls |
|---|---|
| `styles.css` | The entire look — colour, type, spacing, every component |
| `site.js` | The menus, and the interactive pieces on a few pages |
| `tags.js` | Google Analytics and Meta Pixel IDs |

Each `.html` file now holds only that page's own content. There is no CSS inside
them any more, so you never have to make the same edit twenty times.

**Design — "Nightfall":** warm near-black ground, Italiana for headlines, Manrope
for text, bronze accent. Fonts come from Google Fonts; nothing else is fetched
from outside.

---

## Making changes

### Colour or type, anywhere on the site
Open `styles.css`. Everything is set at the top in one block:

```css
--night:#0C0C0B;   /* page background   */
--bone:#EAE6DE;    /* headings          */
--text:#ABA599;    /* body copy         */
--bronze:#BE9257;  /* the accent colour */
```

Change a value there and it updates across all 20 pages at once.

### Wording on a page
Open that page's `.html` and edit the text between the tags.

### The menu
The header and footer markup sit in each `.html` file. If you add or rename a
page, update it everywhere — search for `class="navitem"` to find the nav and
`class="fgrid"` to find the footer.

### Service towns
In `index.html`, `about.html` and `custom-homes.html`, inside the
`<ul class="towns">` blocks. Use real town names, one per `<li>` — these help you
show up in local searches.

### Analytics
`tags.js` holds the two IDs, both already filled in. Set either to `""` to switch
that tag off.

---

## What the site says, and what it deliberately doesn't

The copy positions custom homes as the centre of the company, with renovations,
exteriors and structural work still openly available to hire.

It describes framing and carpentry as **where the company came from** — a real
strength, and an unusual road into custom home building. It does **not** state
crew size, or which trades are self-performed versus subcontracted on a given
job. That stays flexible, and gets covered in the appointment with the homeowner.

Worth keeping that line when editing.

---

## Photos

The biggest thing this site is still missing. A few pages have image slots that
stay hidden until a real file exists, so nothing looks broken in the meantime —
but photography is most of the sale on custom home work.

Worth shooting: houses at frame stage, finished exteriors, kitchens and baths,
and any before/after pair taken from the identical angle.

Put files in a `photos/` folder next to the HTML, resized to about 1600px wide.

---

## Pages

```
index.html                    Home
custom-homes.html             Custom homes — the main service page
├── #new-construction         Build new
├── #teardown                 Teardown & rebuild
└── #whole-house              Whole-house rebuild
renovations.html              Renovations (hub)
├── kitchens.html
├── bathrooms.html
└── basements.html
exteriors.html                Exteriors (hub)
├── rot-trim.html             ← a good page to point ads at
├── siding.html
├── windows-doors.html
├── decks-porches.html
└── outdoor-living.html
framing.html                  Framing & structural (hub)
├── additions.html
├── structural-repair.html
└── dormers-garages.html
work.html                     Examples of past work, filterable
about.html                    About, service area, credentials
contact.html                  Estimate request form
thanks.html                   Where the form redirects after sending
```

The deep pages matter more than they look. Someone searching "siding repair
Ridgewood" lands on `siding.html`, not the homepage. Keep them.

---

## How the pages connect

- **Dropdown nav** — every hub opens to its sub-pages, from anywhere on the site
- **Full footer sitemap** — every page listed at the bottom of every page
- **Breadcrumbs** on inner pages, back up the chain
- **"Where this usually leads"** blocks link to the services that genuinely follow
  from each one (rot → structural repair, kitchen → structural, deck → rim joist)
- **CTA links carry the service with them** — `contact.html?service=kitchen`
  arrives with Kitchen already chosen in the form, so you know what someone was
  reading when they filled it in

---

## The interactive pieces

**Homepage — the scope ladder.** Repair / Restore / Rebuild / Build. Each adds a
layer to the house illustration and swaps the caption, and each caption links
through. It makes the range of the company legible in about three seconds.

**Rot & trim — the wall cutaway.** Drag the slider and the painted exterior peels
back to expose wet sheathing and rotted rafter tails. Keyboard-accessible, and it
doesn't fight scrolling on a phone.

Both live in `site.js` and exit quietly on pages that don't use them.

---

## Adding a job to the portfolio

In `work.html`, copy an existing `<div class="job">` block and edit it. The
`data-cat` attribute controls which filter shows it — `exteriors`, `framing`,
`renovations`, or several separated by spaces.

Write them the way the existing ones are written: what you found, what you did,
how long it took. The specifics sell — "the sheathing behind it was wet through
and two rafter tails were going" does more than any adjective.

---

## Hosting

The form posts through Netlify Forms (`data-netlify="true"` in `contact.html`),
so the site is set up for **netlify.com** — connect this repo and it redeploys on
every push. Submissions land in the Netlify dashboard and can be emailed on.

If you host anywhere else, the form needs a different handler.

Do not rename `index.html` — that's the page that loads at your domain root.
