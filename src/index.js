import { PORT } from "./config/config.js"
import { isAuth } from './service/service.js'
import { app } from './router/middlewars.js'
import passport from "passport"
import { getData } from "./service/service.js"
import { httpServer } from "./router/middlewars.js"
import { getInicio, logout, register, loginError, login, formRegister, registerError } from './router/routes.functions.js'

//FUNCION FETCH PARA PRODUCTOS

export const Productos = await getData()

//RUTAS

app.get('/', isAuth, getInicio)

app.get('/register', register)

app.get('/loginError', loginError)

app.get('/registerError', registerError)

app.get('/login', login)

app.get('/logout', logout)

app.post('/formRegister', formRegister)

app.post('/formLogin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/loginError' }))

httpServer.listen(PORT, () => {
    console.log('server ok');
})

