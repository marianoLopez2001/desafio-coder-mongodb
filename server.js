import express from 'express'
import { Server as HttpServer } from "http"
import { Server as IOServer } from "socket.io"

//_______________________________

import { sqlOptions } from './options.js';
import { DBProductosSQL } from './clases.js';
import { sqlite3Options } from "./options.js";
import { DBMensajesSqlite3 } from './clases.js';

const mensajes = new DBMensajesSqlite3(sqlite3Options, 'mensajes')
const productos = new DBProductosSQL(sqlOptions, 'productos')

//METODOS CRUD PARA PRODUCTOS CON SQL
// productos.createTable()
// productos.pushData({nombre: "hola", precio: 20})
// productos.getById(4)
// productos.updateById(6, { precio: 50 })
// productos.deleteById(3)
// productos.getAll()

//METODOS CRUD PARA MENSAJES CON SQLITE3
// mensajes.createTable()
// mensajes.pushData({nombre: "asd", mail: "asd", mensaje: "asd"})
// mensajes.getById(4)
// mensajes.updateById(6, { mail: "jeje" })
// mensajes.deleteById(3)
// mensajes.getAll()

//_____________________________
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))

const PORT = 8080

io.on("connection", async socket => {
    console.log("new cliente conectado")
    socket.emit("productos", await productos.getAll())
    socket.emit("mensajes", await mensajes.getAll())
    socket.on("newProducto", async data => {
        productos.pushData(data)
        io.sockets.emit("arrayProductos", await productos.getAll())
    })
    socket.on("newMensaje", async data => {
        mensajes.pushData(data)
        io.sockets.emit("arrayMensajes", await mensajes.getAll())
    })
})

httpServer.listen(PORT, () => {
    console.log("server ok");
})


