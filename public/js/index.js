const socket = io.connect()

function addMessage() {
    const nombre = document.getElementById("nombre").value
    const precio = document.getElementById("precio").value
    const imagen = document.getElementById("imagen").value

    const producto = { nombre, precio, imagen }
    socket.emit("newProducto", producto)
    return false
}

socket.on("arrayProductos", (data) => {
    render(data)
})

socket.on("productos", (data) => {
    render(data)
    console.log("aca tenes la data al iniciar la pag");
})

function render(data) {
    const html = data.map(i => {
        return (
            `<p>${i.nombre} ${i.precio} <img width="50" src=${i.imagen}></p>`
        )
    })
    document.getElementById("productos").innerHTML = html
}

