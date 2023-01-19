"use strict";

// import express from 'express'
// import { Server as HttpServer } from "http"
// import { Server as IOServer } from "socket.io"
// import { sqlOptions } from './options.js';
// import { DBProductosSQL } from './clases.js';
// import { productosFakerNombre, productosFakerPrecio, productosFakerImagen } from './generacionProductos.js'
// import { engine } from 'express-handlebars';
// import { mensajes } from './index.js';
// import { normalize, schema, denormalize } from 'normalizr';
// const productos = new DBProductosSQL(sqlOptions, 'productos')
// const app = express()
// const httpServer = new HttpServer(app)
// const io = new IOServer(httpServer)
// app.use(express.static('./public'))
// //CONFIG HANDLEBARS PARA RENDERIZAR
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');
// const PORT = 8080
// //RUTAS
// app.get('/api/productos-test', (req, res) => {
//     res.render("vistaTabla.handlebars", { productosFakerNombre: productosFakerNombre, productosFakerPrecio: productosFakerPrecio, productosFakerImagen: productosFakerImagen })
// })
// //SOCKET
// io.on("connection", async socket => {
//     console.log("new cliente conectado")
//     mensajes.connectMongo()
//     socket.emit("productos", await productos.getAll())
//     const dataDB = await mensajes.listAll()
//     const dataDenormalizada = { id: 1, title: 'blogInicial', author: [], comments: [] }
//     dataDB.map(i => {
//         dataDenormalizada.comments.push({ id: i.author.mail, text: i.text, author: i.author.nombre })
//     })
//     dataDB.map(i => {
//         dataDenormalizada.author.push({ ...i.author, id: i.author.mail })
//     })
//     const authorSchema = new schema.Entity('authors')
//     const commentSchema = new schema.Entity('comments')
//     const postSchema = new schema.Entity('posts', {
//         author: [authorSchema],
//         comments: [commentSchema]
//     })
//     const normalizedData = normalize(dataDenormalizada, postSchema) //DATA NORMALIZADA
//     socket.emit('mensajes', dataDenormalizada)
//     //DATA "DENORMALIZADA"
//     const denormalizedData = denormalize(normalizedData.result, postSchema, normalizedData.entities);
//     //Aca me tira un [Symbol(id)] y no me deja acceder al objeto
//     socket.on("newMensaje", async data => {
//         await mensajes.insert(data)
//         const dataDB = await mensajes.listAll()
//         const dataDenormalizada = { id: 1, title: 'blogInicial', author: [], comments: [] }
//         dataDB.map(i => {
//             dataDenormalizada.comments.push({ id: i.author.mail, text: i.text, author: i.author.nombre })
//         })
//         dataDB.map(i => {
//             dataDenormalizada.author.push({ ...i.author, id: i.author.mail })
//         })
//         io.sockets.emit("arrayMensajes", { dataDenormalizada })
//     })
// })
// httpServer.listen(PORT, () => {
//     console.log("server ok");
// })
var express = require('express');

var session = require('express-session');

var mongoStore = require('connect-mongo');

var app = express();
var PORT = 8080;
app.use(session({
  store: mongoStore.create({
    mongoUrl: 'mongodb://localhost/sessions'
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60000
  }
}));
app.use(express["static"](__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var nombreUsuario;
var logout; //VARIABLE GLOBAL PARA HACER LA LOGICA DEL RENDERIZADO CON EJS

app.get('/', function (req, res) {
  if (nombreUsuario) {
    req.session.counter += 1;
  }

  res.render('index.ejs', {
    nombreUsuario: nombreUsuario,
    counter: req.session.counter,
    logout: logout
  });

  if (logout === true) {
    nombreUsuario = '';
  }

  logout = false;
});
app.post('/formPost', function (req, res) {
  nombreUsuario = req.body.nombre;
  req.session.counter = 0;
  res.redirect('/');
});
app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
      logout = true;
    }
  });
});
app.listen(PORT, console.log("server ok"));