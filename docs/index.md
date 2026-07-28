---
title: Prep Hub
description: A searchable knowledge and exam-preparation hub.
---

# Prep Hub

> A searchable, always-current knowledge base for viva questions, revision notes,
> interview prep, and technical cheat sheets.

Adding a page here is as simple as dropping a Markdown file into `docs/` and
pushing to `main`. The site rebuilds and redeploys automatically, and the
current content already lives under the subject folders below.

## Browse by subject

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } __MAD 2 Project__

    ---

    TrekStar viva prep, module notes, and the Vue Router coding task guide.

    [:octicons-arrow-right-24: Viva preparation guide](MAD2-Project/preparation.md)

    [:octicons-arrow-right-24: Viva module notes](MAD2-Project/Viva-Preparation-Module.md)

    [:octicons-arrow-right-24: Vue Router coding task](MAD2-Project/Viva-Coding-Task-VueRouter-Users.md)

-   :material-function-variant:{ .lg .middle } __MLF__

    ---

    Linear algebra quiz preparation built from the past papers.

    [:octicons-arrow-right-24: MLF Quiz 1 prep module](MLF/MLF_Quiz1.md)

-   :material-function-variant:{ .lg .middle } __MLT__

    ---

    Machine learning techniques — PCA, clustering, EM, and regression prep.

    [:octicons-arrow-right-24: MLT Quiz 1 prep module](MLT/MLT_Quiz1.md)

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
