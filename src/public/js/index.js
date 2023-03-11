const socket = io.connect()

const asd = (prod) => {
    socket.emit("newProd", prod)
}

function handleCartDisplay() {
    const cart = document.getElementById('cart')

    if (cart.className === 'd-none') {
        cart.className = 'd-block'
    } else {
        cart.className = 'd-none'
    }
}