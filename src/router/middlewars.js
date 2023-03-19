import session from 'express-session'
import { Passport } from './passport.js'
import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IoServer } from 'socket.io'
import { userGlobalEmail } from '../service/utils.js'
import {log, errorLog, db, transporter, client} from '../config/config.js'
import { Productos } from '../index.js'

const app = express()
const httpServer = new HTTPServer(app)
//__________________________________________________________________________________
const io = new IoServer(httpServer)

io.on("connection", async socket => {
    log.debug('connect')
    socket.on("newProd", async (data) => {
        log.debug('new prod added?')
        const docArray = await (await db.collection('users').doc(userGlobalEmail.userGlobalEmail).get('carrito')).data().carrito
        await db.collection('users').doc(userGlobalEmail.userGlobalEmail).update({ carrito: [...docArray, Productos[parseInt(data) - 1]] })
    })

    // ENVIO DE MENSAJES AL FINALIZAR COMPRA

    socket.on('finalizarCompra', async () => {
        const user = (await db.collection('users').doc(userGlobalEmail.userGlobalEmail).get()).data()

        //GMAIL

        try {
            const msg = await transporter.sendMail({
                from: 'Administrador',
                to: nodemailerUser,
                subject: `nuevo pedido de Nombre: ${user.nombre}, Mail: ${user.email}`,
                html: `<p>${JSON.stringify(user.carrito)}</p>`
            })
            log.info(msg)
        } catch (error) {
            errorLog.error(error)
        }

        //WHATSAPP

        try {
            client.messages.create({
                body: JSON.stringify(user.carrito),
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+5491141642367'
            })
        } catch (error) {
            errorLog.error(error)
        }

        //SMS

        try {
            client.messages.create({
                body: 'Su compra ha sido recibida y esta siendo procesada',
                from: '+15747013749',
                to: '+541141642367'
            })
        } catch (error) {
            errorLog.error(error)
        }
    })
})

//__________________________________________________________________________________

console.log('-----------------------------------------------middlewares file');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))
app.use(Passport.initialize());
app.use(Passport.session());
app.use(express.static('F:/Proyectos/desafio-coder-mongodb/src/public'))
// app.use(express.static(__dirname + '/public'))
app.set('views', `F:/Proyectos/desafio-coder-mongodb/src/views`)
// app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

export { app, httpServer }
