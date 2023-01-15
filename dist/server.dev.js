"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _socket = require("socket.io");

var _options = require("./options.js");

var _clases = require("./clases.js");

var _generacionProductos = require("./generacionProductos.js");

var _expressHandlebars = require("express-handlebars");

var _index = require("./index.js");

var _normalizr = require("normalizr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var productos = new _clases.DBProductosSQL(_options.sqlOptions, 'productos');
var app = (0, _express["default"])();
var httpServer = new _http.Server(app);
var io = new _socket.Server(httpServer);
app.use(_express["default"]["static"]('./public')); //CONFIG HANDLEBARS PARA RENDERIZAR

app.engine('handlebars', (0, _expressHandlebars.engine)());
app.set('view engine', 'handlebars');
app.set('views', './views');
var PORT = 8080; //RUTAS

app.get('/api/productos-test', function (req, res) {
  res.render("vistaTabla.handlebars", {
    productosFakerNombre: _generacionProductos.productosFakerNombre,
    productosFakerPrecio: _generacionProductos.productosFakerPrecio,
    productosFakerImagen: _generacionProductos.productosFakerImagen
  });
}); //SOCKET

io.on("connection", function _callee2(socket) {
  var dataDB, dataDenormalizada, authorSchema, commentSchema, postSchema, normalizedData, denormalizedData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("new cliente conectado");

          _index.mensajes.connectMongo();

          _context2.t0 = socket;
          _context2.next = 5;
          return regeneratorRuntime.awrap(productos.getAll());

        case 5:
          _context2.t1 = _context2.sent;

          _context2.t0.emit.call(_context2.t0, "productos", _context2.t1);

          _context2.next = 9;
          return regeneratorRuntime.awrap(_index.mensajes.listAll());

        case 9:
          dataDB = _context2.sent;
          dataDenormalizada = {
            id: 1,
            title: 'blogInicial',
            author: [],
            comments: []
          };
          dataDB.map(function (i) {
            dataDenormalizada.comments.push({
              id: i.author.mail,
              text: i.text,
              author: i.author.nombre
            });
          });
          dataDB.map(function (i) {
            dataDenormalizada.author.push(_objectSpread({}, i.author, {
              id: i.author.mail
            }));
          });
          authorSchema = new _normalizr.schema.Entity('authors');
          commentSchema = new _normalizr.schema.Entity('comments');
          postSchema = new _normalizr.schema.Entity('posts', {
            author: [authorSchema],
            comments: [commentSchema]
          });
          normalizedData = (0, _normalizr.normalize)(dataDenormalizada, postSchema); //DATA NORMALIZADA

          socket.emit('mensajes', dataDenormalizada); //DATA "DENORMALIZADA"

          denormalizedData = (0, _normalizr.denormalize)(normalizedData.result, postSchema, normalizedData.entities); //Aca me tira un [Symbol(id)] y no me deja acceder al objeto

          socket.on("newMensaje", function _callee(data) {
            var dataDB, dataDenormalizada;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(_index.mensajes.insert(data));

                  case 2:
                    _context.next = 4;
                    return regeneratorRuntime.awrap(_index.mensajes.listAll());

                  case 4:
                    dataDB = _context.sent;
                    dataDenormalizada = {
                      id: 1,
                      title: 'blogInicial',
                      author: [],
                      comments: []
                    };
                    dataDB.map(function (i) {
                      dataDenormalizada.comments.push({
                        id: i.author.mail,
                        text: i.text,
                        author: i.author.nombre
                      });
                    });
                    dataDB.map(function (i) {
                      dataDenormalizada.author.push(_objectSpread({}, i.author, {
                        id: i.author.mail
                      }));
                    });
                    io.sockets.emit("arrayMensajes", {
                      dataDenormalizada: dataDenormalizada
                    });

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
});
httpServer.listen(PORT, function () {
  console.log("server ok");
});