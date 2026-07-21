// ============================================================
// This file connects your app to your Firebase project
// (fieldorder-app)
// ============================================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAxYpmn-_F3esHSOLOLNdG0NoZX7eFHWOk",
  authDomain: "fieldorder-app.firebaseapp.com",
  projectId: "fieldorder-app",
  storageBucket: "fieldorder-app.firebasestorage.app",
  messagingSenderId: "653226102184",
  appId: "1:653226102184:web:25deddd7e839c32b09219d"
};

// ============================================================
// Admin emails — ONLY these logins can add/edit products and
// schemes. Every other salesman login can view the catalog and
// schemes but cannot change them, and never sees a + button on
// those two tabs.
// Add/remove emails below (must match a login email you created
// in Firebase Authentication → Users). Keep this in sync with
// the matching list in your Firestore security rules — see
// SETUP-GUIDE.md.
// ============================================================
const ADMIN_EMAILS = [
  "ravi@fieldorder.app"
];
