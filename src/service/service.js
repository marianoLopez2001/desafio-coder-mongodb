// import { Strategy } from 'passport-local'
// import { db } from '../config/config.js'
// import bcrypt from 'bcrypt'
// import {logged} from "./utils.js"

// //FUNCION PARA TRAER PRODUCTOS

// const getData = async () => {
//     const res = await fetch('https://fakestoreapi.com/products')
//     return res.json()
// }

// //DB CON FIREBASE

// const snapshot = await db.collection('users').get();

// // LOGUEO CON PASSPORT Y BCRYPT

// const LocalStrategy = Strategy

// const generateHash = async (passwordUser) => {
//     const hashPassword = await bcrypt.hash(passwordUser, 10);
//     return hashPassword
// }

// const verifyPass = async (usuarioConHash, pwdFlat) => {
//     const match = await bcrypt.compare(usuarioConHash, pwdFlat)
//     return match
// }

// function isAuth(req, res, next) {
//     if (req.isAuthenticated()) {
//         logged.logged = true
//         next()
//     } else {
//         res.redirect('/login')
//     }
// }

// export {getData, snapshot, generateHash, verifyPass, isAuth, LocalStrategy}