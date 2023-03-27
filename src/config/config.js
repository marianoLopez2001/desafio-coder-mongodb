import dotenv from "dotenv"
import minimist from "minimist"
import log4js from 'log4js'
import mongoose from 'mongoose';
const { Schema } = mongoose;

dotenv.config()

const DB = minimist(process.argv)._[2] || 'Mongo'; //Aca deberia ir "MONGO" o "FIREBASE"

//LOG4JS CONFIG

let log = log4js.getLogger()
let errorLog = log4js.getLogger('fileErrorConsole')

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

export const mongoSchema = new Schema({
    name: String,
    lastName: String,
    mail: String,
    password: String,
    cart: [{ title: String, price: Number, description: Number }],
});

export const mongoOptions = {
    url: 'mongodb://127.0.0.1:27017/test',
    opts: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }
}

export { log, errorLog, DB }
