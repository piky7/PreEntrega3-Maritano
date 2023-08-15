

let productos = []

class Producto {
    constructor(nombre,precio,categoria){
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.vendido = false
    }

    vender(){
        this.vendido = true
    }
}

const cuadroLisa = new Producto('Lisa, la reina de los lagartos' , 5000 , 'redondo')
const cuadroBeemo = new Producto('Beemo , hora de aventura' , 5000 , 'cuadrado')
const cuadroDexter = new Producto('Dexter, El laboratorio de Dexter' , 5000 , 'horizontal')
const cuadroGoku = new Producto('Goku chiquito , Dragon Ball Z' , 5000 , 'cuadrado')
const cuadroPuroHuesos = new Producto('Puro Hueso , Billy y Mandy', 5000 , 'vertical')
const cuadroMickey = new Producto('Mickey' , 5000 , 'cuadrado')



productos.push(cuadroLisa , cuadroBeemo , cuadroDexter , cuadroGoku, cuadroPuroHuesos , cuadroMickey)

console.log(productos)

productos.forEach((prod)=>{
    console.log(prod.nombre)
})

let nombreProductos = productos.map((prod) => {
   return `${productos.indexOf(prod) + 1} - ${prod.nombre}`
})



console.log(nombreProductos)

let consultarPrecio = confirm(`Desea consultar algun precio?`)

while(consultarPrecio){

    let eleccion = +(prompt(`Seleccione un numero para consultar su precio 
    \n${nombreProductos.join('\n')}
   `))
   
   if(!(isNaN(eleccion)) && eleccion <= nombreProductos.length){
       let resultadoEleccion = alert(`El cuadro ${productos[eleccion-1].nombre} cuesta: $${productos[eleccion-1].precio}`)
       switch(eleccion){
           case 1 : resultadoEleccion
           break
           case 2 : resultadoEleccion
           break
           case 3 : resultadoEleccion
           break
           case 4 : resultadoEleccion
           break
           case 5 : resultadoEleccion
           break
           case 6 : resultadoEleccion
           break
           default : alert(`El número que ingresaste no es correcto`)
           break
       }
      
   } else {
       alert(`Error , dato incorrecto`)
   }
   consultarPrecio = confirm(`Desea consultar algun otro precio?`)
}



   


 





function filtrarCuadros(productos , categoria  , valor){
    return productos.filter( el => {
     return el[categoria] === valor       
      
    })
}

console.log(filtrarCuadros(productos , 'precio' , 5000))
console.log(filtrarCuadros(productos , 'categoria' , 'redondo'))
console.log(filtrarCuadros(productos , 'categoria' , 'cuadrado'))




