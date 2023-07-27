
let usuario = 'Andy07'   // Nombre de usuario
let contraseña = 2023    // contraseña del usuario
let intentos = 0         // suma de intentos para ingresar , tiene 3 en total



do {  // bucle do para tomar los datos del usuario 
    let bienvenida = prompt("Bienvenido, ingrese su usuario").toLowerCase()
    let pass = prompt(`Bienvenido , ingrese su contraseña`).toLowerCase()
    
    let validacionUser = bienvenida === usuario.toLowerCase()
    let validacionPass = +(pass) === contraseña
    let validarCampo = bienvenida === '' || bienvenida === ' ' || pass === '' || pass === ' '
    
    if(validarCampo){  // valida que no pongan string vacio o espacio
        alert('Ni ingresaste ningun dato en usuario o contraseña')
    } 
    if(!(validacionUser && validacionPass)){ // valida que usuario y contraseña sean iguales
        intentos += 1
        alert(`Usuario o contraseña incorrecta , llevas ${intentos} intentos de 3`)
        
    }
    if(validacionUser && validacionPass){  // si ambos son iguales te da la bienvenida y muestra el sitio
        alert(`Bienvenido ${usuario}`)
        break
    }

    
} while (intentos < 3); // maxima cantidad de intentos



function calculadora ( valorA,operador, valorB, ){  // Calculadora que dependiendo los numeros y operadores que uses te da el resultado
    switch(operador){
        case '+':
            return console.log(valorA + valorB)

        case '-' :
            return console.log(valorA - valorB) 

        case '*' : 
        return console.log(valorA * valorB) 

        case '/' : 
        return console.log(valorA / valorB)
    }
}

calculadora(4,'+',8)

calculadora(4,'+',11)

calculadora(9,'*',15)


function valorCuadro (nombre){   // funcion para saber los precios de los cuadros que estan a la venta
    switch(nombre.toLowerCase()){
        case 'mickey':
            return console.log(`El cuadro de ${nombre} cuesta $5000`)

        case 'homero simpsons' :
            return console.log(`El cuadro de ${nombre} cuesta $4500`) 

        case 'frida' : 
        return console.log(`El cuadro de ${nombre} cuesta $6200`) 

        case 'boca juniors' : 
        return console.log(`El cuadro de ${nombre} cuesta $7000`)

        default :
           return console.log(`Lo sentimos pero el nombre ingresado : ${nombre} del cuadro no se encuentra disponible o esta mal escrito`)
    }
}

valorCuadro('Boca Juniors')
valorCuadro('boca juniors')
valorCuadro('FRIDA')


let cuadros = ['Mickey','Homero Simpsons', 'Frida','Boca Juniors']


for (let i = 0; i < cuadros.length; i++) {  // este bucle llama a todos los cuadros del array y aplica la funcion valorCuadro para saber que valor tienen todos
    valorCuadro(cuadros[i])
}

