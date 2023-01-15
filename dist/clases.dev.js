"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContenedorMongoMensajes = exports.DBMensajesSqlite3 = exports.DBProductosSQL = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _options = require("./options.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DBProductosSQL =
/*#__PURE__*/
function () {
  function DBProductosSQL(options, tableName) {
    _classCallCheck(this, DBProductosSQL);

    this.options = options;
    this.tableName = tableName;
  }

  _createClass(DBProductosSQL, [{
    key: "createTable",
    value: function createTable() {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection.schema.createTable(this.tableName, function (table) {
        table.increments('id').primary();
        table.string('nombre'), table.integer('precio');
      }).then(function () {
        console.log('tabla creada');
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }, {
    key: "pushData",
    value: function pushData(data) {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection(this.tableName).insert(data).then(function () {
        console.log('info insertada');
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var knexConnection, data;
      return regeneratorRuntime.async(function getAll$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              knexConnection = (0, _knex["default"])(this.options);
              data = knexConnection.from(this.tableName).select('*');
              return _context.abrupt("return", data.then(function (rows) {
                return rows;
              })["catch"](function (err) {
                console.log(err);
              })["finally"](function () {
                knexConnection.destroy();
              }));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getById",
    value: function getById(id) {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection.from(this.tableName).select('*').where('id', '=', id).then(function (rows) {
        console.log(rows);
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(id) {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection.from(this.tableName).select('*').where('id', '=', id).del().then(function () {
        console.log("borrado con exito");
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }, {
    key: "updateById",
    value: function updateById(id, data) {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection.from(this.tableName).select('*').where('id', '=', id).update(data).then(function () {
        console.log("actualizado con exito");
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }]);

  return DBProductosSQL;
}();

exports.DBProductosSQL = DBProductosSQL;

var DBMensajesSqlite3 =
/*#__PURE__*/
function () {
  function DBMensajesSqlite3(options, tableName) {
    _classCallCheck(this, DBMensajesSqlite3);

    this.options = options;
    this.tableName = tableName;
  }

  _createClass(DBMensajesSqlite3, [{
    key: "createTable",
    value: function createTable() {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection.schema.createTable(this.tableName, function (table) {
        table.increments('id').primary();
        table.string('nombre'), table.string('apellido'), table.integer('edad'), table.string('alias'), table.string('avatar'), table.string('text');
      }).then(function () {
        console.log('tabla creada');
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }, {
    key: "pushData",
    value: function pushData(data) {
      //faltaría que la info venga del front capaz
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection(this.tableName).insert(data).then(function () {
        console.log('mensaje insertado');
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var knexConnection, data;
      return regeneratorRuntime.async(function getAll$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              knexConnection = (0, _knex["default"])(this.options);
              data = knexConnection.from(this.tableName).select('*');
              return _context2.abrupt("return", data.then(function (rows) {
                return rows;
              }));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getById",
    value: function getById(id) {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection.from(this.tableName).select('*').where('id', '=', id).then(function (rows) {
        console.log(rows);
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(id) {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection.from(this.tableName).select('*').where('id', '=', id).del().then(function () {
        console.log("borrado con exito");
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }, {
    key: "updateById",
    value: function updateById(id, data) {
      var knexConnection = (0, _knex["default"])(this.options);
      knexConnection.from(this.tableName).select('*').where('id', '=', id).update(data).then(function () {
        console.log("actualizado con exito");
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        knexConnection.destroy();
      });
    }
  }]);

  return DBMensajesSqlite3;
}();

exports.DBMensajesSqlite3 = DBMensajesSqlite3;
var connect;

var ContenedorMongoMensajes =
/*#__PURE__*/
function () {
  function ContenedorMongoMensajes(nombreColeccion, esquema) {
    _classCallCheck(this, ContenedorMongoMensajes);

    this.schema = new _mongoose["default"].Schema(esquema);
    this.coleccion = _mongoose["default"].model(nombreColeccion, this.schema); // crea la coleccion de una
  }

  _createClass(ContenedorMongoMensajes, [{
    key: "connectMongo",
    value: function connectMongo() {
      return regeneratorRuntime.async(function connectMongo$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              try {
                _mongoose["default"].connect(_options.mongodbOptions.cnstr, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
                });

                connect = _mongoose["default"].connection;
                console.log('mongo ok');
              } catch (error) {
                console.log(error);
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "insert",
    value: function insert(data) {
      return regeneratorRuntime.async(function insert$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(connect.collection(this.coleccion.collection.name).insertOne(data));

            case 3:
              _context4.next = 8;
              break;

            case 5:
              _context4.prev = 5;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 5]]);
    }
  }, {
    key: "listAll",
    value: function listAll() {
      var read;
      return regeneratorRuntime.async(function listAll$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.coleccion.find({}));

            case 3:
              read = _context5.sent;
              return _context5.abrupt("return", read);

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }, {
    key: "listById",
    value: function listById(id) {
      var read;
      return regeneratorRuntime.async(function listById$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.coleccion.find({
                _id: id
              }));

            case 3:
              read = _context6.sent;
              console.log(read);
              _context6.next = 10;
              break;

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }, {
    key: "updateById",
    value: function updateById(id) {
      return regeneratorRuntime.async(function updateById$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return regeneratorRuntime.awrap(this.coleccion.updateOne({
                _id: id
              }, {
                title: "pepe"
              }));

            case 3:
              _context7.next = 8;
              break;

            case 5:
              _context7.prev = 5;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[0, 5]]);
    }
  }, {
    key: "deleteById",
    value: function deleteById(id) {
      return regeneratorRuntime.async(function deleteById$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return regeneratorRuntime.awrap(this.coleccion.deleteOne({
                _id: id
              }));

            case 3:
              _context8.next = 8;
              break;

            case 5:
              _context8.prev = 5;
              _context8.t0 = _context8["catch"](0);
              console.log(_context8.t0);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this, [[0, 5]]);
    }
  }]);

  return ContenedorMongoMensajes;
}();

exports.ContenedorMongoMensajes = ContenedorMongoMensajes;