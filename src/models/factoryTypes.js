import FactoryContenedor from "./factoryContenedor.js"

class factoryMongo extends FactoryContenedor {
    constructor() {
        super()
        this.type = 'Mongo'
    }
}

class factoryFirebase extends FactoryContenedor {
    constructor() {
        super()
        this.type = 'Firebase'
    }
}

export { factoryFirebase, factoryMongo }