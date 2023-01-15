"use strict";

var socket = io.connect(); // function addMessage() {
//     const nombre = document.getElementById("nombre").value
//     const precio = document.getElementById("precio").value
//     const producto = { nombre, precio }
//     socket.emit("newProducto", producto)
//     return false
// }

function handleChat() {
  var primerNombre = document.getElementById("primerNombre").value;
  var apellido = document.getElementById("apellido").value;
  var mail = document.getElementById("mail").value;
  var edad = document.getElementById("edad").value;
  var alias = document.getElementById("alias").value;
  var avatar = document.getElementById("avatar").value;
  var text = document.getElementById("text").value;
  var mensaje = {
    author: {
      nombre: primerNombre,
      apellido: apellido,
      mail: mail,
      edad: edad,
      alias: alias,
      avatar: avatar
    },
    text: text
  };
  socket.emit("newMensaje", mensaje);
  return false;
} // function render(data) {
//     const html = data.map(i => {
//         return (
//             `<p>Nombre: ${i.nombre}, Precio: ${i.precio}</p>`
//         )
//     })
//     document.getElementById("productos").innerHTML = 'html'
// }


function renderChat(data) {
  var newData = [];
  console.log(data);

  if (data.dataDenormalizada) {
    data.dataDenormalizada.comments.map(function (i) {
      newData.push("<p>Mensaje: ".concat(i.text, "</p><br>"));
    });
  } else {
    data.comments.map(function (i) {
      newData.push("<p>Mensaje: ".concat(i.text, "</p><br>"));
    });
  }

  document.getElementById("chat").innerHTML = newData.join('');
} //MENSAJES


socket.on("arrayMensajes", function (denormalizedData) {
  renderChat(denormalizedData);
});
socket.on("mensajes", function (denormalizedData) {
  // const denormalizedData = denormalize(normalizedData.result, postSchema, normalizedData.entities );
  //^^ tira que no esta definido en el html (?)
  renderChat(denormalizedData);
});