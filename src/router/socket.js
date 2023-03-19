// import {log, nodemailerUser} from '../config/config.js'

// console.log('-----------------------------------------------socket file');

// io.on("connection", async socket => {
//     // if (!userGlobalEmail) return
//     log.debug('connect')
//     socket.on("newProd", async (data) => {
//         log.debug('new prod added?')
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
