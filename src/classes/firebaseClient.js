
import SDK from "../../firebasesdk.json" assert { type: "json" }
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';

export let connected = false

export default class FirebaseClient {

    connect() {
        try {
            initializeApp({
                credential: cert(SDK)
            });

            connected = true
            const db = getFirestore();
            console.log('firebase connected');
            return db
        } catch (error) {
            console.log(error);
        }
    }
}