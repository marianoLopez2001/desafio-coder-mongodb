import express, { Router } from 'express'
import session from 'express-session'
import passport from 'passport'
import bcrypt from "bcrypt"
import { Strategy } from 'passport-local'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import minimist from 'minimist'
import fs from 'fs'
import { fork } from 'child_process'
import { Server as IoServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import os from 'os'
import cluster from 'cluster'
import compression from 'compression'
import log4js from 'log4js'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));
const LocalStrategy = Strategy
const app = express()
const httpServer = new HTTPServer(app)
const io = new IoServer(httpServer)

const PORT = minimist(process.argv)._[2] || 8080
const MODE = minimist(process.argv)._[3] || 'FORK'
let procesadores = os.cpus().length

const credencialesRead = JSON.parse(fs.readFileSync('.env', 'utf-8'))
const cnxstr = 'mongodb://localhost:27017/users'
const secret = credencialesRead.secret
let userGlobalEmail = ''
let logged = false
const router = new Router();

//========================================LOG4JS CONFIG=================================

log4js.configure({
    appenders: {
        consoleLog: { type: "console" },
        fileLog: { type: 'file', filename: 'warn.log' },
        fileLogError: { type: 'file', filename: 'error.log' }
    },
    categories: {
        default: { appenders: ['consoleLog'], level: 'trace' },

        fileErrorConsole: { appenders: ['fileLogError', 'consoleLog'], level: 'error' },
        fileWarnConsole: { appenders: ['fileLog', 'consoleLog'], level: 'trace' },
    }
})

let loggerWarnAndConsole = log4js.getLogger('fileWarnConsole')
let loggerFileError = log4js.getLogger('fileErrorConsole')

//========================================MIDDLEWARE=================================

function mdwWarn(req, res, next) {
    loggerWarnAndConsole.info({ methodo: req.method, endpoint: req.path })
    next();
}

//=======================================BCRYPT=======================================

const generateHash = async (passwordUser) => {
    const hashPassword = await bcrypt.hash(passwordUser, 10);
    return hashPassword
}

const verifyPass = async (user, passwordUser) => {
    const match = await bcrypt.compare(passwordUser, user.password)
    return match
}

//=======================================PASSPORT=======================================
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

app.use(compression()) //2.1 kb | 1.3kb

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router)
app.use(express.static(__dirname + '/public'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//=======================================RUTAS CON CLUSTER O FORK=======================================
if (MODE === 'CLUSTER') {
    if (cluster.isPrimary) {

        console.log(`master is running in ${process.pid} en ${procesadores} procesadores`);

        for (let i = 0; i < procesadores; i++) {
            cluster.fork()
        }

    } else {

        router.get('/randoms', mdwWarn, (req, res) => {
            res.sendFile(__dirname + '/public/array.html')
        });

        app.get('/register', mdwWarn, (req, res) => {
            res.render('register.ejs', { logged: logged })
        })

        app.get('/loginError', mdwWarn, (req, res) => {
            res.render('loginError.ejs', { logged: logged })
        })

        app.get('/registerError', mdwWarn, (req, res) => {
            res.render('registerError.ejs', { logged: logged })
        })

        app.get('/login', mdwWarn, (req, res) => {
            res.render('login.ejs', { logged: logged })
        })

        app.get('/info', mdwWarn, (req, res) => {
            let argumentosEntrada = minimist(process.argv)._.length !== 2 ? minimist(process.argv)._.slice(2) : 'No hay argumentos de entrada';
            let OS = process.platform
            let nodeVersion = process.version
            let rrs = process.memoryUsage().rss
            let pathAbsolute = process.cwd()
            let pathEjecucion = minimist(process.argv)._[0]
            let processId = process.pid
            loggerWarnAndConsole.info([argumentosEntrada, OS, puerto, nodeVersion, rrs, pathAbsolute, pathEjecucion, processId])
            res.render('info.ejs', { Puerto: PORT, logged: logged, procesadores: procesadores, argumentosEntrada: argumentosEntrada, OS: OS, nodeVersion: nodeVersion, rrs: rrs, pathAbsolute: pathAbsolute, pathEjecucion: pathEjecucion, processId: processId })
        })

        app.post('/formRegister', mdwWarn, async (req, res) => {
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

        app.post('/formLogin', mdwWarn, passport.authenticate('local', { successRedirect: '/', failureRedirect: '/loginError' }))

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

        app.get('*', function (req, res) {
            loggerWarnAndConsole.warn({ methodo: req.method, endpoint: req.path })
            res.sendStatus(404)
        })

        httpServer.listen(PORT, console.log("server ok en puerto " + PORT + ', PID Worker: ' + process.pid))
    }
} else {
    console.log('MODO FORK');

    router.get('/randoms', mdwWarn, (req, res) => {
        res.sendFile(__dirname + '/public/array.html')
    });

    app.get('/register', mdwWarn, (req, res) => {
        res.render('register.ejs', { logged: logged })
    })

    app.get('/loginError', mdwWarn, (req, res) => {
        res.render('loginError.ejs', { logged: logged })
    })

    app.get('/registerError', mdwWarn, (req, res) => {
        res.render('registerError.ejs', { logged: logged })
    })

    app.get('/login', mdwWarn, (req, res) => {
        res.render('login.ejs', { logged: logged })
    })

    app.get('/info', mdwWarn, (req, res) => {
        let argumentosEntrada = minimist(process.argv)._.length !== 2 ? minimist(process.argv)._.slice(2) : 'No hay argumentos de entrada';
        let OS = process.platform
        let puerto = PORT
        let nodeVersion = process.version
        let rrs = process.memoryUsage().rss
        let pathAbsolute = process.cwd()
        let pathEjecucion = minimist(process.argv)._[0]
        let processId = process.pid
        loggerWarnAndConsole.info([argumentosEntrada, OS, puerto, nodeVersion, rrs, pathAbsolute, pathEjecucion, processId])
        res.render('info.ejs', { Puerto: PORT, logged: logged, Puerto: puerto, procesadores: procesadores, argumentosEntrada: argumentosEntrada, OS: OS, nodeVersion: nodeVersion, rrs: rrs, pathAbsolute: pathAbsolute, pathEjecucion: pathEjecucion, processId: processId })
    })

    app.post('/formRegister', mdwWarn, async (req, res) => {
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

    app.post('/formLogin', mdwWarn, passport.authenticate('local', { successRedirect: '/', failureRedirect: '/loginError' }))

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

    //PARA RUTAS INEXISTENTES

    app.get('*', function (req, res) {
        loggerWarnAndConsole.warn({ methodo: req.method, endpoint: req.path })
        res.sendStatus(404)
    })

    httpServer.listen(PORT, console.log("server ok en puerto " + PORT + ', PID Worker: ' + process.pid))
} 
