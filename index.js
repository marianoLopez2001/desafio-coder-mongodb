import { sqlOptions } from './options.js';
import { DBProductosSQL } from './clases.js';
import { sqlite3Options } from "./options.js";
import { DBMensajesSqlite3 } from './clases.js';

//T t

const productos = new DBProductosSQL(sqlOptions, 'productos')
const mensajes = new DBMensajesSqlite3(sqlite3Options, 'mensajes')

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

