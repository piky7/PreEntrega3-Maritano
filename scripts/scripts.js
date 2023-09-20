function principal(productos) {

  let valorInput = document.getElementById("buscador");
  let botonBuscar = document.getElementById("botonBuscar");

  let botonVaciar = document.getElementById("vaciarBtn");
  botonVaciar.addEventListener("click", () => vaciarCarrito(carrito));

  let comprar = document.getElementById("comprar");
  comprar.addEventListener("click", () => comprarCarrito(carrito));

   carrito = [];
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }

  renderizarCarrito(carrito);
  postearProductos(productos, carrito);
  botonBuscar.addEventListener("click", () =>
    filtrarCuadros(productos, valorInput, carrito)
  );
 
}

let btnEliminarProducto = document.querySelectorAll('.btneliminar')
let total = document.querySelector('.total')
let carrito = []

function postearProductos(articulos, carrito) {
  let contenedorProductos = document.getElementById("contenedor");
 
  contenedorProductos.innerHTML = "";
  articulos.forEach(({ imagen, nombre, precio, id }) => {
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("tarjetaIndividual");
    tarjetaProducto.innerHTML = `
       <div class="product-card">
       <img src="${imagen}" alt="">
       <h4>${nombre}</h4>
       <div class='contenedorPrecio'>
         <span>$${precio}</span>
         <button id=${id}>+</button>
       </div>
     </div>
     `;
    contenedorProductos.appendChild(tarjetaProducto);

    let boton = document.getElementById(id);
    boton.addEventListener("click", (e) =>
      agregarAlCarrito(articulos, e, carrito)
    );
  });
}

function agregarAlCarrito(articulos, e, carrito) {
  let productoDeseado = articulos.find(
    (producto) => producto.id === Number(e.target.id)
  );
  let productoEnCarrito = carrito.find(
    (producto) => producto.id === productoDeseado.id
  );

  if (productoEnCarrito) {
    productoEnCarrito.unidades++;
    productoEnCarrito.subTotal =
      productoEnCarrito.unidades * productoEnCarrito.precioUnitario;
  } else {
    carrito.push({
      id: productoDeseado.id,
      nombre: productoDeseado.nombre,
      precioUnitario: productoDeseado.precio,
      unidades: 1,
      subTotal: productoDeseado.precio,
    });
  }


  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito(carrito);
  Toastify({

    text: "Producto agregado al carrito",
    
    duration: 2000
    
    }).showToast();
}

function renderizarCarrito(productos) {
  let carritoContenedor = document.getElementById("carrito-contenedor");
  carritoContenedor.innerHTML = "";
  productos.forEach(({ nombre, precioUnitario, unidades, subTotal, id }) => {
    let tarjetaProductoC = document.createElement("div");
    tarjetaProductoC.className = "tarjetaCarrito";
    tarjetaProductoC.innerHTML = `
    <p>${nombre}</p>
    <p>$${precioUnitario}</p>
    <p>Unidades: ${unidades}</p>
    <p>$${subTotal}</p>
    <button class='btneliminar' id='${id}'>X</button>
    `;
    carritoContenedor.appendChild(tarjetaProductoC);
  });
  actualizarBotonesEliminar()
  actualizarTotal(carrito)

}

function actualizarBotonesEliminar(){
  btnEliminarProducto = document.querySelectorAll('.btneliminar')
 

  btnEliminarProducto.forEach(btn => {
    btn.addEventListener('click',(e)=> eliminarProductoCarrito(e,carrito))
  })
}

function eliminarProductoCarrito(e,carrito){
  let idBoton = e.currentTarget.id
 
  const index = carrito.findIndex(producto => producto.id === idBoton)
  carrito.splice(index,1)
  
  Toastify({

    text: "Producto eliminado",
    
    duration: 2000
    
    }).showToast();
  renderizarCarrito(carrito)
}

function actualizarTotal(carrito){
  

  let totalCarrito = carrito.reduce((acc,producto)=> acc + (producto.precioUnitario * producto.unidades),0)
  total.innerText = `$ ${totalCarrito}`
}

function filtrarCuadros(productos, input, carrito) {
  let cuadrosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(input.value.toLowerCase())
  );
  productos.forEach((el) => console.log(el.nombre));

  postearProductos(cuadrosFiltrados, carrito);
}

function vaciarCarrito(carrito) {
  localStorage.clear();
  carrito.length = 0;
  renderizarCarrito([]);
  Swal.fire('Carrito limpio')

}


function comprarCarrito(carrito) {
  localStorage.clear();
  carrito.length = 0;
  renderizarCarrito(carrito);

  Swal.fire("Gracias por su compra!", "Que lo disfrute!", "success");
}


async function pedirInfo(){
  try{
    const respuesta = await fetch('./data.json')
    const productos = await respuesta.json()
    principal(productos)
  } catch(error){
    console.log(error)
  }
}

pedirInfo()
