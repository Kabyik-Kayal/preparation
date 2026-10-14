---
title: TrekStar Viva Preparation Guide
description: Full viva Q and A for TrekStar with code references.
tags:
  - mad2
  - viva
  - trekstar
---

# TrekStar Viva Preparation Guide

**Trekking Management Application V2, full viva Q&A with code references**

This is my long form prep, rewritten to match my actual project (TrekStar). Same idea as my other modules in this folder: answers written the way I would really say them, tied to my own code with exact file and line numbers, honest where the project does not do something rather than pretending. No em dashes, no emojis. Line numbers are as of when I wrote this, so I treat them as "jump to about here and read the surrounding function".

One thing to get right up front, because it differs from a lot of sample answers online: this project uses **Pinia** (not Vuex), **Werkzeug's** password hashing (not bcrypt), **Vite** (not Vue CLI), plain **table based HTML** (no Bootstrap), and my role checks are small **helper functions** called inside each route (not custom decorators). I say the honest version of each of these.

---

## Table of Contents
1. [Project Overview and Architecture](#1-project-overview-and-architecture)
2. [Vue Core Concepts](#2-vue-core-concepts)
3. [Vue Lifecycle Hooks](#3-vue-lifecycle-hooks)
4. [Vue Directives](#4-vue-directives)
5. [Data Binding and Watch](#5-data-binding-and-watch)
6. [Vue Router](#6-vue-router)
7. [State Management with Pinia](#7-state-management-with-pinia)
8. [Vite Build Tooling vs CDN](#8-vite-build-tooling-vs-cdn)
9. [Components, Props and Slots](#9-components-props-and-slots)
10. [Frontend Authentication and Token Flow](#10-frontend-authentication-and-token-flow)
11. [CORS and Security](#11-cors-and-security)
12. [Database Models and SQLAlchemy](#12-database-models-and-sqlalchemy)
13. [Backend Flask and APIs](#13-backend-flask-and-apis)
14. [RBAC Implementation](#14-rbac-implementation)
15. [Redis and Caching](#15-redis-and-caching)
16. [Celery Tasks, Beat and Worker](#16-celery-tasks-beat-and-worker)
17. [Memoization vs Caching](#17-memoization-vs-caching)
18. [Password Hashing and Security](#18-password-hashing-and-security)
19. [HTTP Methods](#19-http-methods)
20. [Search Implementation](#20-search-implementation)
21. [Export and Reports (CSV and PDF)](#21-export-and-reports-csv-and-pdf)
22. [SPA and Lazy Loading](#22-spa-and-lazy-loading)
23. [AJAX, Axios and Async](#23-ajax-axios-and-async)
24. [localStorage vs sessionStorage vs Cookies](#24-localstorage-vs-sessionstorage-vs-cookies)
25. [SQL Concepts](#25-sql-concepts)
26. [Changing the Database from SQLite](#26-changing-the-database-from-sqlite)
27. [Virtual Environment](#27-virtual-environment)
28. [Miscellaneous Theory](#28-miscellaneous-theory)
29. [Previously Asked Proctor Questions](#29-previously-asked-proctor-questions)
30. [Common Code-Change Tasks to Practice](#30-common-code-change-tasks-to-practice)

---

## 1. Project Overview and Architecture

### Q: Explain your project.
This is TrekStar, a Trekking Management Application built for MAD 2. It has three roles: admin, staff (trek guides), and trekker (customer). The admin creates treks, approves them, assigns a staff guide, manages users and staff, and pulls monthly PDF reports. The assigned staff moves a trek through its lifecycle (Approved to Open to Closed to Completed) and views participants. The trekker browses open treks, books slots after confirming payment, cancels, and exports their booking history as CSV.
→ Code: roles as a `role` column `backend/models.py` line 12; blueprints per role `backend/app.py` lines 22-25.

### Q: What is the architecture?
It is a decoupled REST API plus SPA, which maps onto MVC. The Models are the SQLAlchemy classes, the Controllers are the Flask blueprint route handlers, and the Views are the Vue components. It is not textbook server side MVC, but the separation is clean.
→ Code: models `backend/models.py` lines 5-78; controllers `backend/api/` (auth, admin, staffs, users); views `frontend/src/views/`.

### Q: Technology stack?
Frontend: Vue 3 (Options API), vue-router 4, Pinia, axios, built with Vite. Backend: Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-Caching, Flask-Mail. Database: SQLite via SQLAlchemy. Caching plus Celery broker plus OTP storage: Redis. Background jobs: Celery with Celery Beat. PDF: xhtml2pdf.
→ Code: backend extensions `backend/extensions.py` lines 9-14; frontend deps `frontend/package.json`.

### Q: What is MVC?
A pattern that splits an app into Model (data logic, my SQLAlchemy models), View (the UI, my Vue components), and Controller (handles requests and mediates, my Flask routes).
→ Code: `backend/models.py`, `frontend/src/views/`, `backend/api/`.

---

## 2. Vue Core Concepts

### Q: What is Vue.js?
A progressive JavaScript framework for building user interfaces. Progressive means you can adopt it incrementally. It is component based, reactive (the UI updates when data changes), and declarative (I describe what I want with `v-if`/`v-for` and Vue updates the DOM). I used Vue 3.
→ Code: app bootstrap `frontend/src/main.js` lines 6-11; components `frontend/src/views/`.

### Q: What is a reactive framework?
The UI automatically re-renders when the data it depends on changes; I do not touch the DOM by hand. Vue 3 tracks this with JavaScript Proxies. For example my trekker treks page keeps a reactive `treks` array in `data()`, and the table re-renders whenever it changes.
→ Code: reactive state `frontend/src/views/trekkers/Treks.vue` lines 115-127, rendered in the same file's template.

### Q: What is the Virtual DOM?
An in-memory JavaScript representation of the real DOM. When data changes Vue re-renders the virtual tree, diffs it against the old one, and patches only the changed real DOM nodes, which is faster than rebuilding everything.
→ Code: framework internal, no project code. Reactive state driving it: `frontend/src/views/trekkers/Treks.vue` lines 115-127.

### Q: Why Vue and not React?
The course taught Vue, it has a gentler learning curve, single file components keep template, script and style together, and its reactivity and router and store are official rather than third party. React is also excellent, this was a course and comfort choice.
→ Code: SFCs under `frontend/src/views/`.

### Q: What are Vue components?
Self contained reusable UI units. In my project they are `.vue` single file components with a `<template>`, a `<script>` and sometimes inline styles. Examples are the role dashboards and the treks and bookings pages.
→ Code: e.g. `frontend/src/views/trekkers/TrekkerDashboard.vue`, `frontend/src/views/trekkers/Treks.vue`, `frontend/src/views/trekkers/MyBookings.vue`.

### Q: How does your navbar / header appear on every page?
There is no separate NavBar component; the shared header lives directly in my root `App.vue`, and every page renders inside its `<router-view>`. So the header, the session timer and the footer are declared once and appear on every route. This is the Vue equivalent of Jinja2 template inheritance.
→ Code: header `frontend/src/App.vue` lines 8-16; `<router-view>` line 26.

---

## 3. Vue Lifecycle Hooks

### Q: What are lifecycle hooks and which did you use?
Methods Vue calls at stages of a component's life: `created`, `mounted`, `updated`, `beforeUnmount`, `unmounted`. Honest answer for my project: I mostly use `mounted()` to fetch initial data, and `beforeUnmount()` to clean up. My dashboards call their stats API in `mounted`, and `App.vue` starts the session timer in `mounted` and clears it in `beforeUnmount`.
→ Code: `frontend/src/views/trekkers/TrekkerDashboard.vue` lines 70-71 (`mounted` calling `fetchStats`); `frontend/src/App.vue` lines 52-54 (mounted) and 55-57 (beforeUnmount).

### Q: Difference between created and mounted?
`created` runs when data and methods exist but the component is not in the DOM yet, good for API calls that do not need the DOM. `mounted` runs after the component is inserted into the DOM, needed when you touch real DOM elements or third party widgets. Honest: I use `mounted` for my fetches; I did not need `created` because I have no pre-DOM work and no DOM-dependent library setup.
→ Code: `mounted` fetch `frontend/src/views/trekkers/MyBookings.vue` line 86.

---

## 4. Vue Directives

### Q: What directives did you use?
`v-if`/`v-else` to conditionally render, `v-for` for lists, `v-model` for two way form binding, `v-bind` (`:`) to bind attributes one way, and `v-on` (`@`) for events.
→ Code: all visible in `frontend/src/views/trekkers/Treks.vue` (`v-if` line 35, `v-for` line 89, `v-model` line 13, `:max` v-bind line 56, `@click` line 62).

### Q: Difference between v-if and v-show?
`v-if` adds or removes the element from the DOM, so it does not exist when false, better when the condition rarely changes. `v-show` keeps the element in the DOM and only toggles CSS `display`, better for frequent toggles. My code uses `v-if` (for example to switch between the booking form and the list).
→ Code: `v-if="bookingTrek"` `frontend/src/views/trekkers/Treks.vue` line 35. I do not use `v-show` in this project; conceptual.

### Q: Show me a v-for.
Each trek row is a `v-for` with a `:key`.
→ Code: `frontend/src/views/trekkers/Treks.vue` line 89 (`v-for="t in treks" :key="t.id"`); also `frontend/src/views/trekkers/MyBookings.vue` line 50.

### Q: What is v-cloak?
A directive that stays on an element until Vue finishes compiling, and with a CSS rule `[v-cloak]{display:none}` it hides raw `{{ }}` mustache text from flashing before Vue loads. Honest: I do not use `v-cloak` because Vite mounts the compiled app fast enough that there is no flash.
→ Code: none in project; conceptual.

### Q: Difference between v-bind and v-model?
`v-bind` (`:`) is one way, it pushes a value from data into an attribute. `v-model` is two way, it binds an input to data and updates the data when the user types. `v-model` is really `:value` plus an `@input`.
→ Code: `v-model` `frontend/src/views/trekkers/Treks.vue` line 13; `v-bind` `:max` line 56.

---

## 5. Data Binding and Watch

### Q: Explain how watch works and where you used it.
A watcher runs a side effect when a specific reactive value changes, good for firing an action like an API call in response to a change. Honest answer for my project: I do not use a declared `watch` block. I get the same effect with event handlers, for example the trek filters call `fetchTreks` on `@input`/`@change`. I understand `watch` and can convert those handlers into one if asked, but I want to be accurate that there is no `watch` in my code.
→ Code: the handler approach `frontend/src/views/trekkers/Treks.vue` line 13 (`@input="fetchTreks"`).

### Q: What are computed properties, and how do they differ from watch?
A computed property is a derived, cached value that recalculates only when its dependencies change, good for a displayed value. A watcher runs a side effect, no return value, every time the watched value changes. Honest: I lean on methods and event handlers rather than computed or watch in most components, though computed is the right tool for a derived display value and I can write one on the spot.
→ Code: methods-based approach `frontend/src/views/trekkers/Treks.vue` lines 128 onward.

---

## 6. Vue Router

### Q: How does routing work?
vue-router maps URL paths to components and renders the match into `<router-view>` without a full page reload. My route table has the public pages and the three role dashboards, each with `meta` marking the required auth and role.
→ Code: routes `frontend/src/router/index.js` lines 11-30 (meta lines 18, 23, 28); router created lines 32-35.

### Q: Explain your navigation guard.
A global `router.beforeEach` guard: if a route needs auth and the user is not logged in it redirects to login; if the route needs a specific role that does not match, it bounces them to their own dashboard; and it keeps a logged-in user away from login/register. I always stress this is only UX, the backend enforces the real role check.
→ Code: `frontend/src/router/index.js` lines 37-60 (auth check line 41, role check line 43).

### Q: What are router-link and router-view?
`router-link` is the navigation element, it renders an anchor and changes the route client side. `router-view` is the placeholder where the matched component renders. My logo is a `router-link` and my whole app renders in the one `router-view` in `App.vue`.
→ Code: `router-link` `frontend/src/App.vue` line 8; `router-view` line 26.

### Q: What is $route and $router?
`$route` (with an e) is the current route object holding path, params and query. `$router` (with an r) is the router instance you call methods on to navigate, like `push`. I read `$route.path` in `App.vue` and I call `router.push(...)` in my store after login and logout.
→ Code: `$route.path` `frontend/src/App.vue` line 9; `router.push(...)` `frontend/src/store/auth.js` lines 30-32 and 41.

### Q: What history mode do you use?
`createWebHistory`, which uses the HTML5 History API for clean URLs without a hash.
→ Code: `frontend/src/router/index.js` lines 32-35.

### Q: Can you access the server without a browser and URL?
Yes. Postman or Thunder Client for a GUI, `curl` from the command line, or Python's `requests`. For example I would POST to `/auth/login`, copy the token, then send it as an `Authorization: Bearer` header to a protected route.
→ Code: login to hit `backend/api/auth.py` lines 41-70; protected route `backend/api/admin.py` lines 55-65.

---

## 7. State Management with Pinia

### Q: What state management did you use? Vuex or Pinia?
Pinia, which is the current official store for Vue 3. Honest note if the examiner expects Vuex: Pinia is the modern replacement, simpler with no mutation boilerplate, so for a new Vue 3 app it was the natural pick. My `auth` store holds the token, role, full name and the session timer.
→ Code: `frontend/src/store/auth.js` lines 7-15 (state and getter).

### Q: Explain your store.
The state reads the token, role and name from localStorage on start so a refresh keeps you logged in. There is a getter `isLoggedIn`. The `login` action posts to the API, saves the token and role and name, starts the session timer, and redirects by role. The `logout` action clears everything and returns to login. `startTimer` decodes the token expiry and counts down.
→ Code: state `frontend/src/store/auth.js` lines 7-12; `isLoggedIn` line 15; `login` lines 18-32; `logout` lines 34-42; `startTimer` lines 43-73.

### Q: Pinia vs Vuex, the difference?
Vuex needed state, mutations, actions and getters as separate concepts, and mutations had to be synchronous. Pinia drops the mutations layer: you mutate state directly inside actions, actions can be async, and it has better TypeScript and Composition API support. Same purpose, less ceremony.
→ Code: direct state mutation inside an async action `frontend/src/store/auth.js` lines 18-28.

### Q: What is state management and its advantage?
A central store for data that many components share, instead of prop drilling. In my app the auth info (logged in, role, name, session timer) is needed by the header, the router guard and every dashboard, so one store is a single reactive source of truth.
→ Code: consumed in `frontend/src/router/index.js` line 41 and `frontend/src/App.vue` line 14.

### Q: Difference between the store and localStorage?
The Pinia store is reactive, components re-render when it changes, but it resets on a hard refresh. localStorage persists across refreshes but is not reactive. I use both: localStorage to survive refresh, and I re-hydrate the store from it on load.
→ Code: hydrate from localStorage `frontend/src/store/auth.js` lines 8-10; write on login lines 24-26.

---

## 8. Vite Build Tooling vs CDN

### Q: Did you use a build tool or the CDN? Why?
I used a build tool, Vite. The CDN approach is a `<script>` tag, quick for a prototype but with no build step and no single file components. Vite gives real `.vue` components, hot reload in development, and a bundled minified production build. I needed SFCs, routing and a store, which the CDN cannot give cleanly.
→ Code: `frontend/vite.config.js`; scripts `frontend/package.json` (`dev`, `build`).

### Q: What is Vite and what is npm?
Vite is the dev server and build tool with hot module replacement. npm is the package manager that installs my dependencies from `package.json`. `npm install` then `npm run dev` starts it.
→ Code: `frontend/package.json` (dependencies and scripts).

---

## 9. Components, Props and Slots

### Q: What are props?
Props pass data one way from a parent to a child component. Honest note: most of my views are self contained pages that pull their own data, so I do not pass many props; where I need cross component data like the auth info I read it from the Pinia store instead.
→ Code: store read instead of props `frontend/src/views/trekkers/TrekkerDashboard.vue` lines 60-63.

### Q: How do you pass data from child to parent?
With `$emit`: the child fires a named event and the parent listens with `@`. My trekker dashboard renders `<Treks @booking-made="fetchStats" />`, and the child `Treks` declares `emits: ['booking-made']` and emits it after a successful booking so the parent refreshes its stats.
→ Code: parent listener `frontend/src/views/trekkers/TrekkerDashboard.vue` line 43; child declaration `frontend/src/views/trekkers/Treks.vue` line 114 and emit line 164.

### Q: What are slots?
Slots let a parent inject template content into a child component (content projection). Honest: my components are self contained and I did not build slot based reusable components, so there are no slots in my project, but I understand them as a placeholder in the child that the parent fills.
→ Code: none in project; conceptual.

### Q: Why do you have so many Vue files?
I split each page into its own `.vue` file so each has one responsibility, which keeps the code maintainable and debuggable. The views are grouped by role under `admin/`, `staffs/` and `trekkers/`.
→ Code: `frontend/src/views/` (role subfolders).

---

## 10. Frontend Authentication and Token Flow

### Q: How does authentication work?
JWT token based auth. The user logs in, the backend returns a signed token carrying the user id and role, the frontend saves it, and every request sends it as an `Authorization: Bearer` header. Protected routes verify the token.

Step 1, the login call goes through the store.
→ Code: `frontend/src/views/Login.vue` line 146 (`this.authStore.login(this.form)`); store `frontend/src/store/auth.js` lines 18-19.

Step 2, the axios request interceptor attaches the token automatically from localStorage.
→ Code: `frontend/src/services/api.js` lines 7-16 (token read line 9, Bearer header line 11).

Step 3, the response interceptor logs the user out on a 401.
→ Code: `frontend/src/services/api.js` lines 18-27 (401 handling line 21).

Step 4, the backend creates the JWT with the role as a claim.
→ Code: `backend/api/auth.py` lines 60-64 (role claim line 62).

Step 5, protected routes require a valid token and then check the role.
→ Code: `@jwt_required()` `backend/api/admin.py` line 19; role check `verify_admin()` lines 12-16.

### Q: Where is the token stored?
In the browser's localStorage, written on login and read back on page load. The server keeps nothing.
→ Code: write `frontend/src/store/auth.js` lines 24-26; read on start lines 8-10.

### Q: In the network tab the password is visible in the payload, how do you hide it?
The payload is only visible to the user in their own dev tools, which is normal. What protects it on the wire is HTTPS/TLS, so a network sniffer sees only ciphertext. And I never store or log the plaintext, it is hashed immediately on the server. The password input is also masked with `type="password"`.
→ Code: masked input `frontend/src/views/Login.vue` line 20; server-side hashing `backend/models.py` line 24. TLS is deployment level.

---

## 11. CORS and Security

### Q: What is CORS and why did you enable it?
CORS is the browser rule blocking a page on one origin from calling an API on another unless the API allows it. My frontend runs on `localhost:5173` and the API on `127.0.0.1:5000`, different origins, so I enabled CORS for all origins. Honest: `"*"` is fine for a demo but I would restrict it to my real domain in production.
→ Code: `backend/app.py` line 20 (`CORS(app, resources={r"/*": {"origins": "*"}})`).

### Q: What is CSRF? Are you protected?
CSRF tricks a logged-in browser into sending a request using cookies it sends automatically. My app is not really exposed because I do not use cookie sessions; the JWT is in localStorage and attached manually by my axios interceptor, so a forged cross-site request carries no token. The tradeoff is that localStorage is exposed to XSS instead.
→ Code: manual token attach `frontend/src/services/api.js` lines 7-16.

### Q: What is a man in the middle attack?
Someone intercepting traffic between client and server, potentially reading or altering it. The defence is TLS, which encrypts the channel so the interceptor sees only ciphertext.
→ Code: TLS is deployment level; no app code.

### Q: What is SQL injection? Are you protected?
Injecting SQL through inputs to manipulate queries. I am protected because I use SQLAlchemy's ORM with parameterised queries everywhere, for example the `ilike` search binds the value as a parameter rather than concatenating raw SQL.
→ Code: parameterised search `backend/api/admin.py` line 104 (`Trek.name.ilike(f'%{search}%')`).

### Q: What is XSS?
Injecting script that runs in another user's browser. Vue escapes `{{ }}` interpolation by default, and I do not use `v-html` on untrusted data, so script does not execute.
→ Code: framework default escaping; no `v-html` on untrusted data in project.

---

## 12. Database Models and SQLAlchemy

### Q: What is an ORM and what is SQLAlchemy?
An ORM maps Python classes to database tables so I write Python instead of raw SQL. SQLAlchemy is Python's ORM and Flask-SQLAlchemy is the Flask integration. Benefits: less boilerplate, database portability, and safety from injection because queries are parameterised.
→ Code: `db` object `backend/extensions.py` line 9; a query `backend/api/users.py` line 42.

### Q: Explain your database models.
Four tables in `backend/models.py`. `User` holds everyone with a `role` column plus `is_active` and `is_blacklisted`. `Trek` has name, location, difficulty, slots, price, dates, a `status` lifecycle field and an `assigned_staff_id` foreign key to User. `Booking` links a user to a trek with `num_slots`, `status` and `payment_status`. `StaffProfile` is a one to one extension of a staff User.
→ Code: `backend/models.py` lines 5-27 (User), 30-49 (Trek), 52-64 (Booking), 67-78 (StaffProfile).

### Q: Explain your relationships.
I use `db.relationship` with `back_populates` on both sides: `User.bookings`/`Booking.user`, `Trek.bookings`/`Booking.trek`, `User.assigned_treks`/`Trek.assigned_staff` (with explicit `foreign_keys` because staff link to User), and `User.staff_profile` with `uselist=False` for one to one.
→ Code: `backend/models.py` lines 19-21 (User side), 48-49 (Trek side), 63-64 (Booking side).

### Q: What does uselist=False do?
It tells SQLAlchemy the relationship is one to one, so the attribute returns a single object instead of a list. I use it on `User.staff_profile` because a staff user has exactly one profile.
→ Code: `backend/models.py` line 21.

### Q: backref vs back_populates?
`backref` creates the reverse attribute automatically from one declaration. `back_populates` is the explicit form where you declare the relationship on both sides. Honest and precise: my code uses `back_populates`, not `backref`, so both sides are spelled out.
→ Code: matched pair `backend/models.py` line 19 (`User.bookings`) and line 63 (`Booking.user`).

### Q: What is lazy loading vs eager loading, and the N+1 problem?
Lazy loading (the default) queries a relationship only when first accessed; eager loading fetches it up front with `joinedload`. N+1 is looping over N parents and firing one query per child access. Honest: I do not use `joinedload`, so my admin bookings loop that reads `b.user.full_name` and `b.trek.name` can cause extra queries per row; fine at this scale, and I know the fix.
→ Code: N+1-prone loop `backend/api/admin.py` lines 411-428 (line 420, 422).

### Q: What is cascade / on delete cascade?
`cascade="all, delete-orphan"` means deleting a parent deletes its children and any orphaned child is deleted too, so no rows point at a missing parent. Unlike a manual approach, I set this on the relationships themselves, so deleting a user removes their bookings and deleting a trek removes its bookings automatically.
→ Code: `backend/models.py` line 19 (`User.bookings`), line 21 (`staff_profile`), line 49 (`Trek.bookings`).

### Q: Primary key and foreign key?
A primary key uniquely identifies a row (my `id` columns, auto indexed). A foreign key references another table's primary key (for example `Booking.user_id` to `users.id`) and enforces referential integrity.
→ Code: primary keys `backend/models.py` lines 8, 33, 55, 70; foreign keys lines 40, 56, 57, 71.

### Q: What about indexing?
Primary keys are indexed automatically and `User.email` has `unique=True` which creates a unique index. Honest: my `ilike` searches on name and location are not indexed, so they full scan; at this scale it is fine, and to speed search I would add `index=True` on those columns.
→ Code: unique index `backend/models.py` line 10; unindexed search `backend/api/admin.py` line 104.

### Q: Do you have __repr__ on your models?
Honest: no, I did not add `__repr__` methods. `__repr__` would define the developer-facing string of an object for debugging. I can add one easily, but I want to be accurate that my models do not have it.
→ Code: `backend/models.py` (no `__repr__` defined).

---

## 13. Backend Flask and APIs

### Q: What is Flask?
A micro web framework for Python. Micro means it gives the essentials (routing, request/response) and lets me pick the rest as extensions. It is open source, and it scales fine with structure; I use the blueprint pattern to organise it.
→ Code: app factory `backend/app.py` lines 11-60.

### Q: What is jsonify vs json.dumps?
`jsonify` serialises a dict to JSON, sets the `Content-Type: application/json` header, and returns a proper Response. `json.dumps` just gives a string with no headers. I use `jsonify` everywhere.
→ Code: e.g. `backend/api/admin.py` line 455.

### Q: What does @app.route do, and what is a decorator?
A decorator wraps a function to add behaviour without changing its code. `@blueprint.route(...)` registers a URL and method. `@jwt_required()` rejects a request with no valid token before my view runs. `@cache.cached(...)` serves a cached response. `@celery.task` makes a function queueable.
→ Code: stacked decorators `backend/api/admin.py` lines 93-96 (route + jwt + cache).

### Q: What is a Blueprint?
Flask's way to group related routes into a module instead of one giant file. I have four: `auth_bp` (`/auth`), `admin_bp` (`/admin`), `staff_bp` (`/staff`), `user_bp` (`/trekker`), registered in the factory.
→ Code: registration `backend/app.py` lines 22-25; a blueprint declared `backend/api/auth.py` line 9.

### Q: What status codes does your API return?
200 OK, 201 created (register, new trek, new booking), 202 accepted for async report/export requests returning a task id, 400 bad input, 401 bad login or no auth, 403 wrong role, 404 not found, 409 duplicate email, 500 server error.
→ Code: 201 `backend/api/auth.py` line 38; 401 lines 51/54; 403 `backend/api/admin.py` line 15; 202 line 455; 409 line 293.

---

## 14. RBAC Implementation

### Q: How did you implement RBAC?
At two layers. The role is a claim inside the JWT, set at login. On the backend each blueprint has a small helper function (not a decorator) that reads the role claim and returns 403 if it is wrong, and I call it at the top of each protected route. On the frontend the router guard checks the route's `meta.role`, but that is only UX.

Honest note versus a lot of sample answers: mine are plain helper functions called inside the handler, not custom `@wraps` decorators. They do the same job.
→ Code: role claim `backend/api/auth.py` line 62; helpers `backend/api/admin.py` lines 12-16, `backend/api/staffs.py` lines 11-15, `backend/api/users.py` lines 10-14; frontend guard `frontend/src/router/index.js` line 43.

### Q: Even if a trekker types /admin in the URL, why can't they get in?
The frontend guard bounces them to their own dashboard, and even if they bypassed the frontend entirely and called the admin API directly, the backend reads the role from the verified token claim and returns 403. They cannot forge an admin token without the secret key.
→ Code: guard `frontend/src/router/index.js` lines 43-47; backend check `backend/api/admin.py` lines 12-16.

### Q: Authentication vs authorisation?
Authentication is proving who you are, the password check at login. Authorisation is what you are allowed to do, the per route role check on every protected endpoint.
→ Code: authentication `backend/api/auth.py` line 53; authorisation `backend/api/admin.py` lines 12-16.

---

## 15. Redis and Caching

### Q: What is Redis and why use it over a normal database?
Redis is an in-memory key value store, so reads and writes are very fast because they hit RAM not disk. I use it for three things: the Flask-Caching backend, the Celery broker and result backend, and OTP storage with automatic expiry. For frequently read data like the trek listings, caching avoids hammering SQLite.
→ Code: cache config `backend/config.py` lines 19-21; celery lines 16-17; OTP line 22 and client `backend/extensions.py` line 14.

### Q: Where did you implement caching and how do you invalidate it?
I cache the trek listing endpoints with `@cache.cached(timeout=60, query_string=True)` backed by Redis. After any create, update or delete of a trek I call `cache.clear()` so stale data is never served. `query_string=True` gives a separate cache entry per set of query parameters (like search or difficulty).
→ Code: cache decorator `backend/api/admin.py` line 95; invalidation `cache.clear()` line 145 (and 165, 198, 230, 251); trekker cache `backend/api/users.py` line 33; staff cache with a custom key `backend/api/staffs.py` lines 46-51.

### Q: What is cache invalidation and why is it hard?
Deciding when cached data is stale and removing it. Too little and you serve stale data, too much and you lose the benefit. My approach is a short 60 second TTL plus explicit `cache.clear()` on writes. Honest tradeoff: `cache.clear()` wipes the whole cache, not just the affected key, which is blunt; a surgical `cache.delete(key)` would be better but clear is simple and correct.
→ Code: TTL `backend/api/admin.py` line 95; clear line 145.

### Q: Where is the cache stored?
In Redis memory, keyed by the request path and query string, so it is shared across processes and fast, and it is not in SQLite or the Flask process.
→ Code: cache decorator `backend/api/admin.py` line 95; Redis URL `backend/config.py` line 20.

### Q: Redis vs Memcached?
Both are in-memory stores. Memcached is simpler, strings only, pure caching. Redis has rich data types, optional persistence, pub/sub, and can be a message broker. I chose Redis because it serves three jobs at once (cache, Celery broker, OTP with `setex`), which Memcached could not.
→ Code: three Redis roles `backend/config.py` lines 16-22.

### Q: cache.cached vs cache.memoize?
`cache.cached` caches a route's response keyed on the request path. `cache.memoize` caches a function's result keyed on its arguments. I use `cached`, not `memoize`.
→ Code: `backend/api/admin.py` line 95.

---

## 16. Celery Tasks, Beat and Worker

### Q: What is Celery and its components?
A distributed task queue for running work outside the request-response cycle. Components: the client (my app calling `.delay()`), the broker (Redis holding the queue), the worker (the process that runs tasks), the result backend (Redis storing state and return values), and Celery Beat (the scheduler for periodic tasks).
→ Code: config wiring `backend/app.py` lines 27-31; broker/backend `backend/config.py` lines 16-17; beat `backend/celery_worker.py` lines 9-22; tasks `backend/tasks.py`.

### Q: What is the ContextTask in app.py?
Celery workers run outside a Flask request, so I subclass the Celery task to run each task inside `app.app_context()`, which is what lets tasks use `db` and `mail`.
→ Code: `backend/app.py` lines 33-37.

### Q: What Celery tasks did you implement?
In `backend/tasks.py`: `generate_admin_report_task` and `generate_staff_report_task` (monthly PDF via xhtml2pdf), `export_trekker_history_task` (CSV), the email tasks `send_pdf_email_task` / `send_csv_email_task` / `send_otp_email`, and the scheduled `daily_trek_reminders`, `monthly_admin_report`, `cleanup_old_exports`. Honest note: I register tasks with `@celery.task` and call them with `.delay(...)`, not `@shared_task`/`send_task`.
→ Code: `backend/tasks.py` lines 175-177, 346-347, 350-382, 384-400, 402-418, 477-486, 420-439, 441-454, 456-475.

### Q: Explain Celery Beat and the crontab schedule.
Beat is the scheduler that fires periodic tasks. I set three: daily reminders at 6am, the monthly admin report at 9am on the 1st, and export cleanup at midnight. I use `crontab(...)` expressions. A crontab is minute, hour, day-of-month, month, day-of-week; unset fields default to every.
→ Code: `backend/celery_worker.py` lines 9-22 (daily line 12, monthly line 16, cleanup line 20).

### Q: Does crontab take seconds?
No, crontab granularity is minutes. For something every 10 seconds I would use a float schedule (`'schedule': 10.0`) in Beat instead of `crontab`.
→ Code: current crontab `backend/celery_worker.py` line 12.

### Q: Celery Beat vs Celery Worker?
Beat only schedules, submitting tasks into the queue on a timer; it does not run them. The worker pulls tasks from the queue and executes them, and workers can be scaled horizontally. Scheduled tasks need both running; triggered tasks like the CSV export need only the worker.
→ Code: beat `backend/celery_worker.py` lines 9-22; workers run `backend/tasks.py`; start commands in `README.md`.

### Q: Walk through a report end to end.
Admin POSTs `/admin/reports`. It validates and calls `generate_admin_report_task.delay(...)`, returns 202 and a task id. The worker queries completed treks for that month, computes participants, revenue and the top five, renders HTML, converts it with xhtml2pdf's `pisa.CreatePDF`, saves under `backend/exports/`, and returns the path. The frontend polls status then downloads or emails.
→ Code: request `backend/api/admin.py` lines 430-455 (`.delay` line 454); builder `backend/tasks.py` lines 13-173 (`pisa.CreatePDF` line 163); download `backend/api/admin.py` lines 472-490.

---

## 17. Memoization vs Caching

### Q: What is memoization?
Storing a function's result for a given set of arguments so the next call with the same arguments returns the cached result instead of recomputing. Classic example is caching Fibonacci results in a dict.
→ Code: conceptual; Flask-Caching's `@cache.memoize()` would do this, but I use `@cache.cached` (`backend/api/admin.py` line 95).

### Q: Difference between memoization and caching?
Memoization is caching a function's return value keyed by its arguments, usually in memory within one process. Caching is the broader idea and can be shared and distributed like my Redis cache, and time limited. Memoization is a type of caching, but not all caching is memoization.
→ Code: my request-level Redis caching `backend/api/admin.py` line 95.

---

## 18. Password Hashing and Security

### Q: How did you implement password hashing?
With Werkzeug's `generate_password_hash` and `check_password_hash`, wrapped in `set_password`/`check_password` on the User model. Honest correction to a common answer: this project uses Werkzeug (PBKDF2 with SHA256 and a random salt by default), not Flask-Bcrypt. Hashing is one way, so at login I hash the input and compare.
→ Code: `backend/models.py` lines 23-27; used at login `backend/api/auth.py` line 53.

### Q: Are passwords hashed or encrypted? Can the hash be reversed?
Hashed, not encrypted. A hash is one way, so I cannot get the original password back, which is correct for passwords; encryption would be reversible and wrong here.
→ Code: `backend/models.py` line 24.

### Q: What is a salt and a rainbow table?
A salt is a random value mixed into each password before hashing so identical passwords get different hashes. A rainbow table is a precomputed hash-to-plaintext lookup for common passwords; salting defeats it because the attacker would need a separate table per salt. Werkzeug adds the salt automatically.
→ Code: salting inside `generate_password_hash`, called at `backend/models.py` line 24.

### Q: What hashing algorithms do you know?
MD5 and SHA-1 are deprecated. SHA-256/512 are good for data integrity but too fast for passwords. For passwords you want slow, salted functions: PBKDF2 (what Werkzeug uses here), bcrypt, and Argon2 (modern best practice).
→ Code: Werkzeug PBKDF2 in use `backend/models.py` line 24.

---

## 19. HTTP Methods

### Q: Explain HTTP methods and where you used them.
GET reads, POST creates, PUT updates, PATCH partially updates, DELETE removes. In my app POST `/admin/treks` creates, GET reads, PUT `/admin/treks/<id>` updates, DELETE removes. Honest note: my PUT handlers only overwrite the fields present in the body, so they behave PATCH-like.
→ Code: POST + GET `backend/api/admin.py` lines 93-149; PUT/DELETE lines 151-201 (partial update around 174-195).

### Q: Difference between PUT and PATCH?
PUT is meant to replace the whole resource and is idempotent; PATCH updates only the provided fields. Mine are declared PUT but behave like PATCH because I keep the existing value when a field is missing.
→ Code: `backend/api/admin.py` lines 174-195.

### Q: Is POST idempotent?
No. POST is the non-idempotent one, sending it twice creates two resources. GET, PUT and DELETE are idempotent. In my booking flow I even block a duplicate booking, but the method itself is not idempotent.
→ Code: duplicate-booking guard `backend/api/users.py` line 107.

---

## 20. Search Implementation

### Q: How did you implement search?
On the backend with SQLAlchemy's case-insensitive `ilike`, and the search term comes from the frontend as a query parameter. The admin and staff trek searches use `ilike` on the name; the trekker treks search filters in Python over the open treks.
→ Code: admin `ilike` `backend/api/admin.py` line 104; staff `ilike` line 267; trekker filter `backend/api/users.py` line 51.

### Q: What is ilike vs like?
`like` is case-sensitive pattern matching, `ilike` is case-insensitive, the database-agnostic SQLAlchemy way. `%search%` means "contains search anywhere", where `%` is a wildcard.
→ Code: `backend/api/admin.py` line 104.

### Q: How does the frontend trigger search?
The search input is bound with `v-model` and calls the fetch method on `@input`, which sends the term as a query parameter.
→ Code: `frontend/src/views/trekkers/Treks.vue` line 13 (`v-model="search" @input="fetchTreks"`).

---

## 21. Export and Reports (CSV and PDF)

### Q: How did you implement the CSV export? Why not let the user pick where to save?
The trekker export is an asynchronous Celery task that builds a CSV of their booking history and can email it or be downloaded. It is async because building it can be slow, so the request returns 202 immediately and the work happens in the background. The user does not pick a save path because that is a browser feature; the backend cannot control the user's filesystem, so I return the file with `send_file` for the browser's own save dialog, or email it.
→ Code: trigger `backend/api/users.py` lines 192-199 (`.delay` line 198, 202 status); task `backend/tasks.py` lines 350-382 (`csv.writer` line 361); download `backend/api/users.py` lines 216-234 (`send_file` line 226).

### Q: How do the PDF reports work?
The admin and staff can request a monthly PDF report. The endpoint queues a Celery task that queries the completed treks for the month, computes participants, revenue and the top five, renders an HTML template, and converts it to PDF with xhtml2pdf. The admin monthly report also runs automatically via Celery Beat.
→ Code: builder `backend/tasks.py` lines 13-173 (`pisa.CreatePDF` line 163); scheduled `backend/celery_worker.py` lines 14-17.

### Q: What library did you use for the CSV and the PDF?
CSV uses Python's standard `csv` module; the PDF uses xhtml2pdf (`pisa`) to convert an HTML string to PDF.
→ Code: `import csv` and `csv.writer` `backend/tasks.py` line 361; `pisa.CreatePDF` line 163.

### Q: How is email sent?
Flask-Mail over SMTP, configured from `.env`. The email tasks build a `Message`, attach the file, and call `mail.send`, all inside a Celery task so the request does not block on SMTP.
→ Code: config `backend/config.py` lines 23-28; send `backend/tasks.py` line 396 (attach line 395).

---

## 22. SPA and Lazy Loading

### Q: What is an SPA?
A single page application loads one HTML shell and then swaps views with JavaScript, no full page reloads. vue-router intercepts navigation and renders the matching component. My app is an SPA.
→ Code: routing `frontend/src/router/index.js` lines 11-35.

### Q: What is lazy loading and did you implement it?
Lazy loading downloads a route's JavaScript only when the user navigates there, by importing the component as a function `() => import(...)`, which shrinks the initial bundle. Honest answer: I did not implement it; my router imports the dashboard components eagerly at the top of `router/index.js`. The app is small so it did not matter, and I know the one-line change to enable it.
→ Code: eager imports `frontend/src/router/index.js` lines 4-9.

### Q: SPA vs multi-page app?
An SPA serves one `index.html` and navigates with JavaScript, smooth with no reload flash. A multi-page app loads a fresh server page per route. Mine is an SPA.
→ Code: single mount point `frontend/src/main.js` line 11.

---

## 23. AJAX, Axios and Async

### Q: What is AJAX?
A technique for making HTTP requests from the browser without reloading the page and updating part of the UI with the response, using JSON today. Every axios call in my app is AJAX.
→ Code: axios calls e.g. `frontend/src/store/auth.js` line 19.

### Q: Axios vs fetch, and why axios?
`fetch` is the built-in Promise-based API but needs an extra `.json()` step and does not reject on 4xx/5xx. axios auto-parses JSON, rejects on error codes, and supports interceptors. I use axios for the interceptors that attach the token and handle 401 globally in one place.
→ Code: `frontend/src/services/api.js` lines 3-27.

### Q: What is async/await and what does an async function return?
`async/await` is syntax over Promises that reads sequentially. An `async` function always returns a Promise, and `await` pauses until the Promise settles. My store's login is `async` and awaits the axios call.
→ Code: `frontend/src/store/auth.js` lines 18-19 (`async login` + `await API.post`); another `async fetchStats` `frontend/src/views/trekkers/TrekkerDashboard.vue` line 74.

---

## 24. localStorage vs sessionStorage vs Cookies

### Q: Difference between localStorage, sessionStorage and cookies?
localStorage persists until cleared, even across restarts, and is not sent automatically. sessionStorage is the same API but clears when the tab closes. Cookies are sent to the server automatically on every request and can be marked HttpOnly so JS cannot read them.
→ Code: localStorage use `frontend/src/store/auth.js` lines 8-10, 24-26, 40.

### Q: Why localStorage over cookies here?
So the API can stay stateless, no server session store, which suits a separate SPA and easy horizontal scaling. Because localStorage is not sent automatically, I also avoid CSRF; the tradeoff is XSS exposure, which I mitigate with Vue's default escaping.
→ Code: token attached manually `frontend/src/services/api.js` line 11.

### Q: What happens on logout?
The store clears the token, role and name from state and localStorage and redirects to login, and it also stops the session timer.
→ Code: `frontend/src/store/auth.js` lines 34-42 (`localStorage.clear()` line 40).

---

## 25. SQL Concepts

### Q: SQL aggregate functions?
Functions that summarise many rows into one value: COUNT, SUM, AVG, MAX, MIN. My admin dashboard uses `.count()` for totals, and my staff dashboard uses `func.sum(Booking.num_slots)` to total participants.
→ Code: counts `backend/api/admin.py` lines 61-64; SUM `backend/api/staffs.py` line 33.

### Q: What are JOINs?
JOINs combine rows from tables on a related column: INNER (only matches), LEFT (all left plus matches), RIGHT, and FULL OUTER. My relationships do joins implicitly, and my participant count is a filtered aggregate over bookings joined to a trek.
→ Code: filtered aggregate `backend/api/staffs.py` lines 63-64.

### Q: GROUP BY, HAVING, subquery?
GROUP BY buckets rows before aggregating; HAVING filters those groups after aggregation (WHERE filters before). A subquery is a query nested in another. Honest: my code uses simple filters and a SUM, no heavy GROUP BY/HAVING, so if pushed I would write "treks with more than 10 participants" as GROUP BY trek_id HAVING SUM(num_slots) > 10.
→ Code: SUM `backend/api/staffs.py` line 33; no GROUP BY/HAVING in project.

### Q: Primary key vs unique key?
A primary key uniquely identifies each row, cannot be null, one per table, auto indexed. A unique key just enforces uniqueness on a column, can be null, and you can have several. In my models `id` is the primary key and `email` is unique.
→ Code: primary key `backend/models.py` line 8; unique `email` line 10.

### Q: What if you insert a duplicate into a unique column?
The database raises an IntegrityError. I prevent it by checking first, for example on register and on staff creation I return 409 if the email already exists.
→ Code: register check `backend/api/auth.py` line 20; staff check `backend/api/admin.py` line 293.

### Q: What is ON DELETE CASCADE?
A rule that deletes child rows when the parent is deleted. In my project I set it at the ORM level with `cascade="all, delete-orphan"` on the relationships, so SQLAlchemy handles the cascade rather than me deleting children by hand.
→ Code: `backend/models.py` lines 19, 21, 49.

---

## 26. Changing the Database from SQLite

### Q: If you switched SQLite to PostgreSQL, what changes?
Very little, because of the ORM. Install the driver (psycopg2), change the `SQLALCHEMY_DATABASE_URI`, and run migrations if I use Flask-Migrate. The models and queries stay the same because SQLAlchemy generates the right SQL per dialect. I might re-test the case sensitivity of `ilike` and the date handling, but there is no big rewrite. That portability is a core reason to use an ORM.
→ Code: single change point `backend/config.py` line 8.

### Q: Why SQLite, and is it scalable?
SQLite because it is zero config and file based, perfect for a single machine demo. Honest: it is weak under high concurrency because writes lock the file, so for many simultaneous users I would move to PostgreSQL or MySQL with connection pooling.
→ Code: `backend/config.py` line 8.

---

## 27. Virtual Environment

### Q: What is a virtual environment and why use it?
An isolated Python environment per project so package versions do not clash with system Python or other projects. `requirements.txt` captures the dependencies so another machine recreates the exact environment with `pip install -r requirements.txt`. Honest tip I keep in mind: do not copy a venv between machines, recreate it, because a copied venv can break.
→ Code: `backend/requirements.txt`.

---

## 28. Miscellaneous Theory

### Q: What is JWT and how is it built?
A compact URL-safe token in three base64url parts: header (algorithm and type), payload (claims like id, role, expiry, only encoded not encrypted), and signature (HMAC-SHA256 of header and payload with the secret). If someone edits the payload the signature no longer matches and it is rejected. The secret must stay private.
→ Code: token created `backend/api/auth.py` lines 60-64; secret `backend/config.py` line 11.

### Q: What is a webhook?
A reverse API: instead of polling, another service sends an HTTP POST to your URL when an event happens. My project does not use webhooks; it is request-response REST.
→ Code: none; conceptual.

### Q: What is a WebSocket, and how is it different from a webhook?
A WebSocket is a persistent two way connection for real time data. A webhook is a one way server-to-server HTTP callback. My app uses neither; it polls a status endpoint for long running jobs.
→ Code: polling `backend/api/admin.py` lines 457-470.

### Q: What are Server-Sent Events (SSE)?
A one way stream where the server pushes updates to the client over a persistent HTTP connection, simpler than WebSockets for push-only cases. Honest: I do not use SSE; I poll the task status endpoints instead, and I could switch to SSE for live push.
→ Code: polling `backend/api/admin.py` lines 457-470.

### Q: What is SMTP?
Simple Mail Transfer Protocol, the standard for sending email, typically port 587 with TLS. My mail config uses it, and my Celery email tasks send through Flask-Mail.
→ Code: config `backend/config.py` lines 23-28; send `backend/tasks.py` line 396.

### Q: Is Flask scalable for large apps?
Flask scales with infrastructure: multiple Gunicorn workers instead of the dev server, Nginx as reverse proxy and load balancer, PostgreSQL with pooling, Redis for caching, horizontally scaled Celery workers, and a CDN for assets. My stateless JWT auth makes horizontal scaling easy because there is no session affinity. For a course project the current stack is fine.
→ Code: stateless auth `backend/api/auth.py` lines 60-64; current dev server `backend/app.py` lines 62-63.

### Q: Horizontal vs vertical scaling?
Vertical is a bigger machine (more CPU/RAM), which has limits. Horizontal is more machines behind a load balancer, more scalable, needs a stateless design, which my token auth already gives.
→ Code: stateless enabler `backend/api/auth.py` lines 60-64.

### Q: What is a dataclass in Python?
A `@dataclass` auto generates `__init__`, `__repr__` and `__eq__` from annotations, good for plain data holders. Honest: I do not use dataclasses; my data classes are the SQLAlchemy models.
→ Code: none; models at `backend/models.py`.

### Q: Difference between security and privacy?
Security is protecting systems from unauthorised access (auth, hashing, JWT). Privacy is controlling what personal data is collected and who can see it (access control, not storing unnecessary data).
→ Code: security examples `backend/api/auth.py` and `backend/api/admin.py` lines 12-16.

---

## 29. Previously Asked Proctor Questions

### Q: How would you implement a "favourite trek" feature (thought process)?
I would add a `Favourite` table with `user_id` and `trek_id` foreign keys and a unique constraint on the pair, a POST route to add a favourite and a DELETE to remove it, load the user's favourites on mount, and on the frontend show a filled or outline star per trek using `v-if` based on whether the trek id is in the favourites list.
→ Code: pattern would mirror existing many-to-one relations `backend/models.py` lines 52-64 and a new route like `backend/api/users.py`.

### Q: Implement template inheritance in Vue (like Jinja base template)?
In Vue the equivalent is the root component. My `App.vue` holds the shared header, `router-view` and footer, and every page renders inside `router-view`, which is like Jinja's `{% block content %}`. So the shared chrome is declared once, like extending a base template.
→ Code: `frontend/src/App.vue` lines 8-26.

### Q: What improved from MAD1 to MAD2?
MAD1 was a monolithic Flask app rendering Jinja templates with server sessions and full page reloads. MAD2 is a decoupled Vue SPA plus a Flask REST API, with JWT auth, RBAC, Redis caching, and Celery background jobs (reports, exports, reminders). It is reactive with no page reloads, and it has real async work.
→ Code: REST API `backend/api/`; SPA `frontend/src/`; background jobs `backend/tasks.py`.

### Q: What was the default hashing in MAD1, and what do you use now?
Werkzeug's `generate_password_hash` (scrypt in newer versions, previously pbkdf2:sha256). Honest and important: this MAD2 project also uses Werkzeug's `generate_password_hash`, not bcrypt. So the hashing is the same family, salted and one way.
→ Code: `backend/models.py` line 24.

### Q: When do you need to clear the cache?
Whenever the underlying trek data changes: after creating, updating, deleting, assigning or approving a trek I call `cache.clear()`. Honest note: I clear the whole cache rather than a single key, which is blunt but safe.
→ Code: `cache.clear()` `backend/api/admin.py` lines 145, 165, 198, 230, 251; booking write `backend/api/users.py` line 122.

### Q: Can Vue detect all changes in reactive data?
Vue 3 uses Proxies and can detect property additions and deletions and array index changes. Vue 2 could not detect direct index assignment or new properties without `Vue.set`. My project is Vue 3, so reactivity works without those workarounds.
→ Code: Vue 3 dependency `frontend/package.json`.

### Q: Is `:` a shorthand? For what?
Yes, `:` is shorthand for `v-bind:`, so `:key="t.id"` is `v-bind:key`. I use it for `:key`, `:max` and similar.
→ Code: `frontend/src/views/trekkers/Treks.vue` line 89 (`:key`) and line 56 (`:max`).

---

## 30. Common Code-Change Tasks to Practice

These are the quick edits an examiner tends to ask for. All mapped to my real files.

### 1. Change the header or a background colour
The header markup is in `App.vue`; I would add a style to the header row or the `#app-container`.
→ Code: `frontend/src/App.vue` lines 3-24 (header block).

### 2. Change a button's colour
Add an inline style or class to the button. For example the Login button.
→ Code: `frontend/src/views/Login.vue` line 25 (`<button type="submit">`).

### 3. Move the header/footer position
The footer is already fixed to the bottom with inline styles in `App.vue`; to move the header I would reorder the header block relative to `router-view`.
→ Code: footer `frontend/src/App.vue` (footer block near line 29); header lines 3-24.

### 4. Center the login form
It is already centered with flexbox on the outer div.
→ Code: `frontend/src/views/Login.vue` line 2 (`display:flex; align-items:center; justify-content:center`).

### 5. Show a v-for in code
Point at the bookings or treks list.
→ Code: `frontend/src/views/trekkers/MyBookings.vue` line 50 (`v-for="b in bookings" :key="b.id"`).

### 6. Add frontend validation (for example password length)
Honest: my register form only uses the `required` attribute, it does not check password length. To add it, in `handleRegister` I would check `this.form.password.length < 6` and show an alert before calling the API.
→ Code: current register `frontend/src/views/Register.vue` lines 69-72; add the length check before line 71.

### 7. Change the Celery Beat schedule to test live
In `celery_worker.py` I would swap a crontab for a short interval, for example `'schedule': 30.0` to run every 30 seconds while demoing.
→ Code: `backend/celery_worker.py` lines 10-13 (the daily reminder entry).

### 8. Write a simple Flask route (hello world)
```python
from flask import jsonify

@app.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello, World!"}), 200
```
→ Code: same route pattern as my endpoints, e.g. `backend/api/admin.py` line 55.

### 9. Write a Flask route that adds two numbers
```python
@app.route("/add", methods=["POST"])
def add_numbers():
    data = request.get_json()
    return jsonify({"result": data.get("a", 0) + data.get("b", 0)}), 200
```
→ Code: `request.get_json()` pattern `backend/api/users.py` lines 68-70.

### 10. Write a v-for in a Vue component (notepad)
```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
<script>
export default {
  data() {
    return { items: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] }
  }
}
</script>
```
→ Code: same shape as `frontend/src/views/trekkers/MyBookings.vue` line 50.

### 11. Button that shows/hides text
```vue
<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <p v-if="show">Hello World!</p>
  </div>
</template>
<script>
export default {
  data() { return { show: false } }
}
</script>
```
→ Code: same `@click` + `v-if` pattern as `frontend/src/views/trekkers/Treks.vue` lines 62 and 35.

### 12. Inline vs internal vs external CSS
Inline is `style="..."` on the element (highest specificity, per element), internal is a `<style>` block (per page/component), external is a linked stylesheet (shared). In Vue, `<style scoped>` applies only to the current component. My views mostly use inline styles on the table-based layout.
→ Code: inline styles throughout `frontend/src/App.vue`.

---

## Quick Reference: Key File Locations

| File | What it does |
|------|-------------|
| `backend/models.py` | All database models (User, Trek, Booking, StaffProfile) |
| `backend/app.py` | App factory, extensions init, Celery config, admin bootstrap |
| `backend/config.py` | All config (DB, JWT, Redis, mail) read from `.env` |
| `backend/extensions.py` | Shared objects (db, jwt, mail, cache, celery, redis client) |
| `backend/api/auth.py` | Register, login, forgot/reset password (OTP) |
| `backend/api/admin.py` | Admin CRUD, dashboard, caching, reports, RBAC |
| `backend/api/staffs.py` | Staff dashboard, trek lifecycle, participants, reports |
| `backend/api/users.py` | Trekker treks, bookings, profile, CSV export |
| `backend/tasks.py` | All Celery tasks (PDF reports, CSV, emails, reminders, cleanup) |
| `backend/celery_worker.py` | Celery entry and Beat schedule |
| `backend/seed.py` | Seed data (staff, trekkers, treks, bookings) |
| `frontend/src/main.js` | Vue app entry, installs Pinia and the router |
| `frontend/src/App.vue` | Root component, shared header, router-view, session timer |
| `frontend/src/router/index.js` | Routes and the navigation guard |
| `frontend/src/store/auth.js` | Pinia auth store (token, role, name, session timer) |
| `frontend/src/services/api.js` | axios instance with token and 401 interceptors |
| `frontend/src/views/Login.vue` | Login, forgot and reset password |
| `frontend/src/views/trekkers/` | Trekker dashboard, treks, bookings, profile |
| `frontend/src/views/admin/` | Admin dashboard, treks, staff, trekkers, bookings, reports |
| `frontend/src/views/staffs/` | Staff dashboard, my treks, reports, profile |
| `frontend/package.json` | Frontend dependencies |

---

*Prepared for TrekStar MAD2 viva. If I do not know something, I will say so honestly and reason it out or point to where I would implement it, rather than bluff.*
