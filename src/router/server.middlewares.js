import passport from 'passport'
import session from 'express-session'
import { snapshot } from '../service/service.js'
import { log, errorLog } from '../config/config.js'
import { verifyPass } from '../service/service.js'
import { app } from "../index.js"

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
