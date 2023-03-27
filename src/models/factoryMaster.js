import { factoryFirebase, factoryMongo } from "./factoryTypes.js"

export class masterFactory {

    create(type) {
        if (type === 'Mongo') return new factoryMongo()
        if (type === 'Firebase') return new factoryFirebase()
    }
}
