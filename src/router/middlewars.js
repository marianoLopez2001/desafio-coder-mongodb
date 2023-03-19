import session from 'express-session'
import { Passport } from './passport.js'
import express from 'express'

const app = express()

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

export { app }
