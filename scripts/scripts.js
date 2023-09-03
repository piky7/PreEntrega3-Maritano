
function principal (){
    
    let productos = []
    
    class Producto {
        constructor(nombre,precio,categoria,imagen){
            this.nombre = nombre
            this.precio = precio
            this.categoria = categoria
            this.vendido = false
            this.imagen = imagen
            
        }
    
        vender(){
            this.vendido = true
        }
    }
    
    const cuadroLisa = new Producto('Lisa, la reina de los lagartos' , 5000 , 'redondo','./assets/lisa.webp')
    const cuadroBeemo = new Producto('Beemo , hora de aventura' , 5000 , 'cuadrado','./assets/beemo.webp')
    const cuadroDexter = new Producto('Dexter, El laboratorio de Dexter' , 5000 , 'horizontal','./assets/dexter.webp')
    const cuadroGoku = new Producto('Goku chiquito , Dragon Ball Z' , 5000 , 'cuadrado','./assets/goku.webp')
    const cuadroPuroHuesos = new Producto('Puro Hueso , Billy y Mandy', 5000 , 'vertical','./assets/puroHueso.webp')
    
    
    
    
    productos.push(cuadroLisa , cuadroBeemo , cuadroDexter , cuadroGoku, cuadroPuroHuesos)
    let valorInput = document.getElementById('buscador')
    let botonBuscar = document.getElementById('botonBuscar')
    postearProductos(productos)
    botonBuscar.addEventListener('click',() =>filtrarCuadros(productos,valorInput))

}

principal()







function postearProductos(articulos){
    let contenedorProductos = document.getElementById('contenedor')
    contenedorProductos.innerHTML = ''
    articulos.forEach((prod)=>{
      
       let tarjetaProducto = document.createElement('div')
       tarjetaProducto.innerHTML= `
       <div class="product-card">
       <img src="${prod.imagen}" alt="">
       <h4>${prod.nombre}</h4>
       <div class='contenedorPrecio'>
         <span>$${prod.precio}</span>
         <button>+</button>
       </div>
     </div>
     `
     contenedorProductos.appendChild(tarjetaProducto)
    })

}



function filtrarCuadros(productos , input){
   let cuadrosFiltrados = productos.filter(prod => prod.nombre.toLowerCase().includes(input.value.toLowerCase()) )
   productos.forEach(el=> console.log(el.nombre))

   console.log(input.value)
   console.log(cuadrosFiltrados)
   postearProductos(cuadrosFiltrados)
}






