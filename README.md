# Srivani English Medium School — Demo Website

A complete, mobile-first static website demo built to show prospective
school clients what a modern, professional school website can look like.

**Everything is fictional.** The school name, principal, phone number,
email, achievements, statistics, teachers and testimonials are all
sample content for demonstration purposes only.

---

## 1. What this project is

A single-page static site (HTML + CSS + vanilla JavaScript, no
frameworks, no backend, no database) covering:

Home · About · Vision & Mission · Principal's Message · Academics ·
Teaching Approach · Facilities · Why Choose Us · Achievements ·
Gallery (with lightbox) · Faculty · Testimonials · Admissions ·
Enquiry Form · Contact · Google Maps link · Footer.

All images are locally stored, hand-built SVG illustrations in
`assets/images/` — nothing depends on external photo URLs that could
break later.

## 2. How to run it locally

You need a simple local web server (opening `index.html` directly
works for a quick look, but a server avoids browser file-access
restrictions). In VS Code:

1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.

Or from a terminal, from the project folder:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000
```

```bash
# Node.js (if you have it)
npx serve .
```

## 3. How to change the school name

Open `js/config.js` and edit:

```js
schoolName: "Srivani English Medium School",
shortName: "Srivani",
tagline: "Shaping Young Minds for a Brighter Tomorrow",
```

Then update the visible text in `index.html` (the `<title>`, header
brand text, hero heading, and footer) to match — these are written
directly in the HTML for SEO reasons, so a full rebrand means a
find-and-replace of "Srivani" and "Srivani English Medium School"
across `index.html`.

## 4. How to change the logo

Replace `assets/images/logo.svg` with your own logo file (SVG, PNG or
JPG all work — just update the `src` in the header and footer of
`index.html` if the filename changes). Recommended: a square logo,
at least 200×200px if using a raster format.

Also replace `assets/images/favicon.svg` for the browser tab icon.

## 5. How to change images

All section images live in `assets/images/`. Each `<img>` tag in
`index.html` points to a specific file — swap the file (keeping the
same filename) or update the `src` attribute to point to a new one.
For a real client site, replace these illustrations with real,
licensed photography of the actual school.

## 6. How to change contact information

Open `js/config.js` and edit the top-level fields:

```js
address: "...",
phone: "...",
email: "...",
mapsQuery: "...",       // used to build the Google Maps link
whatsappNumber: "...",  // digits only, with country code, no + or spaces
whatsappMessage: "...", // pre-filled WhatsApp message
```

`script.js` automatically fills these into the Contact section,
footer and WhatsApp buttons — you don't need to touch the HTML.

## 7. How to connect the Google Admission Form

1. Create your Google Form.
2. Click **Send** → copy the form's shareable link.
3. In `js/config.js`, set:

```js
admissionFormUrl: "https://forms.gle/your-real-form-link",
```

The **"Click Here to Fill Admission Form"** button will now open it
in a new tab. Until you set a real URL, clicking the button shows a
friendly reminder instead of a broken link.

## 8. How to connect the enquiry form

The enquiry form (`#enquiryForm`) is a plain HTML form with client-side
validation. To make it actually deliver messages, use a static-form
service such as [Formspree](https://formspree.io):

1. Create a free Formspree account and a new form.
2. Copy the endpoint URL (looks like `https://formspree.io/f/xxxxabcd`).
3. In `js/config.js`, set:

```js
enquiryFormEndpoint: "https://formspree.io/f/xxxxabcd",
```

The form will then `POST` submissions there. Google Forms can also be
used by embedding a Google Form iframe or swapping the form's `action`
— see Formspree's or Google's own documentation for exact steps, as
markup differs slightly between services.

## 9. How to deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose the branch (e.g. `main`) and root folder.
4. Save — GitHub gives you a live URL within a minute or two.

## 10. How to deploy to Cloudflare Pages

1. Push this project to a GitHub (or GitLab) repository.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages**.
3. Connect your repository.
4. Build settings: **Framework preset: None**, **Build command: (leave empty)**,
   **Build output directory: /** (project root).
5. Deploy.

## 11. How to connect a custom domain

**GitHub Pages:** Settings → Pages → Custom domain → enter your domain,
then add the DNS records GitHub shows you (a `CNAME` record pointing
to `yourusername.github.io`, or `A` records for an apex domain).

**Cloudflare Pages:** Your Pages project → Custom domains → Set up a
domain → follow the on-screen DNS instructions (this is especially
smooth if your domain's DNS is already managed by Cloudflare).

---

## Notes on the demo content

- All statistics, achievements, staff names, testimonials and the
  principal's message are fictional sample content, clearly for
  demonstration only.
- The WhatsApp button uses a developer/demo contact number for
  enquiries about *this website*, kept separate from the school's own
  (fictional) office phone number.
- No unverifiable claims ("best school", "No. 1", "100% results") are
  used anywhere in the copy.

Demo website concept created for presentation purposes.
