import knex from 'knex'
import mongoose from "mongoose";
import { mongodbOptions } from "./options.js";

export class DBProductosSQL {
    constructor(options, tableName) {
        this.options = options
        this.tableName = tableName
    }

    createTable() {
        const knexConnection = knex(this.options);
        knexConnection.schema.createTable(this.tableName, table => {
            table.increments('id').primary()
            table.string('nombre'),
                table.integer('precio')
        })
            .then(() => { console.log('tabla creada'); })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    pushData(data) {
        const knexConnection = knex(this.options);
        knexConnection(this.tableName).insert(data)
            .then(() => { console.log('info insertada') })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    async getAll() {
        const knexConnection = knex(this.options);
        const data = knexConnection.from(this.tableName).select('*')
        return data.then((rows) => { return rows })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    getById(id) {
        const knexConnection = knex(this.options);
        knexConnection.from(this.tableName).select('*')
            .where('id', '=', id)
            .then((rows) => { console.log(rows); })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    deleteById(id) {
        const knexConnection = knex(this.options);
        knexConnection.from(this.tableName).select('*')
            .where('id', '=', id)
            .del()
            .then(() => { console.log("borrado con exito"); })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    updateById(id, data) {
        const knexConnection = knex(this.options);
        knexConnection.from(this.tableName).select('*')
            .where('id', '=', id)
            .update(data)
            .then(() => { console.log("actualizado con exito"); })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }
}

export class DBMensajesSqlite3 {
    constructor(options, tableName) {
        this.options = options
        this.tableName = tableName
    }


    createTable() {
        const knexConnection = knex(this.options);
        knexConnection.schema.createTable(this.tableName, table => {
            table.increments('id').primary()
            table.string('nombre'),
                table.string('apellido'),
                table.integer('edad'),
                table.string('alias'),
                table.string('avatar'),
                table.string('text')
        })
            .then(() => { console.log('tabla creada'); })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    pushData(data) { //faltaría que la info venga del front capaz
        const knexConnection = knex(this.options);
        knexConnection(this.tableName).insert(data)
            .then(() => { console.log('mensaje insertado') })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    async getAll() {
        const knexConnection = knex(this.options);
        const data = knexConnection.from(this.tableName).select('*')
        return data.then((rows) => { return rows })
    }

    getById(id) {
        const knexConnection = knex(this.options);
        knexConnection.from(this.tableName).select('*')
            .where('id', '=', id)
            .then((rows) => { console.log(rows); })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    deleteById(id) {
        const knexConnection = knex(this.options);
        knexConnection.from(this.tableName).select('*')
            .where('id', '=', id)
            .del()
            .then(() => { console.log("borrado con exito"); })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }

    updateById(id, data) {
        const knexConnection = knex(this.options);
        knexConnection.from(this.tableName).select('*')
            .where('id', '=', id)
            .update(data)
            .then(() => { console.log("actualizado con exito"); })
            .catch((err) => { console.log(err); })
            .finally(() => { knexConnection.destroy() })
    }
}


let connect

export class ContenedorMongoMensajes {
    constructor(nombreColeccion, esquema) {
        this.schema = new mongoose.Schema(esquema)
        this.coleccion = mongoose.model(nombreColeccion, this.schema) // crea la coleccion de una
    }

    async connectMongo() {
        try {
            mongoose.connect(mongodbOptions.cnstr, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            connect = mongoose.connection;
            console.log('mongo ok');
        } catch (error) {
            console.log(error);
        }
    }

    async insert(data) {
        try {
            await connect.collection(this.coleccion.collection.name).insertOne(data)
        } catch (error) {
            console.log(error);
        }
    }

    async listAll() {
        try {
            const read = await this.coleccion.find({})
            return read
        } catch (error) {
            console.log(error);
        }
    }
    async listById(id) {
        try {
            const read = await this.coleccion.find({ _id: id })
            console.log(read);
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id) {
        try {
            await this.coleccion.updateOne({ _id: id }, { title: "pepe" });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.coleccion.deleteOne({ _id: id })
        } catch (error) {
            console.log(error);
        }
    }
}


