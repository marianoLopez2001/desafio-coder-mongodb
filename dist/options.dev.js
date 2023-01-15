"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongodbOptions = exports.sqlite3Options = exports.sqlOptions = void 0;
var sqlOptions = {
  client: "mysql",
  connection: {
    host: '127.0.0.1',
    user: "lopezmariano",
    password: 'password',
    database: 'db-coder-desafio',
    port: 3307
  }
};
exports.sqlOptions = sqlOptions;
var sqlite3Options = {
  client: "sqlite3",
  connection: {
    filename: './db//sqlite3DB.sqlite'
  },
  useNullAsDefault: true
};
exports.sqlite3Options = sqlite3Options;
var mongodbOptions = {
  cnstr: 'mongodb://localhost:27017',
  schemaStrucure: {
    author: {
      nombre: {
        type: String,
        required: true
      },
      apellido: {
        type: String,
        required: true
      },
      mail: {
        type: String,
        required: true
      },
      edad: {
        type: Number,
        required: true
      },
      alias: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      }
    },
    text: {
      type: String,
      required: true
    }
  }
};
exports.mongodbOptions = mongodbOptions;