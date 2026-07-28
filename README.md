# Prep Hub

A documentation-style knowledge base for exam and interview preparation, built
with [MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), deployed to
GitHub Pages at **[preparation.kabyik.dev](https://preparation.kabyik.dev)**.

Drop a Markdown file into `docs/`, push to `main`, and it publishes as a clean,
searchable page — no per-page frontend work.

```bash
cp ~/notes/mad2-viva-preparation.md docs/
git add docs/
git commit -m "Add MAD 2 viva preparation"
git push
# → https://preparation.kabyik.dev/mad2-viva-preparation/
```

## Local development

Requires Python 3.9+.

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

mkdocs serve                     # live preview at http://127.0.0.1:8000
```

Before pushing, run the same strict build CI uses to catch broken links and
config errors early:

```bash
mkdocs build --strict
```

## Publishing a note

1. Create a Markdown file in `docs/` (or a subfolder).
2. Give it a `kebab-case` filename — the filename becomes the URL.
3. Commit and push to `main`. GitHub Actions builds and deploys automatically.

| Markdown path | Published route |
|---|---|
| `docs/dbms-normalization.md` | `/dbms-normalization/` |
| `docs/mad2/viva-questions.md` | `/mad2/viva-questions/` |
| `docs/index.md` | `/` |

## Content conventions

- Every page has exactly **one H1** title.
- Filenames use `kebab-case` and are treated as a **stable public API** — avoid
  renaming published files (old URLs 404).
- Internal links are **relative** and point at the `.md` file (e.g.
  `[text](../mad2-viva-preparation.md)`) so `--strict` can validate them.
- Images live under `docs/assets/images/`, are compressed, and have meaningful
  alt text.
- Code fences include a language identifier.

### Page template

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

## Repository layout

```text
preparation/
├── .github/workflows/deploy.yml   # Build + deploy on push to main
├── docs/                          # All content lives here
│   ├── CNAME                      # Custom domain (copied into the build)
│   ├── index.md                   # Homepage → /
│   ├── mad2-viva-preparation.md
│   ├── dbms-normalization.md
│   ├── mad2/
│   │   ├── index.md
│   │   └── viva-questions.md
│   └── assets/images/
├── .gitignore
├── mkdocs.yml                     # Site config, theme, extensions
├── requirements.txt               # Pinned dependencies
└── README.md
```

## Deployment & DNS

Deployment is handled by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main` (and via manual **workflow dispatch**). The workflow
runs `mkdocs build --strict`, then publishes `site/` as a Pages artifact. A
failed build does **not** replace the last known-good deployment.

One-time setup on GitHub:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain:** `preparation.kabyik.dev`.
3. Cloudflare DNS record:

   ```text
   Type:   CNAME
   Name:   preparation
   Target: kabyik-kayal.github.io
   Proxy:  DNS only (until GitHub verifies the domain; enable proxy after)
   ```

The custom domain is retained by `docs/CNAME`, which `mkdocs build` copies into
the published site root — keeping it inside `docs/` (rather than the repo root)
ensures it survives the Actions artifact deploy.
