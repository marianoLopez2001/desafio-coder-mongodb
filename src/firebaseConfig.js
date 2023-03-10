import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import SDK from '../firebasesdk.json' assert { type: "json" };

const serviceAccount = SDK

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

export default db
