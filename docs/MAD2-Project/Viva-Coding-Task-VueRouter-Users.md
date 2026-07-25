# Viva Coding Task Guide: Vue Router Users List and Detail

This is a step by step guide for the coding task that came up in a level1 viva:

> Build a small Vue application that uses routing via vue-router. Create a route `/users` which shows a list of users (each with id, name, and score). Use `v-for` to display the list. When a user is clicked, navigate to `/users/:id`. On this new route, show a component that displays the selected user's details using the id from the URL. In this component, display the user's name and score, and change the score color to red if it is below 50, otherwise green. Also make sure your app handles the case where an invalid user id is entered in the URL.

I have written it the way I would actually build and explain it in the viva, in the same Vue 3 Options API style my TrekStar project already uses (vue-router 4, `createRouter`/`createWebHistory`, `router-link`, `this.$route`). No fluff, just the plan, the code, and what to say. There is also a single-file version at the end I can type into Notepad if the examiner wants it in one file.

---

## Step 0: First, read the question back and list the requirements

Before typing I say out loud what the task is actually testing, so the examiner sees I understood it. There are six concrete requirements hiding in that paragraph:

1. Set up vue-router with two routes.
2. A `/users` route that lists users, each having id, name, score.
3. Render the list with `v-for` (and a `:key`).
4. Clicking a user navigates to `/users/:id` (a dynamic route).
5. The detail route reads the `id` from the URL and shows that user's name and score.
6. The score text is red if score is below 50, green otherwise.
7. Handle an invalid id in the URL (a user that does not exist).

Concepts being tested: routing, dynamic route params, `v-for` with keys, programmatic or link navigation, reading `route.params`, conditional styling, and defensive handling of bad input. I mention this list so the examiner knows I am not going to forget the invalid-id part, which is the bit most students skip.

---

## Step 1: Plan the file structure

For a proper project I split it into small files, which is how my real project is organised:

```
src/
  main.js            // create the app, install the router
  router/index.js    // route table
  data/users.js      // the sample users (stands in for an API)
  App.vue            // shell with <router-view>
  components/
    UserList.vue     // the /users list
    UserDetail.vue   // the /users/:id detail
```

I keep the users in one shared module so both the list and the detail component read from the same source. In a real app this would be an API call, and I say that to the examiner: "here I am hardcoding the data, but normally the detail page would fetch the user by id from the backend."

---

## Step 2: The sample data

`src/data/users.js`

```js
export const users = [
  { id: 1, name: 'Adi Sharma', score: 82 },
  { id: 2, name: 'Biju Das', score: 45 },
  { id: 3, name: 'Charu Nair', score: 67 },
  { id: 4, name: 'Divya Menon', score: 30 },
  { id: 5, name: 'Esha Gupta', score: 91 }
]
```

I deliberately include some scores below 50 (Biju 45, Divya 30) and some above, so I can visibly prove the red/green rule works during the demo.

---

## Step 3: Set up the router

`src/router/index.js`. This mirrors exactly how my TrekStar router is written (`createRouter`, `createWebHistory`, a routes array).

```js
import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../components/UserList.vue'
import UserDetail from '../components/UserDetail.vue'

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

The key line is `path: '/users/:id'`. The `:id` makes it a dynamic segment, so `/users/2` and `/users/3` both match this one route, and the value is available as `this.$route.params.id`. I add the `/` redirect just so the app opens straight on the list.

---

## Step 4: Install the router in the app

`src/main.js`, same shape as my project's `main.js`:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

`.use(router)` is what actually plugs vue-router into the app. If I forget this, `router-link` and `router-view` will not work, which is a classic mistake I call out so I do not make it.

---

## Step 5: The app shell

`src/App.vue`. The only thing that has to be here is `<router-view>`, which is the placeholder where the matched route's component renders. This is the same idea as the shared layout in my TrekStar `App.vue`.

```vue
<template>
  <div>
    <h2>User Directory</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

Whatever route I am on, its component appears where `<router-view>` is.

---

## Step 6: The users list (the /users route)

`src/components/UserList.vue`. This covers requirements 2, 3 and 4 (list, `v-for`, click to navigate).

```vue
<template>
  <div>
    <h3>Users</h3>
    <ul>
      <li v-for="user in users" :key="user.id">
        <router-link :to="`/users/${user.id}`">
          {{ user.name }} (score: {{ user.score }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { users } from '../data/users'

export default {
  name: 'UserList',
  data() {
    return { users }
  }
}
</script>
```

Two things I point out while writing this:

The `v-for` has `:key="user.id"`. I always add the key and can explain why: it gives each list item a stable identity so Vue's diffing tracks items correctly across updates. Leaving it out usually gets a follow-up question.

For navigation I used `<router-link :to="`/users/${user.id}`">`. That is the clean, declarative way. If the examiner asks for a programmatic click instead, I would swap it for a plain element with `@click="goToUser(user.id)"` and a method:

```js
methods: {
  goToUser(id) {
    this.$router.push(`/users/${id}`)
  }
}
```

Both do the same thing. `router-link` renders an anchor and handles it for me; `this.$router.push` navigates in code. I mention I know both because examiners like to hear the difference.

---

## Step 7: The user detail (the /users/:id route)

`src/components/UserDetail.vue`. This is the heart of the task and covers requirements 5, 6 and 7 (read id from URL, show name and score, colour the score, handle invalid id).

```vue
<template>
  <div>
    <div v-if="user">
      <h3>{{ user.name }}</h3>
      <p>
        Score:
        <span :style="{ color: scoreColor }">{{ user.score }}</span>
      </p>
      <router-link to="/users">Back to list</router-link>
    </div>

    <div v-else>
      <p>User not found. Please check the id in the URL.</p>
      <router-link to="/users">Back to list</router-link>
    </div>
  </div>
</template>

<script>
import { users } from '../data/users'

export default {
  name: 'UserDetail',
  computed: {
    user() {
      const id = Number(this.$route.params.id)
      return users.find(u => u.id === id)
    },
    scoreColor() {
      if (!this.user) return 'black'
      return this.user.score < 50 ? 'red' : 'green'
    }
  }
}
</script>
```

Here is what I explain line by line while writing it:

**Reading the id from the URL.** `this.$route.params.id` gives me the `:id` segment. It comes in as a string (`"2"`), so I convert it with `Number(...)` before comparing against the numeric ids in my data. Forgetting this conversion is a subtle bug: `"2" === 2` is false, so the lookup would silently fail. I make a point of mentioning it.

**Finding the user.** `users.find(u => u.id === id)` returns the matching user object, or `undefined` if there is no match. I made `user` a computed property so it recalculates automatically if the route changes.

**Handling the invalid id (requirement 7).** Because `find` returns `undefined` for a missing id, my template uses `v-if="user"` to show details and `v-else` to show a "User not found" message. So typing `/users/999` or `/users/abc` in the URL does not crash, it shows the fallback. This is the exact case the question told me to handle, and it falls out naturally from checking the result of `find`. `/users/abc` is also covered because `Number('abc')` is `NaN`, which matches no id.

**The score colour (requirement 6).** I use a computed property `scoreColor` that returns `'red'` if the score is below 50 and `'green'` otherwise, and bind it with `:style="{ color: scoreColor }"` on the span wrapping the score. I use a computed instead of putting the ternary inline because it is cleaner and I can reuse it. An inline version `:style="{ color: user.score < 50 ? 'red' : 'green' }"` also works and I would offer that if asked to keep it in the template.

---

## Step 8: Talk through the invalid-id handling explicitly

This is the requirement students forget, so in the viva I stop and demonstrate it on purpose. I say: "there are two kinds of invalid id, and both are handled." A number that does not exist, like `/users/999`, and non-numeric junk, like `/users/abc`. In both cases `users.find(...)` returns `undefined`, `scoreColor` guards with the `!this.user` check so it does not read `.score` of undefined, and the template shows the fallback message via `v-else`. If I wanted to go further I could redirect to a dedicated not-found route or use a navigation guard, and I would mention that as the "next level" answer.

---

## Step 9: One subtlety worth knowing (reusing the same route)

If the examiner clicks from one user detail straight to another (for example a "next user" link that goes from `/users/2` to `/users/3`), Vue reuses the same `UserDetail` component instance instead of recreating it. Because I used a computed on `this.$route.params.id`, it recalculates and updates fine. If I had fetched data in `mounted()` instead, it would not re-fetch on that kind of navigation, and I would need a `watch` on `this.$route.params.id`. I keep this in my back pocket in case the follow-up is "what if you fetched from an API in mounted?".

---

## Step 10: What to say at the end

I summarise so the examiner can tick off every requirement: routing set up with two routes including a dynamic `/users/:id`; the list rendered with `v-for` and a key; clicking navigates via `router-link` (or `router.push` programmatically); the detail reads the id from `this.$route.params.id`, converts it to a number, and looks the user up; the score is coloured with a computed returning red below 50 and green otherwise; and an invalid id shows a "user not found" message rather than crashing.

---

## Appendix: single-file Notepad version (Vue 3 + vue-router via CDN)

If the examiner wants it as one file I can run in a browser (some proctors do this in Notepad), here is the whole thing in a single HTML file using the CDN builds. It is the same logic, just not split into `.vue` files.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Users Router Demo</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>User Directory</h2>
    <router-view></router-view>
  </div>

  <script>
    const users = [
      { id: 1, name: 'Adi Sharma', score: 82 },
      { id: 2, name: 'Biju Das', score: 45 },
      { id: 3, name: 'Charu Nair', score: 67 },
      { id: 4, name: 'Divya Menon', score: 30 },
      { id: 5, name: 'Esha Gupta', score: 91 }
    ]

    const UserList = {
      data() {
        return { users }
      },
      template: `
        <div>
          <h3>Users</h3>
          <ul>
            <li v-for="user in users" :key="user.id">
              <router-link :to="'/users/' + user.id">
                {{ user.name }} (score: {{ user.score }})
              </router-link>
            </li>
          </ul>
        </div>
      `
    }

    const UserDetail = {
      computed: {
        user() {
          const id = Number(this.$route.params.id)
          return users.find(u => u.id === id)
        },
        scoreColor() {
          if (!this.user) return 'black'
          return this.user.score < 50 ? 'red' : 'green'
        }
      },
      template: `
        <div>
          <div v-if="user">
            <h3>{{ user.name }}</h3>
            <p>Score: <span :style="{ color: scoreColor }">{{ user.score }}</span></p>
            <router-link to="/users">Back to list</router-link>
          </div>
          <div v-else>
            <p>User not found. Please check the id in the URL.</p>
            <router-link to="/users">Back to list</router-link>
          </div>
        </div>
      `
    }

    const routes = [
      { path: '/', redirect: '/users' },
      { path: '/users', component: UserList },
      { path: '/users/:id', component: UserDetail }
    ]

    const router = VueRouter.createRouter({
      history: VueRouter.createWebHashHistory(),
      routes
    })

    Vue.createApp({}).use(router).mount('#app')
  </script>
</body>
</html>
```

The only differences from the project version: the components use inline string `template`s instead of `.vue` files, and I use `createWebHashHistory()` instead of `createWebHistory()` so it works when opened directly as a file without a dev server. The routing, `v-for`, id lookup, colour rule and invalid-id fallback are identical.

---

## Quick recall checklist (glance before the viva)

- Router: `createRouter` + `createWebHistory`, routes `/users` and `/users/:id`.
- Install with `app.use(router)` in `main.js`.
- Shell has `<router-view>`.
- List: `v-for="user in users" :key="user.id"` inside `router-link :to="`/users/${user.id}`"`.
- Detail: `Number(this.$route.params.id)`, `users.find(...)`.
- Colour: computed `scoreColor`, `score < 50 ? 'red' : 'green'`, bound with `:style`.
- Invalid id: `v-if="user"` / `v-else` fallback, and a `!this.user` guard in the computed.
