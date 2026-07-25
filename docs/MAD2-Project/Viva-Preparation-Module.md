# TrekStar Viva Preparation Module

Prepared from the past viva question sheet in this folder, with every answer tied back to my own code in this project (TrekStar, the Trekking Management Application V2).

How to use this: the questions are grouped by topic. For each one I have written the answer the way I would actually say it in the viva, and after each answer I point to the exact file and line numbers so I can open it and show the examiner. Where my project does not have code for a question (pure theory like a rainbow table), I say "No direct code" and point to the closest related place instead of faking a reference. Where my project has a gap, I have said so honestly rather than pretending.

Line numbers are as of when I wrote this. If I edit a file the numbers shift by a little, so I treat them as "jump to roughly here" and read the surrounding function.

## Quick project summary (say this first)

TrekStar is a multi-user trekking management app. There are three roles: admin, staff (trek guides), and trekker (customer). The admin creates treks, approves them, assigns a staff guide, manages users and staff, and pulls monthly PDF reports. The assigned staff moves a trek through its lifecycle (Approved to Open to Closed to Completed) and sees participants. The trekker browses open treks, books slots after confirming payment, cancels, and exports their booking history as CSV.

The backend is a Flask REST API. The frontend is a separate Vue 3 single page app that talks to the API with axios. Auth is JWT based with a role claim. Redis is used in three ways: as the Flask-Caching backend, as the Celery broker and result backend, and as a small store for password reset OTPs. Celery runs the background jobs (report PDF generation, CSV export, emails) and Celery Beat runs the scheduled jobs (daily trek reminders, monthly admin report, cleanup). The database is SQLite through SQLAlchemy.

Tech stack in one line: Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-Caching, Flask-Mail, Celery, Redis, xhtml2pdf on the backend; Vue 3 with vue-router, Pinia and axios built with Vite on the frontend.

Folder layout: `backend/` has `app.py` (app factory), `config.py`, `extensions.py`, `models.py`, `tasks.py`, `celery_worker.py`, `seed.py`, and `api/` with one blueprint file per role (`auth.py`, `admin.py`, `staffs.py`, `users.py`). `frontend/src/` has `views/` split into `admin/`, `staffs/`, `trekkers/`, plus `router/`, `store/auth.js`, and `services/api.js`.

→ Code: whole tree; entry points `backend/app.py` lines 11-63 and `frontend/src/main.js`.

---

## 1. Backend, Flask and app structure

**What framework is your backend and why Flask?**
Flask. It is a micro framework, so it gives me the core (routing, request handling) and lets me pick the rest as extensions, which is exactly what the course teaches. I used Flask-SQLAlchemy for the ORM, Flask-JWT-Extended for auth, Flask-Caching, Flask-Mail and Celery.
→ Code: `backend/extensions.py` lines 9-13 (extensions created), `backend/app.py` lines 15-18 (initialised).

**Explain your app.py / how the app starts.**
I use the application factory pattern. In `app.py` there is a `create_app()` function that builds the Flask app, loads config from the `Config` class, initialises the extensions, sets up CORS, registers the four blueprints, configures Celery, then in an app context creates the tables and bootstraps the first admin.
→ Code: `backend/app.py` lines 11-60 (`create_app`), config load line 13, extension init 15-18, blueprints 22-25, `db.create_all()` line 40.

**What is a blueprint? Why did you use them?**
A blueprint groups related routes into a module so the app is not one giant file. I have four: `auth_bp` (`/auth`), `admin_bp` (`/admin`), `staff_bp` (`/staff`), `user_bp` (`/trekker`). So a login hits `/auth/login`, an admin listing hits `/admin/treks`. It keeps role logic separated.
→ Code: registration in `backend/app.py` lines 22-25; each blueprint defined at top of its file, e.g. `backend/api/auth.py` line 9, `backend/api/admin.py` line 10.

**How does Flask decide which function to run for a URL? (they may want WSGI here)**
Flask keeps a URL map built from the `@blueprint.route(...)` decorators. When a request comes in, the WSGI server hands the request environment to Flask, Flask matches the path and method against that map and calls the matching view. WSGI (Web Server Gateway Interface) is the standard between a Python web app and the web server. In development I run the built-in Werkzeug server via `app.run(debug=True)`; in production it would sit behind Gunicorn talking WSGI.
→ Code: route decorators everywhere, e.g. `backend/api/auth.py` line 41; dev server `backend/app.py` lines 62-63.

**What is a decorator? Why not just call a function?**
A decorator is a function that wraps another to add behaviour without changing its code. In my project `@auth_bp.route(...)` registers a route, `@jwt_required()` rejects a request with no valid token before my view runs, `@cache.cached(...)` serves a cached response, and `@celery.task` turns a function into a queueable task. A decorator lets me reuse that behaviour across many endpoints with one line instead of repeating it inside each function.
→ Code: `@jwt_required()` at `backend/api/admin.py` line 19; `@cache.cached` at `backend/api/admin.py` line 95; `@celery.task` at `backend/tasks.py` line 175.

**What does each decorator do in your code (app.route, cache.cached, celery.task, jwt_required)?**
`route` maps a URL and method to a function; `jwt_required()` enforces a valid JWT; `cache.cached(timeout=60, query_string=True)` stores the JSON response in Redis keyed by URL and query string for 60 seconds; `celery.task` registers the function so I can `.delay(...)` it onto a worker.
→ Code: `backend/api/admin.py` lines 93-96 (route + jwt + cache stacked on the same view); `backend/tasks.py` line 175 (`@celery.task`).

**What is config / how do you manage secrets and environment?**
`config.py` has a `Config` class reading everything from environment variables with `os.environ.get`, and `load_dotenv` pulls them from a `.env` file that is git ignored. So DB URI, `SECRET_KEY`, `JWT_SECRET_KEY`, mail creds, Redis URLs and the seed admin creds live in `.env`, not in code.
→ Code: `backend/config.py` lines 4-5 (load_dotenv), lines 7-28 (all settings); `.gitignore` excludes `.env`.

**What is a virtual environment and why use it?**
A venv is an isolated Python environment per project so package versions do not clash with system Python or other projects. `requirements.txt` lists what to install into it. A copied venv can break, so it should be recreated with `pip install -r requirements.txt`.
→ Code: `backend/requirements.txt` (dependency list). No app code; environment level.

**What is app context / the ContextTask in your app.py?**
Celery workers run outside a Flask request, so they need the app context to use the DB and mail. I subclass the Celery task so every task runs inside `app.app_context()`. That is why my tasks can call `db` and `mail` freely.
→ Code: `backend/app.py` lines 33-37 (`ContextTask` wrapping tasks in `app.app_context()`); `backend/celery_worker.py` lines 6-7 (push context for beat).

---

## 2. Authentication and security

**How is authentication implemented in your app?**
Token based auth with JWT using Flask-JWT-Extended. On login I check the email exists, verify the password, check the account is active, then create an access token with the user id as identity and the role as a claim. The frontend sends it as `Authorization: Bearer <token>` on every request. Protected endpoints use `@jwt_required()` and I read identity with `get_jwt_identity()` and role with `get_jwt()`.
→ Code: `backend/api/auth.py` lines 41-70 (`login`), token creation lines 60-64; token attached in `frontend/src/services/api.js` lines 7-16.

**What is a JWT and what is inside it? Where do you store it?**
A JWT is a signed token with three parts: header, payload, signature, base64url encoded and dot separated. The payload carries claims; mine has the user id as identity, the role, and the expiry `exp`. It is signed with `JWT_SECRET_KEY`. I store it in the browser's localStorage. Honest tradeoff: localStorage is readable by JS so it is exposed to XSS, but it is not sent automatically so it avoids CSRF.
→ Code: claims set at `backend/api/auth.py` lines 60-64; secret at `backend/config.py` line 11; stored/read in `frontend/src/store/auth.js` lines 24-26 and `frontend/src/services/api.js` line 9.

**What is a Bearer token?**
"Bearer" means whoever holds the token is granted access, so it is sent in the `Authorization: Bearer <token>` header and the server trusts the signature. My axios interceptor sets exactly that header.
→ Code: `frontend/src/services/api.js` line 11 (`config.headers.Authorization = ` Bearer ${token}` `).

**What is your token expiry? (asked)**
15 minutes by default, or 7 days if the user ticked remember me. I compute it at login and the frontend also decodes the token to show a live session countdown, logging out when it hits zero.
→ Code: `backend/api/auth.py` line 59 (`timedelta(days=7) if remember else timedelta(minutes=15)`); countdown in `frontend/src/store/auth.js` lines 43-73.

**Difference between authentication and authorisation?**
Authentication is proving who you are, which happens at login when I verify the password and issue the token. Authorisation is what you are allowed to do, which happens on every protected route where I check the role claim and return 403 if it does not match.
→ Code: authentication `backend/api/auth.py` lines 41-70; authorisation `backend/api/admin.py` lines 12-16 (`verify_admin`).

**How do you implement role based access control (RBAC)?**
The role is a claim in the token, set at login. Each blueprint has a verify helper that reads `get_jwt().get('role')` and returns 403 if wrong. The frontend router also checks role, but that is only UX; the backend is the real enforcement.
→ Code: role claim `backend/api/auth.py` line 62; checks `backend/api/admin.py` lines 12-16, `backend/api/staffs.py` lines 11-15, `backend/api/users.py` lines 10-14; frontend guard `frontend/src/router/index.js` lines 37-60.

**Someone opens dev tools, changes role in localStorage to admin and changes the URL, why can they still not get in? (asked)**
Because the role that matters is inside the signed JWT, not the loose `role` in localStorage. Editing localStorage may let the frontend router navigate, but the moment the page calls an admin API the backend reads the role from the verified token claim and returns 403. They cannot forge a token with role admin without `JWT_SECRET_KEY`.
→ Code: verified claim read at `backend/api/admin.py` lines 12-16; frontend-only role at `frontend/src/router/index.js` line 43 and `frontend/src/store/auth.js` line 9.

**How are passwords stored? Hashed or encrypted?**
Hashed, not encrypted. `set_password`/`check_password` on the User model use Werkzeug's `generate_password_hash`/`check_password_hash`, which is PBKDF2 with SHA256 and a random per-password salt by default. Hashing is one way; at login I hash the input and compare. Encryption would be reversible, which is wrong for passwords.
→ Code: `backend/models.py` lines 23-27 (`set_password`, `check_password`); used at login `backend/api/auth.py` line 53.

**What is a salt and why does it matter? What is a rainbow table?**
A salt is a random value mixed into each password before hashing so identical passwords get different hashes. A rainbow table is a precomputed hash-to-plaintext lookup for common passwords; salting defeats it because the attacker would need a separate table per salt. Werkzeug adds the salt automatically.
→ Code: salting is inside Werkzeug's `generate_password_hash`, called at `backend/models.py` line 24. No project code for rainbow tables; conceptual.

**In the network tab, after login the password is visible in the payload. How do you hide that? (asked)**
Two parts. The payload is only visible to the user in their own dev tools, which is normal; what protects it on the wire is HTTPS/TLS so nobody in the middle can read it. Second, I never store or log the plaintext, it is hashed immediately server side. So you do not hide it from the user's own browser, you protect it in transit with TLS and never persist it in plaintext.
→ Code: server-side hashing `backend/models.py` line 24; TLS is deployment level (not in code). Honest: I run http locally, https is for production.

**What is CSRF? Are you protected?**
CSRF tricks a logged in browser into sending a request using cookies it sends automatically. My app is not really exposed to classic CSRF because I do not use cookie sessions; the JWT is in localStorage and attached manually by my axios interceptor, so a forged cross-site request would not carry my token. The tradeoff is XSS exposure of localStorage.
→ Code: manual token attach `frontend/src/services/api.js` lines 7-16 (no cookies used). Conceptual otherwise.

**What is XSS and SQL injection? Are you safe?**
XSS is injecting script that runs in another user's browser; Vue escapes `{{ }}` interpolation by default and I do not use `v-html` on untrusted data. SQL injection is injecting SQL through inputs; I use SQLAlchemy with parameterised queries everywhere, for example the `ilike` search binds the value as a parameter rather than concatenating raw SQL.
→ Code: parameterised search `backend/api/admin.py` line 104 (`Trek.name.ilike(f'%{search}%')` via the ORM) and staff search line 267; trekker listing filters via `filter_by(status='Open')` `backend/api/users.py` line 42. Vue escaping is framework default.

**What is CORS and why did you enable it?**
CORS is the browser rule blocking a page on one origin from calling an API on another unless the API allows it. My frontend is on `localhost:5173` and the API on `127.0.0.1:5000`, different origins, so I enable CORS for all origins. Honest: `"*"` is fine for a demo but I would restrict it to my real domain in production.
→ Code: `backend/app.py` line 20 (`CORS(app, resources={r"/*": {"origins": "*"}})`).

**localStorage vs cookies vs sessionStorage, and why JWT and not sessions?**
Cookies are sent automatically and can be HttpOnly (JS cannot read them). localStorage persists until cleared and is read/written by JS but not sent automatically. sessionStorage is like localStorage but cleared when the tab closes. I chose JWT in localStorage so the API stays stateless, no server session store, which suits a separate SPA and horizontal scaling (no session affinity). The cost is XSS exposure.
→ Code: token read/write in localStorage `frontend/src/store/auth.js` lines 8-10, 24-26, 40; attached `frontend/src/services/api.js` line 9.

**How is the OTP / forgot password flow done?**
`/auth/forgot-password` generates a 6 digit OTP, stores it in Redis with `setex` so it auto expires in 5 minutes, and queues an email via the `send_otp_email` Celery task. `/auth/reset-password` reads the OTP back, compares, sets the new password on success and deletes the key. Redis `setex` giving automatic expiry is the neat part.
→ Code: `backend/api/auth.py` lines 72-83 (generate + `setex` line 81 + queue email line 82) and lines 85-102 (verify + reset, delete line 101); Redis client `backend/extensions.py` line 14.

**What is a man in the middle attack?**
Someone sitting between client and server reading or altering traffic. The defence is TLS, which encrypts the channel so the interceptor sees only ciphertext and cannot silently modify it.
→ Code: TLS is deployment level; no app code. Conceptual.

**What is HTTP vs HTTPS, TLS, TCP, SMTP, HTTP/1.1? (asked in one viva)**
HTTP is the request-response protocol for the web; HTTPS is HTTP over TLS, which encrypts and authenticates the connection. TLS is the encryption layer. TCP is the reliable transport protocol underneath that guarantees ordered delivery. SMTP is the protocol for sending email, which my mail config uses. HTTP/1.1 is the HTTP version that keeps connections alive between requests. My app speaks HTTP in dev and SMTP for mail.
→ Code: SMTP config `backend/config.py` lines 23-28; mail send `backend/tasks.py` line 396. HTTP/TLS/TCP are protocol level, not in code.

**What is a DDoS attack? (asked)**
A distributed denial of service floods the server with traffic from many machines so real users cannot get through. Honest answer: my app has no protection built in; to defend it I would put it behind a rate limiter (like Flask-Limiter) and a reverse proxy/CDN that can absorb and filter traffic.
→ Code: none in project (a gap I would fix with rate limiting on `backend/api/auth.py` login/OTP routes).

**Do you have RoleMixin / UserMixin, fs_uniquifier? (asked)**
Honest answer: no. Those come from Flask-Security, which was more of a MAD1 thing, and `fs_uniquifier` is Flask-Security's token invalidation field. Here I did role handling myself with a plain `role` string column and JWT claims plus the `verify_*` helpers, so I have no mixins and no `fs_uniquifier`.
→ Code: role as a plain column `backend/models.py` line 12; my own checks `backend/api/admin.py` lines 12-16. No mixin code exists (by design).

---

## 3. Database, models and SQLAlchemy

**Explain your data model.**
Four tables. `User` holds everyone with a `role` column plus `is_active` and `is_blacklisted`. `Trek` has name, location, difficulty, slots, price, dates, a `status` lifecycle field and an `assigned_staff_id` foreign key to User. `Booking` links a user to a trek with `num_slots`, `status`, `payment_status`. `StaffProfile` is a one to one extension of a staff User. I kept one User table with a role instead of three tables to keep auth uniform.
→ Code: `backend/models.py` lines 5-27 (User), 30-49 (Trek), 52-64 (Booking), 67-78 (StaffProfile).

**What is an ORM? Why SQLAlchemy?**
An ORM lets me work with Python classes instead of raw SQL; SQLAlchemy turns `Trek.query.filter_by(status='Open').all()` into a SELECT. Benefits: less boilerplate, DB portability, and safety from injection because queries are parameterised. I use Flask-SQLAlchemy, the Flask integration.
→ Code: ORM query example `backend/api/users.py` lines 40-42; `db` object `backend/extensions.py` line 9.

**Explain your relationships.**
I use `db.relationship` with `back_populates` on both sides: `User.bookings`/`Booking.user`, `Trek.bookings`/`Booking.trek`, `User.assigned_treks`/`Trek.assigned_staff` (explicit `foreign_keys` because staff link to User), and `User.staff_profile` with `uselist=False` for one to one. So from a trek I can do `trek.bookings` without writing a join.
→ Code: `backend/models.py` lines 19-21 (User side), line 48-49 (Trek side), lines 63-64 (Booking side), line 78 (StaffProfile side).

**What is cascade / on delete cascade / all, delete-orphan? Can you do the opposite?**
`cascade="all, delete-orphan"` means deleting a parent deletes its children and any child removed from the collection is deleted, so no orphan rows point at a missing parent. Deleting a user removes their bookings, deleting a trek removes its bookings. The opposite would be no cascade or RESTRICT, which blocks the delete while children exist, or setting the child FK to null. For my app cascade makes sense because a booking is meaningless without its trek or user.
→ Code: `backend/models.py` line 19 (`User.bookings` cascade), line 21 (`staff_profile` cascade), line 49 (`Trek.bookings` cascade).

**What is lazy loading vs eager loading? joinedload / the N+1 problem?**
Lazy loading (default) queries a relationship only when first accessed; eager loading fetches it up front (`joinedload`). N+1 is looping over N parents and firing one query per child access, so 1 + N queries. Honest: I do not use `joinedload`, so the admin bookings endpoint that loops and reads `b.user.full_name` and `b.trek.name` can trigger extra queries per row. Fine at this scale; to optimise I would add `.options(joinedload(...))`. Eager loading is better exactly when you touch the related rows for every parent, like that listing.
→ Code: the N+1-prone loop `backend/api/admin.py` lines 411-428 (reads `b.user.full_name` line 420, `b.trek.name` line 422). Default lazy loading in `backend/models.py` relationships.

**What is a join? What SQL do you run?**
A join combines rows from two tables on a related column. My relationships do joins implicitly, and I use an explicit filtered aggregate to count participants with `func.coalesce(func.sum(Booking.num_slots), 0)` rather than pulling rows into Python.
→ Code: aggregate join `backend/api/staffs.py` lines 33 and 64 (`db.func.sum(Booking.num_slots)`).

**What are aggregate functions, group by, having, subquery?**
Aggregates summarise many rows into one: COUNT, SUM, AVG, MIN, MAX. GROUP BY buckets rows before aggregating; HAVING filters those groups after aggregation (WHERE filters rows before). A subquery is a query nested in another. Honest: my code uses simple filters and a SUM; I have no heavy GROUP BY/HAVING, so if pushed I would write "treks with more than 10 participants" as GROUP BY trek_id HAVING SUM(num_slots) > 10.
→ Code: SUM aggregate `backend/api/staffs.py` line 33; COUNT-style via `.count()` in `backend/api/admin.py` lines 61-64 (dashboard). No GROUP BY/HAVING in project.

**What is indexing? Do you index anything?**
An index is a sorted structure (usually a B-tree) that finds rows without scanning the whole table, at the cost of space and slower writes. Primary keys are indexed automatically and `User.email` has `unique=True` which creates a unique index. Honest: my `ilike` searches on name/location are not indexed so they full scan; fine at this scale, and to speed search I would add `index=True` on those columns.
→ Code: unique index `backend/models.py` line 10 (`email ... unique=True`); unindexed search `backend/api/admin.py` line 104.

**What are primary keys and foreign keys?**
A primary key uniquely identifies a row (my `id` columns). A foreign key references another table's primary key to enforce a relationship, for example `Booking.user_id` to `users.id` and `Trek.assigned_staff_id` to `users.id`. They keep referential integrity.
→ Code: primary keys `backend/models.py` lines 8, 33, 55, 70; foreign keys lines 40, 56, 57, 71.

**What is normalization?**
Organising tables so each fact is stored once, reducing redundancy. My bookings store `trek_id` and `user_id` rather than copying the trek name or user email, and staff-only fields live in `StaffProfile` instead of bloating every User row. Duplicating trek names into bookings would cause update anomalies on rename.
→ Code: booking foreign keys not duplicated data `backend/models.py` lines 56-57; staff split-out `backend/models.py` lines 67-78.

**Why SQLite? Is it scalable? What would you change?**
SQLite because it is zero config and file based, perfect for a single machine demo. Honest: it is weak on high concurrency because writes lock the file, so for many simultaneous users I would move to PostgreSQL or MySQL. Because I use SQLAlchemy, switching is mostly changing the URI, not rewriting queries.
→ Code: DB URI `backend/config.py` line 8 (`SQLALCHEMY_DATABASE_URI`).

**If you switched SQLite to another DB, what changes? (asked)**
Mainly the connection string in `config.py`/`.env` and installing the right driver (psycopg2 for Postgres). Models and queries stay the same because SQLAlchemy abstracts the dialect. I might revisit column types or the case sensitivity of `ilike`, and run migrations, but no big rewrite. That portability is a core reason to use an ORM.
→ Code: single change point `backend/config.py` line 8.

**Do you use migrations?**
`requirements.txt` includes Flask-Migrate, but here I create tables with `db.create_all()` and seed with `seed.py`. Honest: for a schema evolving in production I would use Flask-Migrate/Alembic; for this scope `create_all` plus a seed script was enough.
→ Code: `backend/app.py` line 40 (`db.create_all()`); `backend/seed.py` (seed data).

**What is a transaction? ACID?**
A transaction is a group of DB operations that succeed or fail together. Booking relies on it: I decrement `available_slots` and insert the Booking, then commit; on failure I rollback so I never take a slot without a booking. ACID is Atomicity, Consistency, Isolation, Durability; my commit/rollback is the atomicity part.
→ Code: `backend/api/users.py` lines 114-125 (decrement line 114, add line 119, commit line 121, rollback in the except).

---

## 4. REST APIs and HTTP

**What is a REST API? Is your API RESTful?**
REST exposes resources at URLs acted on by HTTP methods, statelessly. Mine is mostly RESTful: resources like `/admin/treks`, methods GET/POST/PUT/DELETE, and stateless because auth is a token per request. Honest: not perfectly REST (actions like `/treks/<id>/approve` are RPC-ish verbs), a common pragmatic choice.
→ Code: resource routes `backend/api/admin.py` lines 93, 151; verb-style route line 236 (`/approve`).

**Difference between GET, POST, PUT, PATCH, DELETE? (asked a lot)**
GET reads, POST creates, PUT replaces/updates and is idempotent, PATCH partially updates, DELETE removes. Honest note: my update endpoints are declared PUT but only overwrite the fields present in the body, so functionally they behave like PATCH.
→ Code: POST create + GET read `backend/api/admin.py` lines 93-149; PUT/DELETE `backend/api/admin.py` lines 151-201 (field-by-field partial update around lines 174-195).

**Why is POST idempotent? (trick question in the sheet)**
It is not. POST is the non-idempotent one: sending it twice creates two resources. GET, PUT and DELETE are idempotent (same request repeated leaves the same state), POST is not. So I would correct the premise. In my app posting two bookings for the same trek is even blocked by a duplicate check, but the method itself is not idempotent.
→ Code: duplicate-booking guard `backend/api/users.py` line 107 (`existing = Booking.query.filter(...)`).

**What is CRUD? Show it.**
Create, Read, Update, Delete. Treks are the clearest: POST creates, GET reads, PUT updates, DELETE removes.
→ Code: `backend/api/admin.py` lines 93-149 (create/read) and 151-201 (update/delete).

**What HTTP status codes do you return?**
200 OK, 201 created (register, new trek, new booking), 202 accepted for async report/export requests returning a task id, 400 bad input, 401 bad login/no auth, 403 wrong role, 404 not found, 409 duplicate email, 500 server error.
→ Code: 201 `backend/api/auth.py` line 38; 401 `backend/api/auth.py` lines 51/54; 403 `backend/api/admin.py` line 15; 202 `backend/api/admin.py` line 455; 409 `backend/api/admin.py` line 293 (duplicate staff email).

**Why does the report endpoint return 202 and a task id?**
Because generating the PDF is slow, so I do not do it in the request. The endpoint kicks off the Celery task and immediately returns 202 with the task id; the frontend polls status then downloads.
→ Code: `backend/api/admin.py` lines 430-455 (`.delay` line 454, `202` line 455); status `backend/api/admin.py` lines 457-470; download lines 472-490.

**Difference between json and jsonify, and json.dumps?**
`jsonify` serialises a dict to JSON, sets `Content-Type: application/json`, and returns a proper Response. `json.dumps` just gives a string with no headers. I use `jsonify` everywhere.
→ Code: `jsonify` used throughout, e.g. `backend/api/admin.py` line 455.

**How would you test your API?**
For isolated testing, Postman or Thunder Client: POST to `/auth/login`, copy the `access_token`, set the `Authorization: Bearer` header, hit a protected route. Honest: I mostly tested through the running Vue app, but I can demo an endpoint in Postman.
→ Code: login to grab a token `backend/api/auth.py` lines 41-70; protected route to hit `backend/api/admin.py` lines 55-65.

**Do you have pagination or rate limiting?**
Honest: no pagination and no rate limiting. Lists return all rows, fine at this size. To scale I would add `paginate(page, per_page)` on list endpoints and Flask-Limiter on login/OTP to stop brute forcing.
→ Code: unpaginated list `backend/api/admin.py` lines 96-149 (returns all treks). Gap noted.

**What are request headers? How does the token get sent?**
Headers carry request metadata. The key one is `Authorization: Bearer <jwt>`, attached automatically by the axios request interceptor from localStorage; `@jwt_required()` reads it. There is also `Content-Type: application/json` for bodies.
→ Code: header set `frontend/src/services/api.js` line 11; read by `@jwt_required()` `backend/api/admin.py` line 19.

---

## 5. Caching

**What is caching and why did you use it?**
Caching stores the result of an expensive operation so repeats are fast. I use Flask-Caching with a Redis backend, caching the trek listings because they are read often and change rarely.
→ Code: cache object `backend/extensions.py` line 12; config `backend/config.py` lines 19-21; used `backend/api/admin.py` line 95.

**Show where you cache and how you invalidate it.**
The admin treks GET is decorated with `@cache.cached(timeout=60, query_string=True, unless=lambda: request.method != 'GET')`, cached per query string for 60 seconds and only for GETs. On any create/update/delete/assign/approve I call `cache.clear()` after the commit so stale data is never served. The staff listing uses a custom key that includes the staff id.
→ Code: `backend/api/admin.py` line 95 (cache) and lines 145, 165, 198, 230, 251 (`cache.clear()`); staff key `backend/api/staffs.py` lines 46-51; trekker cache `backend/api/users.py` line 33.

**What is cache invalidation and why is it hard?**
It is deciding when cached data is stale and removing it. Hard because too little invalidation serves stale data and too much loses the benefit. My approach is a short 60s TTL plus explicit `cache.clear()` on writes. Honest tradeoff: `cache.clear()` wipes everything, not just the affected key, which is blunt; surgical deletion would be better but clear is simple and correct.
→ Code: TTL `backend/api/admin.py` line 95; clear `backend/api/admin.py` line 145.

**Difference between caching and memoization?**
Memoization is caching a function's return value for given arguments, usually in memory for the process. Caching is the general, shareable, distributed, time-limited idea (my Redis cache). So memoization is function-argument scoped and local; my caching is request scoped and shared.
→ Code: my request-level caching `backend/api/admin.py` line 95. No memoize used; conceptual.

**Difference between Redis and Memcached?**
Both are in-memory key value stores. Memcached is simpler, strings only, multithreaded, pure caching. Redis has rich types, persistence, pub/sub, and can be a message broker. I chose Redis because I needed it for three jobs at once: cache backend, Celery broker/result backend, and OTP storage with `setex`. Memcached could not be my broker or store OTPs cleanly.
→ Code: three Redis roles: cache `backend/config.py` lines 19-21, celery `backend/config.py` lines 16-17, OTP `backend/config.py` line 22 and `backend/extensions.py` line 14.

**What is memoization? (standalone)**
Remembering a function's output for given inputs to skip recomputation. Flask-Caching has `@cache.memoize()` for this at function level, distinct from `@cache.cached()` which keys on the request path.
→ Code: I use `cache.cached` not `cache.memoize`; example `backend/api/admin.py` line 95. Conceptual.

---

## 6. Celery, Redis and background jobs

**What is Celery and why do you need it?**
Celery is a distributed task queue for work outside the request-response cycle. I need it because some operations are slow or scheduled (PDF reports, CSV, emails, recurring jobs). Doing them in the request would make the user wait or time out.
→ Code: tasks `backend/tasks.py` (whole file); celery object `backend/extensions.py` line 13.

**What are the components of Celery? (asked)**
Client (my app calling `.delay()`), broker (Redis holding the queue), worker (process running tasks), result backend (Redis storing state and return values), and Celery Beat (scheduler for periodic tasks).
→ Code: config wiring `backend/app.py` lines 27-31; broker/backend `backend/config.py` lines 16-17; beat `backend/celery_worker.py` lines 9-22.

**Difference between broker URL and result backend?**
The broker is the queue carrying tasks from app to workers. The result backend stores the outcome and state so the caller can check later. Both point at Redis in mine but are different roles: "here is work" vs "here is what happened". My status endpoints read the result backend.
→ Code: broker/backend `backend/config.py` lines 16-17; status read `backend/api/admin.py` line 462 (`celery.AsyncResult(task_id).state`).

**Task queue vs message queue? (asked)**
A message queue is the general pipe that carries messages between producers and consumers (Redis is playing that role here). A task queue is a layer on top specialised for running background jobs, tracking their state and retries (that is Celery). So Celery is a task queue built on top of Redis as the message queue.
→ Code: Redis as message queue `backend/config.py` line 16; Celery task layer `backend/tasks.py` line 175.

**What background tasks did you implement? (asked "what all celery jobs")**
PDF reports (`generate_admin_report_task`, `generate_staff_report_task`), CSV export (`export_trekker_history_task`), emails (`send_csv_email_task`, `send_pdf_email_task`, `send_otp_email`), and scheduled `daily_trek_reminders`, `monthly_admin_report`, `cleanup_old_exports`.
→ Code: `backend/tasks.py` lines 175-177, 346-347, 350-382, 384-400, 402-418, 477-486, 420-439, 441-454, 456-475.

**What is Celery Beat and the crontab line?**
Beat is the scheduler that fires periodic tasks. `crontab(hour=6, minute=0)` runs daily reminders at 6am; `crontab(day_of_month=1, hour=9, minute=0)` runs the monthly report on the 1st at 9am; `crontab(hour=0, minute=0)` runs cleanup at midnight. A crontab expression is minute, hour, day-of-month, month, day-of-week; unset fields default to every.
→ Code: `backend/celery_worker.py` lines 9-22 (daily line 12, monthly line 16, cleanup line 20).

**Does crontab take seconds? (asked)**
No, crontab granularity is minutes. For every 10 seconds I would use a plain float schedule (`'schedule': 10.0`) in Beat instead of `crontab`.
→ Code: current crontab `backend/celery_worker.py` line 12. A float schedule would replace it there.

**Celery worker vs Celery beat?**
The worker executes tasks; beat only schedules, submitting scheduled tasks into the queue on a timer. Beat does not run the task itself.
→ Code: beat schedule `backend/celery_worker.py` lines 9-22; workers run tasks from `backend/tasks.py`. Start commands in `README.md`.

**Why Redis for Celery and not something else?**
Redis is simple, fast, and I already had it for caching and OTPs, so reusing it as broker and backend kept the stack small. RabbitMQ is more feature rich for messaging but Redis was enough for my volume and one less service.
→ Code: broker/backend `backend/config.py` lines 16-17.

**Walk through the report flow end to end.**
Admin POSTs `/admin/reports` with year/month. It validates, calls `generate_admin_report_task.delay(...)`, returns 202 and a task id. The worker's `create_admin_report_pdf` queries completed treks that month, computes participants/revenue/cancellations and the top five, renders HTML, converts with xhtml2pdf's `pisa.CreatePDF`, saves under `backend/exports/`, returns the path. Frontend polls status, then downloads or emails.
→ Code: request `backend/api/admin.py` lines 430-455; builder `backend/tasks.py` lines 13-173 (query lines 24-28, sums 37-41, top5 47-48, `pisa.CreatePDF` line 163); download `backend/api/admin.py` lines 472-490.

**How do you send emails? SMTP?**
Flask-Mail over SMTP, configured from `.env`. The email tasks build a `Message`, attach the file for reports/exports, and `mail.send`. Emails go through a task so the request does not block on SMTP.
→ Code: config `backend/config.py` lines 23-28; send `backend/tasks.py` lines 384-400 (attach line 395, send line 396).

**Implement a feature to email a user when something happens (sometimes asked live).**
I already have the pattern: write a `@celery.task` that builds a `Message` and calls `mail.send`, then `.delay(...)` it from the relevant endpoint. To email on booking, I would add `send_booking_confirmation.delay(...)` after the booking commit and define the task next to the others.
→ Code: pattern to copy `backend/tasks.py` lines 477-486; insertion point `backend/api/users.py` line 121 (after commit).

---

## 7. Frontend, Vue

**What is Vue? Why Vue and not React?**
Vue is a progressive, component based, reactive JavaScript framework; I used Vue 3. Why not React: the course taught Vue, gentler learning curve, single file components keep template/logic/style together, reactivity is built in. React is also excellent; this was a course and comfort choice.
→ Code: app bootstrap `frontend/src/main.js`; components under `frontend/src/views/`.

**Why Vue and not Jinja/HTML? (asked)**
Jinja renders HTML on the server per page (MAD1 style). Vue builds a single page app that updates the view client side without full reloads, which gives a smoother multi-role dashboard experience and a clean split between the API and the UI. So I moved rendering to the client.
→ Code: SPA entry `frontend/src/main.js`; client routing `frontend/src/router/index.js` lines 32-35.

**What is a reactive framework / what does reactive mean?**
Reactive means the UI updates automatically when data changes; I change a data property and the template re-renders, no manual DOM work. Vue 3 does this with JavaScript Proxies tracking reads and writes.
→ Code: reactive `data()` state e.g. `frontend/src/views/trekkers/Treks.vue` lines 115-127, rendered in its template.

**What is the Virtual DOM? Can you manipulate it to change the real DOM?**
The virtual DOM is an in-memory JS representation of the real DOM. On a data change Vue builds a new virtual tree, diffs it against the old, and applies only the minimal real DOM changes. You do not edit the virtual DOM directly; you change reactive state and Vue reconciles it. That is the whole point.
→ Code: no direct code (framework internal). Reactive state driving it: `frontend/src/views/trekkers/Treks.vue` lines 115-127.

**What is an SPA? MPA? PWA?**
SPA loads one shell then swaps views with JS (my app, via vue-router). MPA loads a fresh server page per route. PWA is an installable, offline-capable web app using a service worker and manifest. Honest: mine is an SPA, not a PWA, no service worker.
→ Code: SPA routing `frontend/src/router/index.js` lines 11-35.

**Vue lifecycle hooks, which did you use?**
Hooks run at stages of a component's life: created, mounted, updated, unmounted. I mostly use `mounted()` to fetch initial data; dashboards call their stats API in `mounted`. In `App.vue` I use `mounted()` to start the session timer and `beforeUnmount()` to clear it.
→ Code: `frontend/src/views/trekkers/TrekkerDashboard.vue` lines 70-71 (`mounted` -> `fetchStats`); `frontend/src/App.vue` lines 52-54 (mounted) and 55-57 (beforeUnmount).

**Explain directives: v-if vs v-show, v-for, v-model, v-bind, v-on, v-cloak.**
`v-if` adds/removes the element; `v-show` only toggles CSS display (better when it toggles often). `v-for` renders a list with a `:key`. `v-model` is two way binding on inputs. `v-bind` (`:`) binds an attribute. `v-on` (`@`) attaches events. `v-cloak` hides a template until Vue compiles so users do not see raw `{{ }}` flash; it needs a CSS rule. Honest: I do not use `v-cloak` because Vite mounts fast enough.
→ Code: `v-if` `frontend/src/views/trekkers/Treks.vue` line 35; `v-for` and `:key` line 89; `v-model` lines 13, 16, 24, 56; `v-on` `@click` lines 62, 98; `v-bind` `:max` line 56.

**What is the key attribute in v-for and why?**
`:key` gives each list item a stable unique identity so Vue's diffing tracks items across updates, reusing and reordering nodes correctly. Without it you can get wrong item state after reorder or filter.
→ Code: `frontend/src/views/trekkers/Treks.vue` line 89 (`v-for="t in treks" :key="t.id"`).

**computed vs methods vs watch?**
A computed property is a derived value cached on its dependencies, recalculated only when they change. A method runs every call, no caching. A watcher runs a side effect when a specific reactive value changes. In my app I lean on methods and `mounted` fetches; I trigger `fetchTreks` on `@input`/`@change` rather than a watcher, but I can explain when a watch is cleaner.
→ Code: methods `frontend/src/views/trekkers/Treks.vue` lines 128+; filter change handlers lines 13, 16, 24.

**Where would you use watch, and did you? (asked)**
A watcher reacts to a changing value, for example firing an API call when a search filter changes or validating a field as the user types. Honest: I achieve the same with `@input`/`@change` handlers calling a method instead of a declared `watch`, so I do not have a `watch` block, but I understand it and can convert my filter handlers into one.
→ Code: equivalent handler approach `frontend/src/views/trekkers/Treks.vue` line 13 (`@input="fetchTreks"`).

**Props and emit, how do components communicate?**
Props pass data down (one way); the child sends messages up with `$emit`. My trekker dashboard renders `<Treks @booking-made="fetchStats" />`; the child declares `emits: ['booking-made']` and emits it after a successful booking so the parent refreshes stats.
→ Code: parent listener `frontend/src/views/trekkers/TrekkerDashboard.vue` line 43; child declaration `frontend/src/views/trekkers/Treks.vue` line 114 and emit line 164.

**What are slots?**
Slots let a parent inject template content into a child, so the child defines a layout with a placeholder the parent fills (content projection). Honest: my components are self contained and I did not build slot based reusable components, but I understand slots as content projection.
→ Code: none in project (honest gap); conceptual.

**One way vs two way binding?**
One way pushes data one direction (`{{ }}` or `:value` renders state but the view does not write back). Two way syncs both (`v-model` updates data on typing and the input on data change). Props are one way; `v-model` is the two way sugar.
→ Code: one way interpolation `frontend/src/views/trekkers/TrekkerDashboard.vue` line 4 area; two way `frontend/src/views/trekkers/Treks.vue` line 13 (`v-model`).

**Options API vs Composition API, which did you use?**
Options API organises a component into `data`, `methods`, `computed`, lifecycle options, which I mostly used. Composition API uses `setup()` with `ref`, `computed`, `onMounted` to group logic by feature, better for reuse in big components. Honest: my components are Options API, though I use `setup()` in a few places to pull in the Pinia store.
→ Code: Options API `frontend/src/views/trekkers/TrekkerDashboard.vue` lines 58-74; `setup()` for the store lines 60-63.

**Vue 2 vs Vue 3?**
Vue 3 is a rewrite with the Composition API, Proxy based reactivity (Vue 2 used `Object.defineProperty`, which could not detect added properties or array index changes without workarounds), better TypeScript, fragments (multiple roots), and better performance. I used Vue 3.
→ Code: Vue 3 dependency `frontend/package.json` (`vue ^3`); `setup()` usage `frontend/src/views/trekkers/TrekkerDashboard.vue` line 60.

**Template inheritance, like Jinja in MAD1, in Vue? (asked for the navbar case)**
In Jinja a base template has blocks children extend. In Vue the equivalent is component composition: a root `App.vue` holds the shared layout (header/navbar, `router-view`, footer) and every page renders inside `<router-view>`. So the navbar lives in `App.vue` once and shows on every route.
→ Code: `frontend/src/App.vue` lines 8-26 (shared header + `<router-view>` line 26).

**How is routing done? Route guards?**
vue-router with routes for `/`, `/login`, `/register` and the three role dashboards with `meta: { requiresAuth, role }`. A global `beforeEach` guard redirects unauthenticated users to login and wrong-role users to their own dashboard. This is only UX; the backend still enforces role per API call.
→ Code: routes `frontend/src/router/index.js` lines 11-30 (meta lines 18, 23, 28); guard lines 37-60 (auth check line 41, role check line 43).

**What is lazy loading in Vue and how would you add it?**
Lazy loading downloads a route's JS only when the user navigates there, shrinking the initial bundle, done by importing the component as a function `() => import(...)`. Honest: my router imports components eagerly at the top, so I am not lazy loading routes yet; the app is small, and I know the one-line change.
→ Code: eager imports `frontend/src/router/index.js` lines 4-9 (top imports). Lazy would replace those in the routes table.

**CDN vs CLI, which did you use and why?**
CDN means a script tag off a CDN, quick but no build step or single file components. CLI/build tooling (Vite) gives real `.vue` SFCs, hot reload, and a bundled production build. I used Vite because I needed SFCs, routing and state management, which CDN cannot give cleanly.
→ Code: build config `frontend/vite.config.js`; scripts `frontend/package.json` (`dev`, `build`).

**What is Vite / npm?**
Vite is the build tool and dev server with hot module replacement. npm is the package manager installing my dependencies from `package.json`. `npm install` then `npm run dev` starts it.
→ Code: `frontend/vite.config.js`; `frontend/package.json` (dependencies and scripts).

**State management, Pinia or Vuex? Difference?**
Pinia, the current official Vue store. My `auth` store holds token, role, name and the session timer, with actions `login`, `logout`, `startTimer`. Difference: Pinia is simpler (no mutation boilerplate), better TS and composition support; Vuex needed state, mutations, actions, getters separately. Pinia is the modern replacement for a Vue 3 app.
→ Code: `frontend/src/store/auth.js` lines 7-15 (state + getter), 18-32 (login), 34-42 (logout).

**What is state management and its advantage?**
A central place for data many components need instead of prop-drilling. In my app auth info (logged in, role, name, session timer) is needed by the header, the router guard and every dashboard, so one Pinia store is a single reactive source of truth.
→ Code: store `frontend/src/store/auth.js` lines 7-15; consumed in guard `frontend/src/router/index.js` line 41 and header `frontend/src/App.vue` line 14.

**How can a Vue element lose its reactivity? (asked)**
By detaching values from reactive state. In Vue 2 adding a new property or setting an array index directly was not reactive (needed `Vue.set`). Vue 3's Proxy fixes most, but you can still lose reactivity by destructuring reactive state into plain variables or overwriting a reactive reference with a plain object. Fix: mutate the reactive object's properties.
→ Code: no direct code; conceptual. Reactive state kept intact in `frontend/src/store/auth.js` (mutated via `this.`).

---

## 8. General web and JavaScript

**What is a CDN?**
A content delivery network is distributed servers that cache and serve content near the user, reducing latency. In "CDN vs CLI" it was about loading Vue; more generally a CDN speeds asset delivery and absorbs traffic. For scaling I could serve my built assets and images from a CDN.
→ Code: no project code; deployment/tooling concept.

**What is a closure?**
A function that remembers variables from the scope where it was created, even after that scope finished. My axios interceptors and the `setInterval` callback in the auth store close over surrounding variables.
→ Code: closure over `this`/store in `frontend/src/store/auth.js` lines 51-68 (setInterval callback).

**What is a callback function? (asked)**
A function passed into another function to be called later, often after an async operation or an event. My `@click="handler"` and the function inside `setInterval` are callbacks.
→ Code: `frontend/src/store/auth.js` line 51 (callback passed to `setInterval`); `frontend/src/services/api.js` lines 8, 20 (interceptor callbacks).

**What is a higher order function? (asked)**
A function that takes another function as an argument or returns a function. `setInterval`, axios interceptor registration, and array methods like `map`/`filter` are higher order. My decorators are the Python equivalent.
→ Code: `frontend/src/services/api.js` lines 7 and 18 (`interceptors.request.use(...)` taking functions).

**What is a Promise / async await?**
A Promise represents a value available later from an async operation; `async/await` writes promise code sequentially. My API calls are promises: `async login() { const response = await API.post('/auth/login', ...) }`.
→ Code: `frontend/src/store/auth.js` lines 18-19 (`async login` + `await API.post`).

**What is axios and why not fetch?**
axios is an HTTP client. I use it for interceptors (attach token, handle 401 globally), automatic JSON parsing, and a base URL config, which are more boilerplate with raw `fetch`.
→ Code: `frontend/src/services/api.js` lines 3-27 (create + both interceptors).

**What is a dataclass? (asked)**
A Python `@dataclass` auto generates `__init__`, `__repr__`, `__eq__` from annotations, good for plain data holders. Honest: I do not use dataclasses; my models are SQLAlchemy classes instead.
→ Code: none (honest); closest data classes are the models `backend/models.py`.

**localStorage vs sessionStorage vs cookies (JS side).**
localStorage persists across tabs and restarts until cleared; sessionStorage clears when the tab closes; cookies are sent to the server automatically and can be HttpOnly. I use localStorage for the token, read in the axios interceptor.
→ Code: `frontend/src/services/api.js` line 9; `frontend/src/store/auth.js` lines 8-10, 40.

**Websocket vs webhook?**
A WebSocket is a persistent two way connection for real time data. A webhook is a server to server HTTP callback when an event happens. Honest: my app uses neither; it is request-response REST with client polling for task status. For live report-ready notifications I could use a WebSocket instead of polling.
→ Code: polling instead of sockets `frontend` report/export status calls hitting `backend/api/admin.py` lines 457-470. No socket code.

**cellpadding / cellspacing (came up due to table layout).**
Old HTML table attributes: cellpadding is space inside a cell, cellspacing is space between cells. My views use table layouts with these for a plain UI. Modern approach is CSS padding and border-spacing.
→ Code: table layout with these attributes `frontend/src/views/trekkers/Treks.vue` (table tags near the top of the template).

---

## 9. Architecture, scalability and deployment

**What is MVC and does your app follow it?**
Model, View, Controller. Models are the SQLAlchemy classes, Controllers are the blueprint route handlers returning JSON, Views are the Vue components. It is an API-plus-SPA split rather than textbook server side MVC, but the separation maps cleanly.
→ Code: models `backend/models.py`; controllers `backend/api/`; views `frontend/src/views/`.

**Horizontal vs vertical scaling? (asked)**
Vertical scaling is making one machine bigger (more CPU/RAM). Horizontal scaling is adding more machines and load balancing across them. My stateless JWT auth makes horizontal scaling easy because there is no server session tying a user to one instance.
→ Code: statelessness enabler: token auth `backend/api/auth.py` lines 60-64 (no server session). Scaling is deployment level.

**Is your app scalable? Scale to 10000+ users? (asked repeatedly)**
Honest: as is, no, it is a single machine dev setup. To scale I would move SQLite to PostgreSQL with read replicas; run Flask under Gunicorn with multiple workers behind Nginx as reverse proxy/load balancer, several app instances (JWT makes this easy); scale Celery workers horizontally; keep Redis for caching; add DB indexes on searched columns and pagination on lists; serve the frontend and assets from a CDN; and add rate limiting on auth endpoints.
→ Code: current single-process entry `backend/app.py` lines 62-63; stateless auth `backend/api/auth.py` lines 60-64; gaps: unindexed search line 104, unpaginated lists lines 96-149.

**Would the current stack be efficient / where are the bottlenecks?**
Main bottlenecks: SQLite writes under concurrency, unindexed `ilike` searches full scanning, list endpoints returning everything, and potential N+1 in loops reading relationships per row. I can name each and its fix.
→ Code: SQLite `backend/config.py` line 8; search `backend/api/admin.py` line 104; unpaginated `backend/api/admin.py` lines 96-149; N+1 loop `backend/api/admin.py` lines 411-428.

**How is your app deployed?**
Honest: it runs locally, backend `python app.py`, `redis-server`, Celery worker and beat, and the Vue dev server `npm run dev`, per the README. For real deployment: Gunicorn plus Nginx plus managed Postgres and Redis.
→ Code: run steps `README.md`; dev server `backend/app.py` lines 62-63.

---

## 10. Git

**Do you use Git? Basic commands?**
Yes, the project is a git repo with a `.gitignore`. Day to day: `git status`, `git add`, `git commit -m`, `git push`/`git pull`, `git branch`, `git checkout`/`git switch`, `git log`. The `.gitignore` keeps `.env`, the venv and `node_modules` out of the repo.
→ Code: `.gitignore` at repo root; `.git/` folder present.

**Why is .gitignore important here?**
Because `.env` holds secrets (JWT key, mail password, admin creds, Redis URLs) and must never be pushed, and `node_modules`/venv are large and reproducible from `package.json`/`requirements.txt`, so there is no reason to commit them.
→ Code: `.gitignore` (excludes `.env`, venv, `node_modules`); secrets read at `backend/config.py` lines 7-28.

---

## 11. Likely "show me in the code" demo asks

Exact spots so I can jump straight there:

- Models and relationships: `backend/models.py` lines 5-78 (relationships 19-21, 48-49, 63-64, 78).
- JWT creation and login: `backend/api/auth.py` lines 41-70 (token 60-64).
- Role check / RBAC: `backend/api/admin.py` lines 12-16, `backend/api/staffs.py` lines 11-15, `backend/api/users.py` lines 10-14.
- Caching and invalidation: `backend/api/admin.py` line 95 and `cache.clear()` lines 145/165/198/230/251; `backend/api/users.py` line 33; `backend/api/staffs.py` lines 46-51.
- Celery tasks: `backend/tasks.py` lines 175-486.
- Celery Beat schedule and crontab: `backend/celery_worker.py` lines 9-22.
- Redis for OTP: `backend/api/auth.py` lines 72-83 (`setex` line 81); client `backend/extensions.py` line 14.
- PDF generation: `backend/tasks.py` lines 13-173 (`pisa.CreatePDF` line 163).
- CSV export: `backend/tasks.py` lines 350-382 (`csv.writer` line 361).
- Booking transaction (slot decrement + commit/rollback): `backend/api/users.py` lines 68-126.
- Trek lifecycle transitions: `backend/api/staffs.py` lines 17-21 and 85-113.
- Frontend token attach and 401 handling: `frontend/src/services/api.js` lines 7-27.
- Pinia auth store and session timer: `frontend/src/store/auth.js` lines 18-85.
- Route guards: `frontend/src/router/index.js` lines 37-60.
- Parent/child props and emit: `frontend/src/views/trekkers/TrekkerDashboard.vue` line 43 and `frontend/src/views/trekkers/Treks.vue` lines 114, 164.

---

## 12. Tricky and gotcha questions from the sheet

**Why JWT and not just pass the user_id? (asked)**
A raw user id is trivially forgeable, anyone could send `user_id=1` and pretend to be admin. A JWT is signed with a secret so the server can verify the id and role were issued by me and not tampered with. That signature is the point.
→ Code: signed token `backend/api/auth.py` lines 60-64; verified on each request `backend/api/admin.py` line 19.

**Why decorators instead of just functions? (asked)**
The same cross cutting behaviour (auth check, caching, task registration) applies to many endpoints, and a decorator attaches it declaratively with one line per route instead of repeating logic in every function.
→ Code: stacked decorators `backend/api/admin.py` lines 93-96.

**Frontend router guard vs backend role check?**
The router guard is convenience, stopping UI navigation to the wrong dashboard. The backend `verify_*` check is the real security because anyone can bypass the frontend by calling the API directly.
→ Code: guard `frontend/src/router/index.js` lines 37-60; real check `backend/api/admin.py` lines 12-16.

**Can a completed trek be edited or assigned?**
No, enforced. `trek_detail` PUT returns 400 if status is Completed, and `assign_staff` blocks assignment on completed treks. The lifecycle is one directional.
→ Code: edit block `backend/api/admin.py` line 171; assign block `backend/api/admin.py` line 214.

**What happens to slots when a booking is cancelled?**
The booking becomes Cancelled, payment becomes Refunded, and the slots return to the pool, inside a commit with rollback on failure.
→ Code: `backend/api/users.py` lines 143-149 (Cancelled 143, Refunded 144, slots back 145).

**What stops double booking the same trek?**
Before creating a booking I query for an existing non-cancelled booking by the same user for the same trek and return 400 if found, plus I check available slots, that the trek is Open, and that payment is confirmed.
→ Code: `backend/api/users.py` line 107 (existing check), lines 104/111 (slots and payment checks).

**Why a separate Redis URL for OTP?**
So OTP data is logically isolated (potentially a different Redis DB index), and I talk to it with a plain `redis` client using `setex` for expiry rather than through Flask-Caching.
→ Code: `OTP_REDIS_URL` `backend/config.py` line 22; client `backend/extensions.py` line 14; `setex` `backend/api/auth.py` line 81.

**What is the admin bootstrap in app.py?**
On startup `create_app()` checks for an admin with the configured email; if none exists it creates one from `.env`, so there is always a first admin. Regular users register as trekkers; staff are created by the admin.
→ Code: `backend/app.py` lines 42-57 (bootstrap); register-as-trekker `backend/api/auth.py` lines 11-38; admin-creates-staff `backend/api/admin.py` lines 257-315.

**Login with a blacklisted user, what happens?**
Blacklisting sets `is_active` false, and login returns 403 "Account is inactive" when `is_active` is false. The seed data has a blacklisted trekker so I can demo it.
→ Code: toggle `backend/api/admin.py` lines 398-399; login block `backend/api/auth.py` line 56; seed `backend/seed.py` (Farhan, blacklisted).

---

*If I do not know something in the viva, I will say so honestly and then reason about how I would find or implement it, rather than bluffing. The theme of this whole doc: point to the real code and line numbers where it exists, and be straight about the gaps.*
