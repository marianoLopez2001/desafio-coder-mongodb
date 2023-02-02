// import express from 'express'
// import { Server as HttpServer } from "http"
// import { Server as IOServer } from "socket.io"
// import { sqlOptions } from './options.js';
// import { DBProductosSQL } from './clases.js';
// import { productosFakerNombre, productosFakerPrecio, productosFakerImagen } from './generacionProductos.js'
// import { engine } from 'express-handlebars';
// import { mensajes } from './index.js';
// import { normalize, schema, denormalize } from 'normalizr';

// const productos = new DBProductosSQL(sqlOptions, 'productos')

// const app = express()
// const httpServer = new HttpServer(app)
// const io = new IOServer(httpServer)

// app.use(express.static('./public'))

// //CONFIG HANDLEBARS PARA RENDERIZAR
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// const PORT = 8080

// //RUTAS

// app.get('/api/productos-test', (req, res) => {
//     res.render("vistaTabla.handlebars", { productosFakerNombre: productosFakerNombre, productosFakerPrecio: productosFakerPrecio, productosFakerImagen: productosFakerImagen })
// })

// //SOCKET

// io.on("connection", async socket => {
//     console.log("new cliente conectado")
//     mensajes.connectMongo()
//     socket.emit("productos", await productos.getAll())

//     const dataDB = await mensajes.listAll()

//     const dataDenormalizada = { id: 1, title: 'blogInicial', author: [], comments: [] }
//     dataDB.map(i => {
//         dataDenormalizada.comments.push({ id: i.author.mail, text: i.text, author: i.author.nombre })
//     })
//     dataDB.map(i => {
//         dataDenormalizada.author.push({ ...i.author, id: i.author.mail })
//     })

//     const authorSchema = new schema.Entity('authors')
//     const commentSchema = new schema.Entity('comments')
//     const postSchema = new schema.Entity('posts', {
//         author: [authorSchema],
//         comments: [commentSchema]
//     })
//     const normalizedData = normalize(dataDenormalizada, postSchema) //DATA NORMALIZADA
//     socket.emit('mensajes', dataDenormalizada)

//     //DATA "DENORMALIZADA"
//     const denormalizedData = denormalize(normalizedData.result, postSchema, normalizedData.entities);
//     //Aca me tira un [Symbol(id)] y no me deja acceder al objeto

//     socket.on("newMensaje", async data => {
//         await mensajes.insert(data)
//         const dataDB = await mensajes.listAll()

//         const dataDenormalizada = { id: 1, title: 'blogInicial', author: [], comments: [] }
//         dataDB.map(i => {
//             dataDenormalizada.comments.push({ id: i.author.mail, text: i.text, author: i.author.nombre })
//         })
//         dataDB.map(i => {
//             dataDenormalizada.author.push({ ...i.author, id: i.author.mail })
//         })
//         io.sockets.emit("arrayMensajes", { dataDenormalizada })
//     })
// })


// httpServer.listen(PORT, () => {
//     console.log("server ok");
// })

import express, { json } from 'express'
import session from 'express-session'
import passport from 'passport'
import bcrypt from "bcrypt"
import { Strategy } from 'passport-local'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import dotenv from 'dotenv'
import minimist from 'minimist'
import fs from 'fs'

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url));

const LocalStrategy = Strategy
const app = express()

const PORT = minimist(process.argv)._.slice(2)[0] || 8080

const credencialesRead = JSON.parse(fs.readFileSync('.env', 'utf-8'))
const cnxstr = 'mongodb://localhost:27017/users'
const secret = credencialesRead.secret
let userGlobalEmail = ''
let logged = false

const generateHash = async (passwordUser) => {
    const hashPassword = await bcrypt.hash(passwordUser, 10);
    return hashPassword
}

const verifyPass = async (user, passwordUser) => {
    const match = await bcrypt.compare(passwordUser, user.password)
    return match
}

passport.use(new LocalStrategy(
    async function (username, password, done) {
        const existeUsuario = credencialesRead.credenciales.find(i => i.email === username)

        if (!existeUsuario) {
            return done(null, false);
        } else {
            const match = await verifyPass(existeUsuario, password)
            if (!match) {
                return done(null, false)
            }
            userGlobalEmail = existeUsuario.email
            return done(null, existeUsuario);
        }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.email);
});

passport.deserializeUser((emailUser, done) => {
    const existeUsuario = credencialesRead.credenciales.find(i => i.email === emailUser);
    done(null, existeUsuario);
});

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        logged = true
        next()
    } else {
        res.redirect('/login')
    }
}

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000 //10 min
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', isAuth, (req, res) => {
    res.render("inicio.ejs", { email: userGlobalEmail, logged: logged })
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

app.get('/info', (req, res) => {
    let argumentosEntrada = minimist(process.argv)._.length !== 2 ? minimist(process.argv)._.slice(2) : 'No hay argumentos de entrada';
    let OS = process.platform
    let nodeVersion = process.version
    let rrs = process.memoryUsage()
    let pathAbsolute = process.cwd()
    let pathEjecucion = minimist(process.argv)._[0]
    let processId = process.pid
    res.render('info.ejs', { logged: logged, argumentosEntrada: argumentosEntrada, OS: OS, nodeVersion: nodeVersion, rrs: rrs, pathAbsolute: pathAbsolute, pathEjecucion: pathEjecucion, processId: processId })
})

app.post('/formRegister', async (req, res) => {
    const { emailUser, passwordUser } = req.body
    const encriptedPassword = await generateHash(passwordUser)
    const existeUsuario = credencialesRead.credenciales.find(i => i.email === emailUser);
    if (existeUsuario) {
        res.redirect('/registerError')
    } else {
        const newUsuario = { email: emailUser, password: encriptedPassword }
        credencialesRead.credenciales.push(newUsuario)
        fs.writeFileSync('.env', JSON.stringify(credencialesRead))
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

app.listen(PORT, console.log("server ok"))


