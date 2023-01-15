import express from 'express'
import { Server as HttpServer } from "http"
import { Server as IOServer } from "socket.io"
import { sqlOptions } from './options.js';
import { DBProductosSQL } from './clases.js';
import { productosFakerNombre, productosFakerPrecio, productosFakerImagen } from './generacionProductos.js'
import { engine } from 'express-handlebars';
import { mensajes } from './index.js';
import { normalize, schema, denormalize } from 'normalizr';

const productos = new DBProductosSQL(sqlOptions, 'productos')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))

//CONFIG HANDLEBARS PARA RENDERIZAR
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const PORT = 8080

//RUTAS

app.get('/api/productos-test', (req, res) => {
    res.render("vistaTabla.handlebars", { productosFakerNombre: productosFakerNombre, productosFakerPrecio: productosFakerPrecio, productosFakerImagen: productosFakerImagen })
})

//SOCKET

io.on("connection", async socket => {
    console.log("new cliente conectado")
    mensajes.connectMongo()
    socket.emit("productos", await productos.getAll())

    const dataDB = await mensajes.listAll()

    const dataDenormalizada = { id: 1, title: 'blogInicial', author: [], comments: [] }
    dataDB.map(i => {
        dataDenormalizada.comments.push({ id: i.author.mail, text: i.text, author: i.author.nombre })
    })
    dataDB.map(i => {
        dataDenormalizada.author.push({ ...i.author, id: i.author.mail })
    })

    const authorSchema = new schema.Entity('authors')
    const commentSchema = new schema.Entity('comments')
    const postSchema = new schema.Entity('posts', {
        author: [authorSchema],
        comments: [commentSchema]
    })
    const normalizedData = normalize(dataDenormalizada, postSchema) //DATA NORMALIZADA
    console.log(dataDenormalizada);
    socket.emit('mensajes', dataDenormalizada)
    console.log(JSON.stringify(normalizedData));

    //DATA "DENORMALIZADA"
    const denormalizedData = denormalize(normalizedData.result, postSchema, normalizedData.entities);
    //Aca me tira un [Symbol(id)] y no me deja acceder al objeto

    socket.on("newMensaje", async data => {
        await mensajes.insert(data)
        const dataDB = await mensajes.listAll()

        const dataDenormalizada = { id: 1, title: 'blogInicial', author: [], comments: [] }
        dataDB.map(i => {
            dataDenormalizada.comments.push({ id: i.author.mail, text: i.text, author: i.author.nombre })
        })
        dataDB.map(i => {
            dataDenormalizada.author.wpush({ ...i.author, id: i.author.mail })
        })
        io.sockets.emit("arrayMensajes", { dataDenormalizada })
    })
})


httpServer.listen(PORT, () => {
    console.log("server ok");
})




