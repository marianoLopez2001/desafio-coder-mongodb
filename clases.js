import knex from 'knex'

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

    pushData(data) { //faltaría que la info venga del front capaz
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
                table.string('mail')
            table.string('mensaje')

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
            // .then(() => { console.log("exito"); })
            // .catch((err) => { console.log(err); })
            // .finally(() => { knexConnection.destroy() })
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

