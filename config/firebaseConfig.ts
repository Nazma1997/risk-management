import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import serviceAccount from "../firebase.json"


initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();

const db: Firestore = getFirestore();
console.log("Firebase Admin SDK initialized successfully"); // Debugging: Log success

export { auth, db };
