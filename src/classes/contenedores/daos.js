import { DB } from '../../config/config.js'

let instance

if (DB === 'FIREBASE') {
    import('../firebaseClient.js')
        .then((modulo) => {
            instance = new modulo.default().connect();
        })
} else if (DB === 'MONGO') {
    // instance = new DaoContainerMongo()
}

export {instance}