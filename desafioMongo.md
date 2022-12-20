# INSERTS
ecommerce> db.mensajes.insertOne({nombre:'mariano', mail: 'mariano@gmail.com', mensaje: 'Este es un mensaje'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1e8614b9aac026c17d0ab")
}

ecommerce> db.productos.insertOne({nombre: 'nuevoProducto', precio: 1200})
{
  acknowledged: true,
  insertedId: ObjectId("63a1f3834b9aac026c17d0bf")
}

ecommerce> db.mensajes.insertOne({nombre:'jorge', mail:'jorge@gmail.com', mensaje: 'Este es un mensaje 2'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1e9954b9aac026c17d0ac")
}
ecommerce> db.mensajes.insertOne({nombre:'manuel', mail: 'manuel@gmail.com', mensaje: 'Este es un mensaje 3'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1e9de4b9aac026c17d0ad")
}
ecommerce> db.mensajes.insertOne({nombre:'nadia', mail: 'nadia@gmail.com', mensaje: 'Este es un mensaje 4'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1e9ea4b9aac026c17d0ae")
}
ecommerce> db.mensajes.insertOne({nombre:'ian', mail: 'ian@gmail.com', mensaje: 'Este es un mensaje 5'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1e9f74b9aac026c17d0af")
}
ecommerce> db.mensajes.insertOne({nombre:'ivan', mail: 'ivan@gmail.com', mensaje: 'Este es un mensaje 6'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1e9ff4b9aac026c17d0b0")
}
ecommerce> db.mensajes.insertOne({nombre:'alejo', mail: 'alejo@gmail.com', mensaje: 'Este es un mensaje 7'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1ea0a4b9aac026c17d0b1")
}
ecommerce> db.mensajes.insertOne({nombre:'brian', mail: 'brian@gmail.com', mensaje: 'Este es un mensaje 8'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1ea174b9aac026c17d0b2")
}
ecommerce> db.mensajes.insertOne({nombre:'gerardo', mail: 'gerardo@gmail.com', mensaje: 'Este es un mensaje 9'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1ea234b9aac026c17d0b3")
}
ecommerce> db.mensajes.insertOne({nombre:'franco', mail: 'franco@gmail.com', mensaje: 'Este es un mensaje 10'})
{
  acknowledged: true,
  insertedId: ObjectId("63a1ea354b9aac026c17d0b4")
}
ecommerce> db.productos.insertOne({nombre:'pantalon', precio: 200})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eaba4b9aac026c17d0b5")
}
ecommerce> db.productos.insertOne({nombre:'remera', precio: 300})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eac24b9aac026c17d0b6")
}
ecommerce> db.productos.insertOne({nombre:'medias', precio: 400})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eaca4b9aac026c17d0b7")
}
ecommerce> db.productos.insertOne({nombre:'sandalias', precio: 500})
{
  acknowledged: true,
  insertedId: ObjectId("63a1ead44b9aac026c17d0b8")
}
ecommerce> db.productos.insertOne({nombre:'buzo', precio: 600})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eae44b9aac026c17d0b9")
}
ecommerce> db.productos.insertOne({nombre:'zapatilla', precio: 700})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eaed4b9aac026c17d0ba")
}
ecommerce> db.productos.insertOne({nombre:'campera', precio: 800})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eaf74b9aac026c17d0bb")
}
ecommerce> db.productos.insertOne({nombre:'gorro', precio: 900})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eb104b9aac026c17d0bc")
}
ecommerce> db.productos.insertOne({nombre:'piloto', precio: 1000})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eb2e4b9aac026c17d0bd")
}
ecommerce> db.productos.insertOne({nombre:'pulsera', precio: 100})
{
  acknowledged: true,
  insertedId: ObjectId("63a1eb484b9aac026c17d0be")
}

# LISTADO DE PRODUCTOS Y MENSAJES

ecommerce> db.productos.find()
[
  {
    _id: ObjectId("63a1eaba4b9aac026c17d0b5"),
    nombre: 'pantalon',
    precio: 200
  },
  {
    _id: ObjectId("63a1eac24b9aac026c17d0b6"),
    nombre: 'remera',
    precio: 300
  },
  {
    _id: ObjectId("63a1eaca4b9aac026c17d0b7"),
    nombre: 'medias',
    precio: 400
  },
  {

    precio: 600
  },
  {
    _id: ObjectId("63a1eaed4b9aac026c17d0ba"),
    nombre: 'zapatilla',
    precio: 700
  },
  {
    _id: ObjectId("63a1eaf74b9aac026c17d0bb"),
    nombre: 'campera',
    precio: 800
  },
  {
    _id: ObjectId("63a1eb104b9aac026c17d0bc"),
    nombre: 'gorro',
    precio: 900
  },
  {
    _id: ObjectId("63a1eb2e4b9aac026c17d0bd"),
    nombre: 'piloto',
    precio: 1000
  },
  {
    _id: ObjectId("63a1eb484b9aac026c17d0be"),
    nombre: 'pulsera',
    precio: 100
  }
]
ecommerce> db.mensajes.find()
[ {
  { _id: ObjectId("63a1eb104b9aac026c17d0bc"),
    _id: ObjectId("63a1e8614b9aac026c17d0ab"),
    nombre: 'mariano',
    mail: 'mariano@gmail.com',
    mensaje: 'Este es un mensaje'
  },_id: ObjectId("63a1eb2e4b9aac026c17d0bd"),
  { nombre: 'piloto',
    _id: ObjectId("63a1e9954b9aac026c17d0ac"),
    nombre: 'jorge',
    mail: 'jorge@gmail.com',
    mensaje: 'Este es un mensaje 2'6c17d0be"),
  },nombre: 'pulsera',
  { precio: 100
    _id: ObjectId("63a1e9de4b9aac026c17d0ad"),
    nombre: 'manuel',
    mail: 'manuel@gmail.com',
    mensaje: 'Este es un mensaje 3'
  },
  {
    _id: ObjectId("63a1e9ea4b9aac026c17d0ae"),
    nombre: 'nadia',
    mail: 'nadia@gmail.com',
    mensaje: 'Este es un mensaje 4'
  },
  {
    _id: ObjectId("63a1e9f74b9aac026c17d0af"),
    nombre: 'ian',
    mail: 'ian@gmail.com',
    mensaje: 'Este es un mensaje 5'
  },
  {
    _id: ObjectId("63a1e9ff4b9aac026c17d0b0"),
    nombre: 'ivan',
    mail: 'ivan@gmail.com',
    mensaje: 'Este es un mensaje 6'
  },
  {
    _id: ObjectId("63a1ea0a4b9aac026c17d0b1"),
    nombre: 'alejo',
    mail: 'alejo@gmail.com',
    mensaje: 'Este es un mensaje 7'
  },
  {
    _id: ObjectId("63a1ea174b9aac026c17d0b2"),
    nombre: 'brian',
    mail: 'brian@gmail.com',
    mensaje: 'Este es un mensaje 8'
  },
  {
    _id: ObjectId("63a1ea234b9aac026c17d0b3"),
    nombre: 'gerardo',
    mail: 'gerardo@gmail.com',
    mensaje: 'Este es un mensaje 9'
  },
  {
    _id: ObjectId("63a1ea354b9aac026c17d0b4"),
    nombre: 'franco',
    mail: 'franco@gmail.com',
    mensaje: 'Este es un mensaje 10'
  }
]

# COUNT DOCUMENTS

ecommerce> db.productos.countDocuments()
10
ecommerce> db.mensajes.countDocuments()
10

# FILTRADO POR PRECIO

ecommerce> db.productos.find({precio: {$lt: 1000}})
[
  {
    _id: ObjectId("63a1eaba4b9aac026c17d0b5"),
    nombre: 'pantalon',
    precio: 200
  },
  {
    _id: ObjectId("63a1eac24b9aac026c17d0b6"),
    nombre: 'remera',
    precio: 300
  },
  {
    _id: ObjectId("63a1eaca4b9aac026c17d0b7"),
    nombre: 'medias',
    precio: 400
  },
  {
    _id: ObjectId("63a1ead44b9aac026c17d0b8"),
    nombre: 'sandalias',
    precio: 500
  },
  {
    _id: ObjectId("63a1eae44b9aac026c17d0b9"),
    nombre: 'buzo',
    precio: 600
  },
  {
    _id: ObjectId("63a1eaed4b9aac026c17d0ba"),
    nombre: 'zapatilla',
    precio: 700
  },
  {
    _id: ObjectId("63a1eaf74b9aac026c17d0bb"),
    nombre: 'campera',
    precio: 800
  },
  {
    _id: ObjectId("63a1eb104b9aac026c17d0bc"),
    nombre: 'gorro',
    precio: 900
  },
  {
    _id: ObjectId("63a1eb484b9aac026c17d0be"),
    nombre: 'pulsera',
    precio: 100
  }
]

# UPDATE

ecommerce> db.productos.updateOne({nombre:'remera'}, {$set: {precio: 3500}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

# FILTRADO CON RANGO

ecommerce> db.productos.find({precio: {$gt: 1000, $lt: 4000}})
[
  {
    _id: ObjectId("63a1eac24b9aac026c17d0b6"),
    nombre: 'remera',
    precio: 3500
  },
  {
    _id: ObjectId("63a1f3834b9aac026c17d0bf"),
    nombre: 'nuevoProducto',
    precio: 1200
  }
]

# FILTRADO POR PRECIO

ecommerce> db.productos.find({precio: {$gt: 3000}})
[
  {
    _id: ObjectId("63a1eac24b9aac026c17d0b6"),
    nombre: 'remera',
    precio: 3500
  }
]

# FILTRADO DEL TERCER PRODUCTO MAS BARATO

ecommerce> db.productos.find().sort({'precio': 1}).skip(2).limit(1)
[
  {
    _id: ObjectId("63a1eaca4b9aac026c17d0b7"),
    nombre: 'medias',
    precio: 400,
    stock: 100
  }
]

# UPDATE A TODOS

ecommerce> db.productos.updateMany({"precio": { $exists: true }}, {$set: {stock: 100}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 11,
  modifiedCount: 11,
  upsertedCount: 0
}

# UPDATE POR PRECIO

ecommerce> db.productos.updateMany({precio: {$gt: 800}}, {$set: {stock: 0}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 4,
  modifiedCount: 4,
  upsertedCount: 0
}

# DELETE POR PRECIO

ecommerce> db.productos.deleteMany({precio: {$lt: 1000}})
{ acknowledged: true, deletedCount: 8 }

# CREACION DE USUARIO

admin> db.createUser({user: 'pepe', pwd: 'password', roles: [{role: 'read', db: 'ecommerce'}]})
{ ok: 1 }



































