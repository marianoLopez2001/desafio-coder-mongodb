import faker from 'faker';

export let productosFakerNombre
export let productosFakerPrecio
export let productosFakerImagen

for (let i = 0; i < 5; i++) {
    productosFakerNombre += faker.commerce.productName() + ';'
}

for (let i = 0; i < 5; i++) {
    productosFakerPrecio += faker.commerce.price(100, 500) + ';'
}
for (let i = 0; i < 5; i++) {
    productosFakerImagen += faker.image.animals() + ';'
}

productosFakerNombre = productosFakerNombre.split(';').map(i => i.replace('undefined', ''))
productosFakerPrecio = productosFakerPrecio.split(';').map(i => i.replace('undefined', ''))
productosFakerImagen = productosFakerImagen.split(';').map(i => i.replace('undefined', ''))
//aca me tiraba undefined faker dentro de la imagen
productosFakerNombre.length = productosFakerNombre.length -1
productosFakerPrecio.length = productosFakerPrecio.length -1
productosFakerImagen.length = productosFakerImagen.length -1
//y despues me agregaba un elemento vacio (''), a pesar de que le especifiqué que solo quería 5
