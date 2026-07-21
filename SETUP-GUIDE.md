# FieldOrder — Setup Guide

This app lets your salesmen browse a shared catalog, manage their own
retailers, place orders, apply bonus schemes automatically, and track
cash collected — each salesman only sees their own retailers, orders and
collections.

Because it needs logins (so salesman A can't see salesman B's retailers),
setup has a couple more steps than the simple counter app. Go slowly, it's
all copy/paste — about 20-25 minutes total, still ₹0 cost.

**Important:** create a **brand new** Firebase project for this app — don't
reuse the one from your shop counter app. They're unrelated apps and mixing
their data would cause problems.

---

## 1. Create a new Firebase project

Same as before:
1. console.firebase.google.com → **Add project** → name it (e.g. `fieldorder-app`) → turn off Analytics if asked → **Create project**.
2. Left sidebar → **Build → Firestore Database** → **Create database** → pick a nearby location (e.g. `asia-south1`) → **Test mode** → **Create**.

## 2. Turn on Email/Password sign-in

This is new — it's what lets each salesman log in with their own account.

1. Left sidebar → **Build → Authentication** → **Get started**.
2. Under "Sign-in method", click **Email/Password** → toggle it **Enabled** → **Save**.

## 3. Create a login for each salesman

1. Still in **Authentication**, click the **Users** tab → **Add user**.
2. Enter an email and a password for salesman #1 (it doesn't need to be a
   real inbox — e.g. `ravi@yourshop.com` works fine as a login ID). Click
   **Add user**.
3. Repeat for each of your 1-5 salesmen.
4. **Write down each email + password** and share it privately with that
   salesman — that's what they'll type into the app to sign in.

## 4. Get your app's connection details

1. Gear icon (top-left) → **Project settings**.
2. Scroll to **Your apps** → click **`</>`** (web) → nickname it → leave
   "Firebase Hosting" unchecked → **Register app**.
3. Copy the `firebaseConfig` block shown.
4. Paste those six values into **firebase-config.js**, replacing the
   placeholders (I can also do this step for you — just paste the config
   here in chat like last time).

## 5. Secure the data (important — different from the counter app)

Because this app has real logins, we should lock down who can read/write
what. In the Firebase console: **Firestore Database → Rules**, replace the
default with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Shared catalog & schemes: any signed-in salesman can view and manage
    match /products/{id} {
      allow read, write: if request.auth != null;
    }
    match /schemes/{id} {
      allow read, write: if request.auth != null;
    }

    // Private per-salesman data
    match /retailers/{id} {
      allow read, update, delete: if request.auth != null && resource.data.salesmanUid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.salesmanUid == request.auth.uid;
    }
    match /orders/{id} {
      allow read: if request.auth != null && resource.data.salesmanUid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.salesmanUid == request.auth.uid;
    }
    match /collections/{id} {
      allow read: if request.auth != null && resource.data.salesmanUid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.salesmanUid == request.auth.uid;
    }
  }
}
```

Click **Publish**. This is the part that actually makes sure salesman A
can't see salesman B's retailers or orders, so don't skip it.

## 6. Host it for free

Same options as before — pick one:

**GitHub Pages** (what you used last time):
1. New public repository on github.com.
2. Upload all 6 files: `index.html`, `firebase-config.js`, `manifest.json`,
   `sw.js`, `icon-192.png`, `icon-512.png`.
3. Settings → Pages → Branch: `main`, folder `/ (root)` → Save.
4. Wait ~1-2 minutes, refresh, grab the `https://yourname.github.io/...` link.

**Firebase Hosting** — see the previous SETUP-GUIDE.md from the counter app
for the command-line steps, they're identical here.

## 7. Install on each salesman's phone

In Chrome on each phone: open the link → **⋮ menu → Add to Home screen →
Install**. Each salesman then opens the app and signs in with the email +
password you gave them in step 3.

## 8. Using the app

- **Retailers** tab: add each retailer you visit (+button). Tap a retailer
  to see outstanding balance, place a new order, or record a collection.
- **Catalog** tab: shared product list — add products with price, MRP,
  optional image link, and colors. Anyone can add here since it's shared.
- **New order**: from a retailer's screen → pick products → bonus schemes
  apply automatically and show as "🎁 free" under the item.
- **Collections** tab: total outstanding across all your retailers, and a
  log of payments received.
- **Schemes** tab: add "Buy X, get Y free" rules — they apply to every
  salesman's orders automatically once added.

If anything looks off (a red "Not connected" banner, or a sign-in error),
paste what you see here and I'll help you fix it.
