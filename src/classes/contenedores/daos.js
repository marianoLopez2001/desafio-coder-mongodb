import { DB as CLIDaosParam } from '../../config/config.js'
import { masterFactory } from '../../models/factory/factoryMaster.js';

const factoryInstance = new masterFactory()

const DBChoice = factoryInstance.create(CLIDaosParam)

let instance

if (DBChoice.type === 'Firebase') {
    import('../firebaseClient.js')
        .then((modulo) => {
            instance = new modulo.default().connect();
        })
} else if (DBChoice.type === 'Mongo') {
    // instance = new DaoContainerMongo()
}

export { instance }

