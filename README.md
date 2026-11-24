# Test-Driven Development — Starter Exercise

## What is TDD?

Test-Driven Development is a workflow where you write the **test first**, then write just enough code to make it pass, then clean up.

```
RED    → write a failing test for the behaviour you want
GREEN  → write the minimum code to make it pass
REFACTOR → clean up without breaking anything
repeat
```

The failing tests are not errors — they are your to-do list.

---

## Your task

Open `src/utils.js`. It contains three functions, each with a stub body:

```js
export function isValidEmail(email) {
  throw new Error('Not implemented');
}
```

**Your job is to implement each function so that all tests in `tests/utils.test.js` go from red to green.**

Do not modify the test file.

---

## The three functions

### 1. `isValidEmail(email)`

Takes a string and returns `true` if it is a well-formatted email address, `false` otherwise.

A valid email must have:
- a local part (before the `@`)
- an `@` symbol
- a domain and a TLD (e.g. `example.com`)
- no spaces

```js
isValidEmail('user@example.com')   // true
isValidEmail('userexample.com')    // false  — missing @
isValidEmail('user @example.com')  // false  — space
```

---

### 2. `isShopOpen(date)`

Takes a `Date` object and returns `true` if the shop is open at that moment, `false` otherwise.

The shop is open **Monday to Saturday, 09:00–17:59**.

```js
isShopOpen(new Date('2024-01-03T10:00:00'))  // true  — Wednesday 10:00
isShopOpen(new Date('2024-01-07T10:00:00'))  // false — Sunday
isShopOpen(new Date('2024-01-03T18:00:00'))  // false — after closing
```

---

### 3. `validateOrders(orders)`

Takes an array of order objects and returns `{ valid: boolean, errors: string[] }`.

Rules:
- Must be a non-empty array
- No more than **20 orders** at once
- Each order must have a non-empty string `item`
- Each order must have a `quantity` that is a **positive integer**
- No single `quantity` may exceed **50**

```js
validateOrders([{ item: 'Burger', quantity: 2 }])
// { valid: true, errors: [] }

validateOrders([{ item: '', quantity: -1 }])
// { valid: false, errors: ['Order at index 0: item must be a non-empty string', ...] }
```

---

## Setup

```bash
npm install
npm test          # run the test suite (watch mode)
```

Run tests once and exit:

```bash
npx vitest run
```

---

## Project structure

```
repo/
├── src/
│   └── utils.js          # <- implement your functions here
├── tests/
│   └── utils.test.js     # test suite (do not modify)
├── index.html            # visual demo — open with: npm run dev
└── package.json
```

---

## Visual demo

The `index.html` page lets you interact with the three functions through a form UI.
Once your implementations are working, you can see them in action in the browser.

```bash
npm run dev       # starts Vite dev server at http://localhost:5173
```

---

## CI

Every push to GitHub triggers the test suite automatically via GitHub Actions (`.github/workflows/tdd.yml`).

- If your tests are **red** — the pipeline blocks the merge.
- If your tests are **green** — the pipeline passes and a coverage report is generated.

This is the same feedback loop you get locally, enforced on every push.
