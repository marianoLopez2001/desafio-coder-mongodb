import { instance } from './daos.js';
import {log, errorLog} from '../../config/config.js'

let instanciaSingleton = null

class DaoContainerFirebase {

    constructor(model) {
        this.connection = instance; //ya conectado
        this.model = model;
    }

    //Metodos

    static getInstance() {
        if (!instanciaSingleton) {
            instanciaSingleton = new DaoContainerFirebase();
        }
        // let instance;
        // instance = new SingletonClass();
        return instanciaSingleton;
      }

    async create(data, id) {
        try {
            await this.connection.collection('users').doc(id).set(data);
            console.log('creado');
        } catch (error) {
            errorLog.error(error);
        }
    }

    async readAll() { //necesita que le pases la conex de arriba ^
        try {
            const snapshot = await this.connection.collection('users').get();
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
            const ref = await this.connection.collection('users').doc(id);
            await ref.update(data)
        } catch (error) {
            errorLog.error(error);
        }
    }

    async deleteById(id) {
        try {
            await this.connection.collection('users').doc(id).delete()
        } catch (error) {
            errorLog.error(error);
        }
    }
}

//aca hay un error, faltaria un await o algo asi para que no haya un timeout
setTimeout(() => {
    const main = DaoContainerFirebase.getInstance()
    main.create({name:'jorge', lastname:'asd', mail: 'asd@gmail.com'}, 'id5')
}, 1000);

