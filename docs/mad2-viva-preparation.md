---
title: MAD 2 Viva Preparation
description: High-yield questions and concise answers for the MAD 2 viva.
tags:
  - mad2
  - viva
  - revision
---

# MAD 2 Viva Preparation

> High-yield questions and concise answers to prepare for the Modern Application
> Development 2 viva.

## Key concepts

- **VueJS** — a progressive front-end framework for building reactive UIs.
- **Flask + REST API** — the backend serves JSON over HTTP; the front end
  consumes it.
- **JWT authentication** — stateless tokens carry identity between requests.
- **Redis + Celery** — caching and asynchronous/scheduled background jobs.

## Important questions

1. What is the difference between server-side rendering and a single-page
   application?
2. How does Vue's reactivity system track dependencies?
3. Why use a token-based auth scheme instead of server-side sessions?
4. What problem do Celery workers solve that a plain request/response cannot?
5. How does Redis improve API latency?

## Short answers

!!! note "SPA vs SSR"
    An **SPA** ships one HTML shell and renders views in the browser via
    JavaScript, fetching data through APIs. **SSR** renders full HTML on the
    server per request. SPAs feel snappier after load; SSR is faster on first
    paint and friendlier to crawlers.

!!! note "Vue reactivity"
    Vue wraps reactive state in proxies. When a component renders, it records
    which properties it reads; when one of those changes, only the dependent
    components re-render.

## Examples

A minimal Flask route returning JSON:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.get("/api/tasks")
def list_tasks():
    return jsonify([{"id": 1, "title": "Revise MAD 2"}])
```

A Celery task for a scheduled daily report:

```python
from celery import Celery

celery = Celery("tasks", broker="redis://localhost:6379/0")

@celery.task
def send_daily_report(user_id: int) -> None:
    ...  # build and email the report
```

## Revision checklist

- [ ] Explain the request lifecycle from Vue click to Flask response
- [ ] Compare cookies vs JWT for auth
- [ ] Describe when a job belongs in Celery vs the request cycle
- [ ] Name three things Redis is used for in the app

## References

- [Vue.js documentation](https://vuejs.org/)
- [Flask documentation](https://flask.palletsprojects.com/)
- [Celery documentation](https://docs.celeryq.dev/)
