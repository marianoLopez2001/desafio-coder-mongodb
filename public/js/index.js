const socket = io.connect()

function addMessage() {
    const nombre = document.getElementById("nombre").value
    const precio = document.getElementById("precio").value
    const imagen = document.getElementById("imagen").value

    const producto = { nombre, precio, imagen }
    socket.emit("newProducto", producto)
    return false
}

function handleChat() {
    const mail = document.getElementById("mail").value
    const contenidoMensaje = document.getElementById("mensaje").value
    const mensaje = { mensaje: contenidoMensaje, mail: mail, fecha: new Date().toLocaleString() }
    socket.emit("newMensaje", mensaje)
    return false
}

function render(data) {
    const html = data.map(i => {
        return (
            `<p>Nombre: ${i.nombre}, Precio: ${i.precio}, Imagen: <img width="120" src=${i.imagen}></p>`
        )
    })
    document.getElementById("productos").innerHTML = html
}


function renderChat(data) {
    const html = data.map(i => {
        return (
            `<p><span class="fst-italic text-primary">Mail: ${i.mail}</span>, <span class="text-warning">Fecha: ${i.fecha}</span>, <span style="word-wrap: break-word;" class="text-success fst-italic">Mensaje: ${i.mensaje}</span></p>`
        )
    })
    document.getElementById("mensaje").value = ""
    document.getElementById("chat").innerHTML = html
}

socket.on("arrayMensajes", data => {
    renderChat(data)
})

socket.on("arrayProductos", (data) => {
    render(data)
})

socket.on("productos", (data) => {
    render(data)
})

socket.on("mensajes", (data) => {
    renderChat(data)
})