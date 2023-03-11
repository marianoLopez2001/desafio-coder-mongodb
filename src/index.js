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
import log4js from 'log4js'

log4js.configure({
    appenders: {
        consoleLog: { type: "console" },
    },
    categories: {
        default: { appenders: ['consoleLog'], level: 'trace' },
    }
})

let log = log4js.getLogger()
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const httpServer = new HTTPServer(app)
const io = new IoServer(httpServer)

const PORT = process.env.PORT | 8081
let nombreQuery = 'documento3'

let carrito = []

const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    return res.json()
}

let Productos = await getData()

// io.on("connection", async socket => {
//     socket.on("newProd", (data) => {
//         carrito.push(Productos[parseInt(data)-1])
//         log.info(carrito)
//     })
// })

io.on("connection", async socket => {
    socket.on("newProd", async (data) => {
        const docArray = await (await db.collection('users').doc('pepe@gmail.com').get('carrito')).data().carrito
        await db.collection('users').doc('pepe@gmail.com').update({ carrito: [...docArray, Productos[parseInt(data)-1]] })
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
            console.log('usuario no existe');
            return done(null, false);
        } else {
            console.log('usuario existe');
            const match = await verifyPass(pwdFlat, usuarioConHash.password)
            console.log(match);
            if (!match) {
                console.log('no match');
                return done(null, false)
            }
            userGlobalEmail = usuarioConHash.email
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

// app.get('/', isAuth, (req, res) => {
//     res.render("inicio.ejs", { email: userGlobalEmail, logged: logged })
// })

app.get('/', (req, res) => {
    res.render("inicio.ejs", { email: userGlobalEmail, logged: logged, productos: Productos })
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
            if (error) { console.log(error); }
        }
        res.redirect('/login')
    }
})

app.post('/formLogin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/loginError' }))

app.get('/logout', (req, res) => {
    req.logOut(err => {
        if (err) {
            console.log(err);
        } else {
            userGlobalEmail = ''
            logged = false
            res.redirect('/');
        }
    });
})

httpServer.listen(PORT, () => {
    console.log(`server ok en ${PORT}`)
})