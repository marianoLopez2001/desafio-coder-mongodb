import { factoryFirebase, factoryMongo } from "./factoryTypes.js"

export class masterFactory {

    create(type) {
        if (type === 'MONGO') return new factoryMongo()
        if (type === 'FIREBASE') return new factoryFirebase()
    }
}
