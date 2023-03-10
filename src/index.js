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
import { match } from "assert"

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const PORT = process.env.PORT
let nombreQuery = 'documento3'

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
            return done(null, false);
        } else {
            //ACA ESA EL ERROR______________________________________________________________________________
            const match = await verifyPass(pwdFlat, usuarioConHash.password)
            console.log(match);
            if (!match) {
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

app.post('/formRegister', async (req, res) => {
    const { emailUser, passwordUser } = req.body
    const encriptedPassword = await generateHash(passwordUser)
    const existeUsuario = snapshot.forEach((i) => {
        if (i.data().email === emailUser) {
            return true;
        }
    });
    if (existeUsuario) {
        res.redirect('/registerError')
    } else {
        const newUsuario = { email: emailUser, password: encriptedPassword }
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

app.listen(PORT, () => {
    console.log(`server ok en ${PORT}`)
})