import express from "express"
import dotenv from "dotenv"
dotenv.config()
import passport from 'passport'
import bcrypt from "bcrypt"
import { Strategy } from 'passport-local'
import db from "./firebaseConfig.js"
import session from 'express-session'
import { fileURLToPath } from 'url';
import { dirname } from "path"
import { Server as IoServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import os from 'os'
import cluster from 'cluster'
import log4js from 'log4js'
import minimist from "minimist"

const MODE = minimist(process.argv)._[3] || 'FORK'
const nucleos = os.cpus().length

log4js.configure({
    appenders: {
        consoleLog: { type: "console" },
        fileLog: { type: 'file', filename: 'error.log' },
    },
    categories: {
        default: { appenders: ['consoleLog'], level: 'debug' },
        fileErrorConsole: { appenders: ['fileLog', 'consoleLog'], level: 'warn' },
    }
})

let log = log4js.getLogger()
let errorLog = log4js.getLogger('fileErrorConsole')

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const httpServer = new HTTPServer(app)
const io = new IoServer(httpServer)

const PORT = process.env.PORT | 8081
let nombreQuery = ''

const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    return res.json()
}

let Productos = await getData()

io.on("connection", async socket => {
    if (!userGlobalEmail) return
    socket.on("newProd", async (data) => {
        const docArray = await (await db.collection('users').doc(userGlobalEmail).get('carrito')).data().carrito
        await db.collection('users').doc(userGlobalEmail).update({ carrito: [...docArray, Productos[parseInt(data) - 1]] })
    })
})

const snapshot = await db.collection('users').get();

const LocalStrategy = Strategy

let userGlobalEmail = ''
let logged = false

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
        logged = true
        next()
    } else {
        res.redirect('/login')
    }
}

passport.use(new LocalStrategy(
    async function (username, pwdFlat, done) {
        let usuarioConHash
        snapshot.forEach((i) => {
            if (i.data().email === username) {
                usuarioConHash = { email: username, password: i.data().password };
            }
        });
        if (!usuarioConHash) {
            errorLog.warn('usuario no existe');
            return done(null, false);
        } else {
            log.debug('usuario existe');
            const match = await verifyPass(pwdFlat, usuarioConHash.password)
            log.debug(match);
            if (!match) {
                errorLog.error('no match');
                return done(null, false)
            }
            userGlobalEmail = usuarioConHash.email
            logged = true
            return done(null, usuarioConHash);
        }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.email);
});

passport.deserializeUser((emailUser, done) => {
    let existeUsuario
    snapshot.forEach((i) => {
        if (i.data().email === emailUser) {
            existeUsuario = { email: i.data().email, password: i.data().password }
        }
    });
    done(null, existeUsuario);
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// if (MODE === 'CLUSTER') {
//     if (cluster.isPrimary) {

//         loggerConsole.info(`master is running in ${process.pid} en ${procesadores} procesadores`);

//         for (let i = 0; i < procesadores; i++) {
//             cluster.fork()
//         }
//     }
// }

app.get('/', isAuth, async (req, res) => {
    const docArray = await (await db.collection('users').doc(userGlobalEmail).get('carrito')).data().carrito
    res.render("inicio.ejs", { email: userGlobalEmail, logged: logged, productos: Productos, carrito: docArray })
})

app.get('/register', (req, res) => {
    res.render('register.ejs', { logged: logged })
})

app.get('/loginError', (req, res) => {
    res.render('loginError.ejs', { logged: logged })
})

app.get('/registerError', (req, res) => {
    res.render('registerError.ejs', { logged: logged })
})

app.get('/login', (req, res) => {
    res.render('login.ejs', { logged: logged })
})

app.post('/formRegister', async (req, res) => {
    const { emailUser, passwordUser, nombreUser, direccionUser, edadUser, telefonoUser, avatarUser, prefijoTelefonoUser } = req.body
    const encriptedPassword = await generateHash(passwordUser)
    const existeUsuario = snapshot.forEach((i) => {
        if (i.data().email === emailUser) {
            return true;
        }
    });
    if (existeUsuario) {
        res.redirect('/registerError')
    } else {
        const newUsuario = { email: emailUser, password: encriptedPassword, nombre: nombreUser, direccion: direccionUser, edad: edadUser, telefono: `+${prefijoTelefonoUser} ${telefonoUser}`, avatar: avatarUser, carrito: [] }
        nombreQuery = emailUser;
        const docRef = db.collection('users').doc(nombreQuery);
        nombreQuery = '';
        try {
            await docRef.set(newUsuario);
        } catch (error) {
            if (error) { log.debug(error); }
        }
        res.redirect('/login')
    }
})

app.post('/formLogin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/loginError' }))

app.get('/logout', (req, res) => {
    req.logOut(err => {
        if (err) {
            errorLog.error(err);
        } else {
            userGlobalEmail = ''
            logged = false
            res.redirect('/');
        }
    });
})

httpServer.listen(PORT, () => {
    log.info(`server ok en ${PORT}`)
})