const socket = io.connect()

const asd = (prod) => {
    socket.emit("newProd", prod)
}
//que lleve el coso por socket y podemos hacer carrito.push(productos[id+1])


