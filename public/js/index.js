let socket = io();

socket.on("array", (data) => {
    document.getElementById('array').innerHTML = data
})
