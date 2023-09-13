function principal() {
  let productos = [];

  class Producto {
    constructor(id, nombre, precio, categoria, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.categoria = categoria;
      this.vendido = false;
      this.imagen = imagen;
    }

    vender() {
      this.vendido = true;
    }
  }

  const cuadroLisa = new Producto(
    1,
    "Lisa, la reina de los lagartos",
    5000,
    "redondo",
    "./assets/lisa.webp"
  );
  const cuadroBeemo = new Producto(
    2,
    "Beemo , hora de aventura",
    5000,
    "cuadrado",
    "./assets/beemo.webp"
  );
  const cuadroDexter = new Producto(
    3,
    "Dexter, El laboratorio de Dexter",
    5000,
    "horizontal",
    "./assets/dexter.webp"
  );
  const cuadroGoku = new Producto(
    4,
    "Goku chiquito , Dragon Ball Z",
    5000,
    "cuadrado",
    "./assets/goku.webp"
  );
  const cuadroPuroHuesos = new Producto(
    5,
    "Puro Hueso , Billy y Mandy",
    5000,
    "vertical",
    "./assets/puroHueso.webp"
  );

  productos.push(
    cuadroLisa,
    cuadroBeemo,
    cuadroDexter,
    cuadroGoku,
    cuadroPuroHuesos
  );

  let valorInput = document.getElementById("buscador");
  let botonBuscar = document.getElementById("botonBuscar");

  let botonVaciar = document.getElementById("vaciarBtn");
  botonVaciar.addEventListener("click", () => vaciarCarrito(carrito));

  let comprar = document.getElementById("comprar");
  comprar.addEventListener("click", () => comprarCarrito(carrito));

  let carrito = [];
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }

  renderizarCarrito(carrito);
  postearProductos(productos, carrito);
  botonBuscar.addEventListener("click", () =>
    filtrarCuadros(productos, valorInput, carrito)
  );
}

principal();

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

  console.log(carrito);
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
  productos.forEach(({ nombre, precioUnitario, unidades, subTotal }) => {
    let tarjetaProductoC = document.createElement("div");
    tarjetaProductoC.className = "tarjetaCarrito";
    tarjetaProductoC.innerHTML = `
    <p>${nombre}</p>
    <p>$${precioUnitario}</p>
    <p>Unidades: ${unidades}
    <p>$${subTotal}
    `;
    carritoContenedor.appendChild(tarjetaProductoC);
  });
}

function filtrarCuadros(productos, input, carrito) {
  let cuadrosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(input.value.toLowerCase())
  );
  productos.forEach((el) => console.log(el.nombre));
  console.log(input.value);
  console.log(cuadrosFiltrados);
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

