export async function getInicio(req, res) {
    const docArray = (await db.collection('users').doc(userGlobalEmail.userGlobalEmail).get('carrito')).data().carrito
    const userInfo = (await db.collection('users').doc(userGlobalEmail.userGlobalEmail).get()).data()
    log.debug(userGlobalEmail.userGlobalEmail)
    res.render("inicio.ejs", { email: userGlobalEmail.userGlobalEmail, logged: logged.logged, productos: Productos, carrito: docArray, user: userInfo })
}

export function register(req, res) {
    res.render('register.ejs', { logged: logged.logged })
}

export function loginError(req, res) {
    res.render('loginError.ejs', { logged: logged.logged })
}

export function login(req, res) {
    res.render('login.ejs', { logged: logged.logged })
}

export function registerError(req, res) {
    res.render('registerError.ejs', { logged: logged.logged })
}

export async function formRegister(req, res) {
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
                throw new ErrorClass(500, error)
            }
        } catch (error) {
            throw new ErrorClass(500, error)
        }
        res.redirect('/login')
    }
}

export function logout(req, res) {
    req.logOut(err => {
        if (err) {
            throw new ErrorClass(500, error)
        } else {
            userGlobalEmail.userGlobalEmail = ''
            logged.logged = false
            res.redirect('/');
        }
    });
}