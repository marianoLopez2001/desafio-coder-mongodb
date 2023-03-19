const socket = io()

console.log(socket);

const newProd = (prod) => {
    socket.emit("newProd", prod)
}

const finalizarCompra = () => {
    socket.emit("finalizarCompra")
}

function handleCartDisplay() {
    const cart = document.getElementById('cart')

    if (cart.className === 'd-none') {
        cart.className = 'd-block'
    } else {
        cart.className = 'd-none'
    }
}

function handleProfileDisplay() {
    const perfil = document.getElementById('profile')

    if (perfil.className === 'd-none') {
        perfil.className = 'd-block'
    } else {
        perfil.className = 'd-none'
    }
}