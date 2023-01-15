"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productosFakerImagen = exports.productosFakerPrecio = exports.productosFakerNombre = void 0;

var _faker = _interopRequireDefault(require("faker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productosFakerNombre;
exports.productosFakerNombre = productosFakerNombre;
var productosFakerPrecio;
exports.productosFakerPrecio = productosFakerPrecio;
var productosFakerImagen;
exports.productosFakerImagen = productosFakerImagen;

for (var i = 0; i < 5; i++) {
  exports.productosFakerNombre = productosFakerNombre = productosFakerNombre + (_faker["default"].commerce.productName() + ';');
}

for (var _i = 0; _i < 5; _i++) {
  exports.productosFakerPrecio = productosFakerPrecio = productosFakerPrecio + (_faker["default"].commerce.price(100, 500) + ';');
}

for (var _i2 = 0; _i2 < 5; _i2++) {
  exports.productosFakerImagen = productosFakerImagen = productosFakerImagen + (_faker["default"].image.animals() + ';');
}

exports.productosFakerNombre = productosFakerNombre = productosFakerNombre.split(';').map(function (i) {
  return i.replace('undefined', '');
});
exports.productosFakerPrecio = productosFakerPrecio = productosFakerPrecio.split(';').map(function (i) {
  return i.replace('undefined', '');
});
exports.productosFakerImagen = productosFakerImagen = productosFakerImagen.split(';').map(function (i) {
  return i.replace('undefined', '');
}); //aca me tiraba undefined faker dentro de la imagen

productosFakerNombre.length = productosFakerNombre.length - 1;
productosFakerPrecio.length = productosFakerPrecio.length - 1;
productosFakerImagen.length = productosFakerImagen.length - 1; //y despues me agregaba un elemento vacio (''), a pesar de que le especifiqué que solo quería 5