# Sinclair Anusiem — Portfolio

A responsive editorial portfolio for Sinclair Anusiem, positioning his experience across Shopify, customer success, technical support, and frontend development.

## Run locally

Open `index.html` in a browser, or run a local static server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Netlify

1. Sign in to Netlify.
2. Choose **Add new site → Deploy manually**.
3. Drag the contents of this folder (or the ZIP contents) into the deploy area.
4. Netlify will publish the static site. No build command is required; publish directory is `.`.

You can also connect this folder to a Git repository. The included `netlify.toml` sets the publish directory.

## Included

- Responsive editorial layout with a mobile navigation menu.
- Project filters, keyboard-accessible navigation, scroll-triggered reveal animations, refined hover motion, and reduced-motion support.
- Automatically updated current year in the hero stamp and footer (no annual code edits required).
- No city or country displayed in the public-facing hero.
- Optimized WebP project and portrait imagery.
- Latest Levis-template résumé at `assets/docs/Sinclair-Anusiem.pdf`.
- Basic SEO metadata, Person structured data, robots.txt, sitemap.xml, and security headers.

## Before announcing the site publicly

- Confirm the final Netlify site URL and update the canonical URL in `index.html`, `robots.txt`, and `sitemap.xml` if it changes.
- Check that the live demo links and GitHub repositories are still public and current.
- Confirm that the role dates, project descriptions, and contact details remain accurate.
- The contact link opens the visitor's email app (mailto); it does not submit to a backend form.

## Media note

The source archive contained a roughly 95 MB MP4. It was not included in this rebuild because it was not needed for the portfolio experience and would make the site unnecessarily heavy. Original image assets were converted to optimized WebP where appropriate.

## Appearance themes
The site includes a light/dark mode switch in the navigation. It follows the visitor's system appearance on first visit, remembers their choice in the browser, and can be switched at any time. The preference is stored locally and does not require an account.

## Theme behaviour
- Automatic theme is the default for first-time visitors and follows the visitor's own local browser time.
- Light mode runs from 6:00 AM through 5:59 PM; dark mode runs from 6:00 PM through 5:59 AM.
- The theme control cycles between Automatic, Light, and Dark. Manual choices are saved in local storage; selecting Automatic returns to the time-based schedule.
- The email links open a pre-addressed email draft in the visitor's configured default mail application. If no mail application or webmail handler is configured in the visitor's browser, the browser may not open a compose window.
