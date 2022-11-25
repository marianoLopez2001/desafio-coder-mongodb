const express = require("express")
const {Server: HttpServer} = require("http")
const {Server: IOServer} = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))

const PORT = 8080

const productos = []

io.on("connection", socket => {
    console.log("new cliente conectado")
    socket.emit("productos", productos)
    socket.on("newProducto", data => {
        productos.push(data)
        io.sockets.emit("arrayProductos", productos)
    })
})

httpServer.listen(PORT, () => {
    console.log("server ok");
})

