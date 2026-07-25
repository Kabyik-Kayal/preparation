---
title: DBMS Normalization
description: A concise guide to database normal forms with worked examples.
tags:
  - dbms
  - normalization
  - revision
---

# DBMS Normalization

> A concise guide to the normal forms, why they matter, and how to reason about
> them in a viva or interview.

## Key concepts

- **Normalization** — organizing columns and tables to reduce redundancy and
  avoid update, insert, and delete anomalies.
- **Functional dependency** — `X → Y` means `X` uniquely determines `Y`.
- **Candidate key** — a minimal set of attributes that identifies a row.

## Important questions

1. What anomalies does normalization prevent?
2. State the requirement for 1NF, 2NF, 3NF, and BCNF.
3. When is denormalization justified?

## Short answers

| Normal form | Requirement |
|---|---|
| 1NF | Atomic values; no repeating groups |
| 2NF | 1NF **and** no partial dependency on part of a composite key |
| 3NF | 2NF **and** no transitive dependency on the key |
| BCNF | For every dependency `X → Y`, `X` is a superkey |

!!! tip "Revision mnemonic"
    *The key, the whole key, and nothing but the key* — 2NF removes partial
    dependencies, 3NF removes transitive ones.

## Examples

Consider `Enrollment(student_id, course_id, student_name, instructor)`.

- `student_id → student_name` is a **partial dependency** (violates 2NF) because
  the key is `(student_id, course_id)`.
- Split into `Student(student_id, student_name)` and
  `Enrollment(student_id, course_id, instructor)`.

## Revision checklist

- [ ] Identify candidate keys for a given relation
- [ ] Spot a partial vs transitive dependency
- [ ] Explain a trade-off where denormalization wins

## References

- [Database normalization — Wikipedia](https://en.wikipedia.org/wiki/Database_normalization)
