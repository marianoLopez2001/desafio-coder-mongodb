import { instance } from './daos.js';
import { log } from '../../config/config.js'
import ErrorClass from '../errorClass.js';

let instanciaSingleton = null

class DaoContainerFirebase {

    constructor(model) {
        this.connection = instance; //ya conectado
        this.model = model;
    }

    //Singleton
    
    static getInstance() {
        if (!instanciaSingleton) {
            instanciaSingleton = new DaoContainerFirebase();
        }
        return instanciaSingleton;
    }

    //Metodos Crud

    async create(data, id) {
        try {
            await this.connection.collection('users').doc(id).set(data);
            console.log('creado');
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async readAll() {
        try {
            const snapshot = await this.connection.collection('users').get();
            const data = snapshot.docs.map(doc => doc.data());
            return JSON.stringify(data);
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async readById(id) {
        try {
            const snapshot = await this.connection.collection('users').get(id);
            const data = snapshot.docs.find(doc => doc.id === id);
            if (!data) {
                throw new ErrorClass(500, 'No hubo coincidencias')
            }
            log.info(JSON.stringify(data.data()));
            return JSON.stringify(data.data())
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async update(id, data) {
        try {
            const ref = await this.connection.collection('users').doc(id);
            await ref.update(data)
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async deleteById(id) {
        try {
            await this.connection.collection('users').doc(id).delete()
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }
}

//aca hay un error, faltaria un await o algo asi para que no haya un timeout
setTimeout(() => {
    const main = DaoContainerFirebase.getInstance()
    // main.readById('id7')
}, 1000);

