import dotenv from "dotenv"
import minimist from "minimist"
import twilio from 'twilio'
import { fileURLToPath } from 'url';
import { dirname } from "path"
import log4js from 'log4js'
import { createTransport } from "nodemailer"
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';
import SDK from '../../firebasesdk.json' assert { type: "json" };

dotenv.config()
const PORT = minimist(process.argv)._[3] || 8080;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken)

const nodemailerUser = process.env.NODEMAILER_USER
const nodemailerPass = process.env.NODEMAILER_PASS

//DIRNAME PARA LA RUTA ABSOLUTA DE EJS CONFIG

// const __dirname = dirname(fileURLToPath(import.meta.url));

let log = log4js.getLogger()
let errorLog = log4js.getLogger('fileErrorConsole')

//NODEMAILER CONFIG

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: nodemailerUser,
        pass: nodemailerPass
    }
});

//LOG4JS CONFIG

log4js.configure({
    appenders: {
        consoleLog: { type: "console" },
        fileLog: { type: 'file', filename: 'error.log' },
    },
    categories: {
        default: { appenders: ['consoleLog'], level: 'debug' },
        fileErrorConsole: { appenders: ['fileLog', 'consoleLog'], level: 'warn' },
    }
})

//FIREBASE

const serviceAccount = SDK

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const snapshot = await db.collection('users').get();

export { PORT, log, errorLog, transporter, db, client, snapshot, nodemailerUser}