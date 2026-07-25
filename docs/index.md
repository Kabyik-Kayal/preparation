---
title: Kabyik Preparation Hub
description: A searchable knowledge and exam-preparation hub.
---

# Kabyik Preparation Hub

> A searchable, always-current knowledge base for viva questions, revision notes,
> interview prep, and technical cheat sheets.

Adding a page here is as simple as dropping a Markdown file into `docs/` and
pushing to `main`. The site rebuilds and redeploys automatically.

## Browse by subject

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } __MAD 2__

    ---

    Viva preparation and high-yield questions for Modern Application
    Development 2.

    [:octicons-arrow-right-24: MAD 2 viva prep](mad2-viva-preparation.md)

-   :material-database:{ .lg .middle } __DBMS__

    ---

    Normalization, transactions, and query fundamentals.

    [:octicons-arrow-right-24: DBMS normalization](dbms-normalization.md)

</div>

## How to use this site

- **Search** — press ++slash++ (or click the search icon) to full-text search
  every page, heading, and paragraph.
- **Dark mode** — toggle light/dark from the header.
- **Navigation** — browse the left sidebar; the table of contents on the right
  tracks your position within long pages.

!!! tip "Publishing a new note"
    ```bash
    cp ~/notes/some-topic.md docs/
    git add docs/ && git commit -m "Add some-topic" && git push
    ```
    Result: `https://preparation.kabyik.dev/some-topic/`
