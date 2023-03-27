
import SDK from "../../firebasesdk.json" assert { type: "json" }
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';
import {log} from '../config/config.js'
import ErrorClass from "./errorClass.js";

export let connected = false

export default class FirebaseClient {

    connect() {
        try {
            initializeApp({
                credential: cert(SDK)
            });

            connected = true
            const db = getFirestore();
            log.info('firebase connected');
            return db
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }
}