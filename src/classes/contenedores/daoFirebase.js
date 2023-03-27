import { instance } from './daos.js';
import {log, errorLog} from '../../config/config.js'

class DaoContainerFirebase {

    constructor(model) {
        this.connection = instance; //ya conectado
        this.model = model;
    }

    //Metodos

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
            const snapshot = await this.connection.collection('users').get(id);
            const data = snapshot.docs.find(doc => doc.id === id);
            if (!data) {
                errorLog.error('No hubo coincidencias')
                return
            }
            log.info(JSON.stringify(data.data())); //esto se cambia a return mas tarde
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


//aca hay un error, faltaria un await o algo asi para que no haya un timeout
setTimeout(() => {
    const main = new DaoContainerFirebase()
    main.readById('asd@gmail.com')
}, 1000);

