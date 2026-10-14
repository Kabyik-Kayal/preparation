# Prep Hub

[![Deploy site to GitHub Pages](https://github.com/Kabyik-Kayal/preparation/actions/workflows/deploy.yml/badge.svg)](https://github.com/Kabyik-Kayal/preparation/actions/workflows/deploy.yml)
[![MkDocs Material](https://img.shields.io/badge/docs-MkDocs%20Material-blue)](https://squidfunk.github.io/mkdocs-material/)
[![Python 3.12](https://img.shields.io/badge/python-3.12-blue)](https://www.python.org/)

A searchable knowledge and exam-preparation hub — viva questions, revision
notes, interview prep, and technical cheat sheets.

**Live site: [preparation.kabyik.dev](https://preparation.kabyik.dev)**

Drop a Markdown file into `docs/`, push to `main`, and it publishes as a
clean, searchable page — no per-page frontend work.

## What's inside

| Section | Content |
|---|---|
| `MAD2-Project/` | TrekStar viva prep, module notes, Vue Router coding task guide |
| `MLF/` | Linear algebra quiz prep (Quiz 1, Quiz 2) |
| `MLT/` | Machine learning techniques — PCA, clustering, EM, regression (Quiz 1, Quiz 2) |
| `NPTEL-Ethical-Hacking/` | Ethical hacking notes (PDF download) |

## Features

- Instant search across every page, heading, and paragraph
- Light / dark mode (follows system preference, toggle in header)
- Math rendering (MathJax) for equations
- PDF downloads served as attachments, not in-browser previews
- Offline-safe builds (Google Fonts + MathJax vendored via the `privacy` plugin)
- Strict builds in CI — broken links fail the deploy, never ship

## Quickstart

Requires Python 3.9+.

```bash
git clone https://github.com/Kabyik-Kayal/preparation.git
cd preparation

python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

mkdocs serve                     # live preview at http://127.0.0.1:8000
```

Before pushing, run the same strict build CI uses:

```bash
mkdocs build --strict
```

## Adding content

### A new note (Markdown page)

1. Create a Markdown file in `docs/` (or a subfolder).
2. Use a `kebab-case` filename — the filename becomes the URL.
3. Commit and push to `main`. GitHub Actions builds and deploys automatically.

| Markdown path | Published route |
|---|---|
| `docs/MLT/MLT_Quiz1.md` | `/MLT/MLT_Quiz1/` |
| `docs/MAD2-Project/preparation.md` | `/MAD2-Project/preparation/` |
| `docs/index.md` | `/` |

Link to other pages with **relative** `.md` links so `--strict` can validate
them:

```markdown
[MLT Quiz 1 prep module](MLT/MLT_Quiz1.md)
```

### A PDF download (not a rendered page)

MkDocs only lists `.md` files in the sidebar — a raw `.pdf` is invisible on
its own. The pattern is one folder = one `index.md` wrapper + one `.pdf`:

```bash
mkdir -p docs/my-topic
cp ~/notes/my-notes.pdf docs/my-topic/my-notes.pdf
```

`docs/my-topic/index.md`:

```markdown
# My Topic

> Short description of what this covers.

## Download

[📄 My notes (PDF)](my-notes.pdf){ download }
```

The `{ download }` attribute (via `attr_list`) forces a download instead of
opening the PDF in the browser. Use a relative link from the wrapper page so
`--strict` validates it (`my-notes.pdf` for same-folder, `../assets/...` from
elsewhere). Keep PDFs small (<10 MB) and filenames `kebab-case` with no spaces.

Add a card on the homepage (`docs/index.md`) so it matches the other sections:

```markdown
[:octicons-arrow-right-24: My notes (PDF, downloads)](my-topic/my-notes.pdf){ download }
```

Page template for notes:

```markdown
# Topic Title

> A short description of what this page helps the reader prepare for.

## Key concepts
## Important questions
## Short answers
## Examples
## Revision checklist
## References
```

## Project structure

```text
preparation/
├── .github/workflows/deploy.yml   # Build + deploy on push to main
├── docs/                          # All content lives here
│   ├── CNAME                      # Custom domain (copied into the build)
│   ├── index.md                   # Homepage → /
│   ├── MAD2-Project/              # Viva prep, module notes, Vue Router task
│   ├── MLF/                       # Quiz 1, Quiz 2
│   ├── MLT/                       # Quiz 1, Quiz 2
│   ├── NPTEL-Ethical-Hacking/     # index.md wrapper + downloadable PDF
│   ├── assets/images/             # Compressed images with alt text
│   ├── javascripts/mathjax.js     # MathJax config
│   └── stylesheets/extra.css      # Theme overrides
├── overrides/                     # Material theme customizations (main.html, partials)
├── mkdocs.yml                     # Site config, theme, extensions
├── requirements.txt               # Pinned dependencies
└── README.md
```

## Tech stack

- [MkDocs](https://www.mkdocs.org/) `1.6.1` — static site generator
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) `9.7.7` — theme, search, navigation
- [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/) `11.0.1` — admonitions, tabs, math, emoji, task lists
- [MathJax 3](https://www.mathjax.org/) via CDN (vendored at build time by the `privacy` plugin)

## Conventions

- Every page has exactly **one H1** title.
- Filenames use `kebab-case` and are a **stable public API** — avoid renaming
  published files (old URLs 404).
- Internal links are **relative** and point at the `.md` / asset file so
  `--strict` validates them.
- Images live under `docs/assets/images/`, are compressed, and have meaningful
  alt text.
- Code fences include a language identifier.

## Author

© Kabyik Kayal — [kabyik.dev](https://kabyik.dev) · [GitHub](https://github.com/Kabyik-Kayal)
