"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mensajes = void 0;

var _options = require("./options.js");

var _clases = require("./clases.js");

var productos = new _clases.DBProductosSQL(_options.sqlOptions, 'productos');
var mensajes = new _clases.ContenedorMongoMensajes('mensajes', _options.mongodbOptions.schemaStrucure);
exports.mensajes = mensajes;