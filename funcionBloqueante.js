process.on('message', cantidad => {

    let numerosGenerados = []

    for(let i = 0; i < cantidad; i++) {
        let numeroGenerado = Math.floor(Math.random() * 1000)
        let cantRepeticiones = numerosGenerados.filter(i => i.numero === numeroGenerado).length
        numerosGenerados.push({ 
            numero: numeroGenerado,
            cantRepeticiones: cantRepeticiones,
        })
    }
    console.log('mensaje desde el proceso principal:\n');

    process.send(`resultado de suma en segundo plano ${JSON.stringify(numerosGenerados)}`)
});