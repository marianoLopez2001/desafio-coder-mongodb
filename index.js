import { sqlOptions, sqlite3Options, mongodbOptions } from './options.js';
import { DBProductosSQL, DBMensajesSqlite3, ContenedorMongoMensajes } from './clases.js';

const productos = new DBProductosSQL(sqlOptions, 'productos')
export const mensajes = new ContenedorMongoMensajes('mensajes', mongodbOptions.schemaStrucure)

