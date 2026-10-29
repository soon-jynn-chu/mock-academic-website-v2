# Personal Website

React 19 + Vite single-page site with hash routing, so it works on GitHub Pages
(user site or project site) with no extra server configuration.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy to GitHub Pages

1. `npm run build`
2. Publish the contents of `dist/` (for example to a `gh-pages` branch, or copy
   them into the branch/folder GitHub Pages serves).

`vite.config.js` uses `base: './'` and the app uses `HashRouter` (URLs look like
`/#/publication`), so the same build works at `username.github.io` and at
`username.github.io/repo-name/`.

## Edit the content

All content lives in `src/data/*.json` and `public/assets/` (`about.txt`, `cv.pdf`).

| File | Controls |
| --- | --- |
| `username.json` | Name shown in the nav/footer; `abbrv` is bolded in author lists |
| `site.json` | Hero tagline, typing words, contact email, location, Formspree ID |
| `socialMediaURL.json` | Social links (entries that aren't real `http(s)` URLs are hidden) |
| `projects.json` | Project cards (`title`, `image`, `year`, `tags`, `summary`, `content`, `link`) |
| `references.json` | Publications (CSL-JSON). An optional `abstract` field adds an expandable abstract |
| `awards`, `certifications`, `competitions`, `certificates` | Achievements timeline |
| `teachings`, `advisees` | Mentorship page |
| `leaderships`, `academicServices`, `invitedTalks`, `memberships`, `communityEngagements` | Activity page |

### Contact form

Create a free form at [formspree.io](https://formspree.io), then put its ID in
`src/data/site.json` as `formspreeId`. Until you do, the form opens the visitor's
mail app addressed to `email` instead.

### Theme

Colors and fonts are CSS variables at the top of `src/styles/theme.css`
(`[data-theme="dark"]` and `[data-theme="light"]`).
