import { mongoSchema, mongoOptions, log } from '../config/config.js'
import mongoose from 'mongoose'
import ErrorClass from './errorClass.js';

export default class MongoClient {

    connect() {
        try {
            const db = mongoose.connect(mongoOptions.url, mongoOptions.opts )
            log.info('mongo connected');
            return db
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }
}

export const Users = mongoose.model('usuarios', mongoSchema) //mover capaz


