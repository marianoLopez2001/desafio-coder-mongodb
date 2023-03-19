import { Strategy } from 'passport-local'
import { db } from '../config/config.js'
import bcrypt from 'bcrypt'
import {logged, userGlobalEmail} from "./utils.js"


//FUNCION PARA TRAER PRODUCTOS

const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    return res.json()
}

//db con firebase

const snapshot = await db.collection('users').get();

// LOGUEO CON PASSPORT Y BCRYPT

const LocalStrategy = Strategy

const generateHash = async (passwordUser) => {
    const hashPassword = await bcrypt.hash(passwordUser, 10);
    return hashPassword
}

const verifyPass = async (usuarioConHash, pwdFlat) => {
    const match = await bcrypt.compare(usuarioConHash, pwdFlat)
    return match
}

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        logged.logged = true
        next()
    } else {
        res.redirect('/login')
    }
}


//TRAE EL PRODUCTO DESDE EL FRONT Y LO PUSHEA AL CARRITO DE FIREBASE 

//esto hay q modificarlo todo

// io.on("connection", async socket => {
//     if (!userGlobalEmail) return
//     socket.on("newProd", async (data) => {
//         const docArray = await (await db.collection('users').doc(userGlobalEmail).get('carrito')).data().carrito
//         await db.collection('users').doc(userGlobalEmail).update({ carrito: [...docArray, Productos[parseInt(data) - 1]] })
//     })

//     // ENVIO DE MENSAJES AL FINALIZAR COMPRA

//     socket.on('finalizarCompra', async () => {
//         const user = (await db.collection('users').doc(userGlobalEmail).get()).data()

//         //GMAIL

//         try {
//             const msg = await transporter.sendMail({
//                 from: 'Administrador',
//                 to: nodemailerUser,
//                 subject: `nuevo pedido de Nombre: ${user.nombre}, Mail: ${user.email}`,
//                 html: `<p>${JSON.stringify(user.carrito)}</p>`
//             })
//             log.info(msg)
//         } catch (error) {
//             errorLog.error(error)
//         }

//         //WHATSAPP

//         try {
//             client.messages.create({
//                 body: JSON.stringify(user.carrito),
//                 from: 'whatsapp:+14155238886',
//                 to: 'whatsapp:+5491141642367'
//             })
//         } catch (error) {
//             errorLog.error(error)
//         }

//         //SMS

//         try {
//             client.messages.create({
//                 body: 'Su compra ha sido recibida y esta siendo procesada',
//                 from: '+15747013749',
//                 to: '+541141642367'
//             })
//         } catch (error) {
//             errorLog.error(error)
//         }
//     })
// })

export {getData, snapshot, generateHash, verifyPass, isAuth, LocalStrategy}