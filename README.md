# Samandari - Personal Portfolio

Static multi-page portfolio (GitHub-style layout) for **Jules Cesar Junior Ndayisenga**: overview, projects, resume, services, contact, and case-study / detail pages. **English and French** copy lives in `assets/js/i18n.js` and is applied site-wide.

## Features

- **Responsive layout** - Bootstrap 5 grid; projects page hides the profile sidebar on small viewports.
- **i18n** - Language toggle (`EN` / `FR`) with shared translation keys.
- **Overview** - README-style hero, Typed.js role line, CTAs, testimonials (Swiper), GitHub activity block (`assets/js/impact.js`).
- **Projects** - Search, type / language / sort filters (vanilla JS in `assets/js/main.js`), GLightbox for some detail previews.
- **Services** - Skills sidebar and service cards.
- **Contact** - Formspree form; on narrow screens the form stacks above address and map.
- **Preloader** - Shown on first visit per tab; later navigations in the same tab can skip it via `sessionStorage` (see `main.js`).

## Tech stack

| Area | Notes |
|------|--------|
| HTML / CSS / JS | No build step; open files in a browser or any static host. |
| [Bootstrap 5](https://getbootstrap.com/) | Layout, utilities, components. |
| [AOS](https://michalsnik.github.io/aos/) | Scroll animations (`main.js` initializes after DOM ready). |
| [Typed.js](https://github.com/mattboldt/typed.js) | Hero typing on overview. |
| [Swiper](https://swiperjs.com/) | Testimonials carousel. |
| [GLightbox](https://biati-digital.github.io/glightbox/) | Modal / external project views. |
| [Isotope](https://isotope.metafizzy.co/) | Only on select **portfolio** case-study / architecture pages, not the main `projects.html` grid. |

Optional third-party scripts may appear on individual pages (e.g. analytics or widgets).

## Run locally

```bash
# macOS
open index.html
```

Or serve the repo root with any static server (`npx serve .`, `python -m http.server`, etc.) if you prefer correct `file://`-sensitive behavior.

## Customize

- **Copy / translations** - `assets/js/i18n.js` (keys and `data-i18n` attributes in HTML).
- **Projects list & filters** - `projects.html` markup; metadata and filter logic in `assets/js/main.js` (`getProjectMetaConfig`, `setupRepoFilters`).
- **GitHub impact block** - `assets/js/impact.js` and related markup on `index.html`.
- **Styles** - `assets/css/style.css`, `assets/css/featured.css`.
- **Footer year** - Set in `main.js` from the current year; `.it_experience` elements get `currentYear - 2022`.

## Credits

UI evolved from an earlier resume-style base; current structure and GitHub-like chrome are custom to this repo.
