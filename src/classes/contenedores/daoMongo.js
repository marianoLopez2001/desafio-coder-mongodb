import { instance } from './daos.js';
import { log, mongoSchema } from '../../config/config.js'
import ErrorClass from '../errorClass.js';
import { Users } from '../mongoClient.js'

let instanciaSingleton = null

class DaoContainerMongo {

    constructor(model) {
        this.connection = instance; //ya conectado
        this.model = model;
        this.model = Users;
    }

    //Metodos

    static getInstance() {
        try {
            if (!instanciaSingleton) {
                instanciaSingleton = new DaoContainerMongo(mongoSchema);
            }
            return instanciaSingleton;
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async create(data) {
        try {
            await this.model.create(data)
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async readAll() {
        try {
            let docs = await this.model.find({}, { __v: 0 }).lean()
            log.info(docs);
            return docs
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async readById(id) {
        try {
            let docs = await this.model.find({ _id: id }).lean()
            log.info(docs);
            return docs
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async update(id, data) {
        try {
            await this.model.replaceOne({ _id: id }, data)
            log.info('Elemento Actualiado');
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }

    async deleteById(id) {
        try {
            await this.model.deleteOne({ _id: id });
            log.info('Elemento borrado')
        } catch (error) {
            throw new ErrorClass(500, error)
        }
    }
}

const main = DaoContainerMongo.getInstance()
main.readAll()

