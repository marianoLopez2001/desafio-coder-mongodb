const socket = io.connect()

// function addMessage() {
//     const nombre = document.getElementById("nombre").value
//     const precio = document.getElementById("precio").value
//     const producto = { nombre, precio }
//     socket.emit("newProducto", producto)
//     return false
// }

function handleChat() {
    const primerNombre = document.getElementById("primerNombre").value;
    const apellido = document.getElementById("apellido").value;
    const mail = document.getElementById("mail").value;
    const edad = document.getElementById("edad").value;
    const alias = document.getElementById("alias").value;
    const avatar = document.getElementById("avatar").value;
    const text = document.getElementById("text").value;
    const mensaje = { author: { nombre: primerNombre, apellido: apellido, mail: mail, edad: edad, alias: alias, avatar: avatar }, text: text }
    socket.emit("newMensaje", mensaje)
    return false
}

// function render(data) {
//     const html = data.map(i => {
//         return (
//             `<p>Nombre: ${i.nombre}, Precio: ${i.precio}</p>`
//         )
//     })
//     document.getElementById("productos").innerHTML = 'html'
// }


function renderChat(data) {
    const newData = [];
    if (data.dataDenormalizada) {
        data.dataDenormalizada.comments.map((i) => {
            newData.push(`<p>Mensaje: ${i.text}</p><br>`)
        })
    } else {
        data.comments.map((i) => {
            newData.push(`<p>Mensaje: ${i.text}</p><br>`)
        })
    }
    document.getElementById("chat").innerHTML = newData.join('')
}

//MENSAJES

socket.on("arrayMensajes", denormalizedData => {
    renderChat(denormalizedData)
})

socket.on("mensajes", (denormalizedData) => {
    // const denormalizedData = denormalize(normalizedData.result, postSchema, normalizedData.entities );
    //^^ tira que no esta definido en el html (?)
    renderChat(denormalizedData)
})


