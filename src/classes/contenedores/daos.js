import { DB } from '../../config/config.js'
import DaoContainerFirebase from './daoFirebase.js'

let instance

if (DB === 'FIREBASE') {
    instance = new DaoContainerFirebase()
} else if (DB === 'MONGO') {
    // instance = new DaoContainerMongo()
}

export { instance }