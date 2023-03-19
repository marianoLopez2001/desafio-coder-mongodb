import { PORT } from "./config/config.js"
import { isAuth, LocalStrategy } from './service/service.js'
import { db, log, errorLog, snapshot } from './config/config.js'
import { app } from './router/middlewars.js'
import passport from "passport"
import { userGlobalEmail, logged, nombreQuery } from "./service/utils.js"
import { getData } from "./service/service.js"
import { httpServer } from "./router/middlewars.js"

export const Productos = await getData()

app.get('/', isAuth, async (req, res) => {
    const docArray = (await db.collection('users').doc(userGlobalEmail.userGlobalEmail).get('carrito')).data().carrito
    const userInfo = (await db.collection('users').doc(userGlobalEmail.userGlobalEmail).get()).data()
    log.debug(userGlobalEmail.userGlobalEmail)
    res.render("inicio.ejs", { email: userGlobalEmail.userGlobalEmail, logged: logged.logged, productos: Productos, carrito: docArray, user: userInfo })
})

app.get('/register', (req, res) => {
    res.render('register.ejs', { logged: logged.logged })
})

app.get('/loginError', (req, res) => {
    res.render('loginError.ejs', { logged: logged.logged })
})

app.get('/registerError', (req, res) => {
    res.render('registerError.ejs', { logged: logged.logged })
})

app.get('/login', (req, res) => {
    res.render('login.ejs', { logged: logged.logged })
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
        nombreQuery.nombreQuery = emailUser;
        const docRef = db.collection('users').doc(nombreQuery.nombreQuery);
        nombreQuery.nombreQuery = '';
        try {
            await docRef.set(newUsuario);
            const mailOptions = {
                from: 'Administrador',
                to: nodemailerUser,
                subject: 'nuevo usuario',
                html: `<p>${JSON.stringify(newUsuario)}</p>`
            }
            try {
                const msg = await transporter.sendMail(mailOptions)
                log.info(msg)
            } catch (error) {
                errorLog.error(error)
            }
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
            userGlobalEmail.userGlobalEmail = ''
            logged.logged = false
            res.redirect('/');
        }
    });
})

httpServer.listen(PORT, () => {
    console.log('server ok');
})

