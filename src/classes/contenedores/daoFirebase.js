import { log, errorLog } from '../../config/config.js'
import FirebaseClient from '../firebaseClient.js'
import { instance } from './daos.js';

export default class DaoContainerFirebase {
    constructor(model) {
        this.connection = new FirebaseClient();
        this.model = model;
    }

    //Metodos

    connect() {
        const db = this.connection.connect()
        return db
    }

    async create(data) {
        try {
            await connected.collection('users').doc('id').set(data);
        } catch (error) {
            errorLog.error(error);
        }
    }

    async readAll(connected) { //necesita que le pases la conex de arriba ^
        try {
            const snapshot = await connected.collection('users').get();
            const data = snapshot.docs.map(doc => doc.data());
            return JSON.stringify(data);
        } catch (error) {
            errorLog.error(error);
        }
    }

    async readById(id) {
        try {
            const snapshot = await connected.collection('users').get(id);
            const data = snapshot.docs.find(doc => doc.id === id);
            if (!data) {
                errorLog.error('No hubo coincidencias')
                return
            }
            console.log(JSON.stringify(data.data()));
        } catch (error) {
            errorLog.error(error);
        }
    }

    async update(id, data) {
        try {
            const ref = await connected.collection('users').doc(id);
            await ref.update(data)
        } catch (error) {
            errorLog.error(error);
        }
    }

    async deleteById(id) {
        try {
            await connected.collection('users').doc(id).delete()
        } catch (error) {
            errorLog.error(error);
        }
    }
}

// const instance = new DaoContainer()
// const connected = instance.connect()
// instance.readById('asd@gmail.com')
// // getAll ejemplo
// // let x = await instance.readAll(connected)
// // console.log(x);

