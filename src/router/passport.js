import passport from 'passport';
import { log, errorLog, snapshot } from '../config/config.js'
import { LocalStrategy, verifyPass } from '../service/service.js';
import { userGlobalEmail, logged } from '../service/utils.js';

console.log('-----------------------------------------------passport file');

const Passport = passport

Passport.use(new LocalStrategy(
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
            // userGlobalEmail = usuarioConHash.email
            // logged = true
            userGlobalEmail.userGlobalEmail = usuarioConHash.email
            logged.logged = true
            return done(null, usuarioConHash);
        }
    }
));

Passport.serializeUser((usuario, done) => {
    done(null, usuario.email);
});

Passport.deserializeUser((emailUser, done) => {
    let existeUsuario
    snapshot.forEach((i) => {
        if (i.data().email === emailUser) {
            existeUsuario = { email: i.data().email, password: i.data().password }
        }
    });
    done(null, existeUsuario);
});

export { Passport }