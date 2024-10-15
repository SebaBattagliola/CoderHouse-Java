/*Codigo no dado en clases - cerrar ventana emergente*/
document.getElementById("close-popup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

/* Conectar Metamask */ 
document.querySelector(".metamask").addEventListener("click", async function() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert("MetaMask conectado correctamente.");
        } catch (error) {
            alert("Error al conectar con MetaMask: " + error.message);
        }
    } else {
        alert("MetaMask no está instalado. Por favor, instálalo desde https://metamask.io/");
    }
});

/* Inicio de codigo dictado en clases */ 

/* --- Loggin y Register --- */ 

alert ("Bienvenid@ a tienda BATTA, registrese para ver los productos")

let cantidadUsuarios = 0;
let usuariosRegistrados = [];

const usuarioCorrecto = "coder";
const contraseñaCorrecta = "house1234";

function registrarUsuario() {
    const nombre = prompt("Ingrese su nombre:");
    const apellido = prompt("Ingrese su apellido:");

    if (nombre === "" || nombre.length <= 2 || apellido === "" || apellido.length <= 2) {
        alert("Por favor, escriba datos correctos.");
        return;
    }

    const dni = parseInt(prompt("Ingrese su DNI:"));

    if (isNaN(dni) || dni.toString().length < 7 || dni.toString().length > 8) {
        alert("Por favor, ingresa un número de DNI válido.");
        return;
    }

    const edad = parseInt(prompt("Ingrese su edad - Solo mayores de 12 años"));

    if (isNaN(edad) || edad < 12) {
        alert("Por favor, debes ser mayor de 12 años, pide autorización de un mayor.");
        return;
    }
    


    cantidadUsuarios++;

    const nuevoUsuario = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        edad: edad,
        id: "usuario" + cantidadUsuarios
    };
    alert("Registro exitoso. Usuario guardado como: " + nuevoUsuario.id);
    
    //Inicia la compra
    DatosComprador();
}

registrarUsuario();

// Compra de productos y carrito

function DatosComprador(){
    let usuario = prompt("Ingrese su usuario");
    let pass = prompt("Ingrese su contraseña");
    if (validarDatos(usuario, pass)){
        iniciarCarrito();
    }
}

function iniciarCarrito(){
    let lista = "" ;
    let finalizar_carrito = false ;
    
    while (!finalizar_carrito){
        let cod = prompt("Ingrese el producto");
        
        if (cod === null){
            finalizar_carrito = true;
        } else {
            let producto = obtenerProducto(cod);

            if (producto){
                console.log("Producto agregado: " + producto);
                lista += "\n" + producto;
                alert("Productos en tu carrito: " + lista);

                let seguirComprando = prompt("¿Desea seguir comprando? (Si/No)");
                if (seguirComprando.toLowerCase() === "no") {
                    finalizar_carrito = true;
                } else if (seguirComprando.toLowerCase() !== "si") {
                    alert("Ingrese nuevo producto.");
                }
            } else {
                alert("Producto no encontrado, ingrese un producto valido");
            }
        }
    }

    if (lista != ""){
        let resp = confirm("Confirmar compra de: " + lista);
        if (resp){
            alert("Gracias por comprar en Tienda BATTA");
        } else {
            alert("Compra cancelada, lo esperamos pronto");
        }
    } else {
        alert("No se agregaron productos al carrito.");
    }
}

function obtenerProducto(codigo){
    let producto ;

    switch(codigo) {
        case "1" :
            producto = "Cold Wallet" ;
            break;
        case "2" :
            producto = "Minner S19j" ;
            break; 
        case "3" : 
            producto = "Minner Ebit10" ;
            break;
        case "4" : 
            producto = "Minner Asic Pro"
            break;       
        case "5" : 
            producto = "Minner Bitmain" ;
            break; 
        case "6" : 
            producto = "Nerdminder V2" ;
            break; 
        case "7" : 
            producto = "Conector Dummy" ;
            break; 
        case "8" : 
            producto = "Trezor Safe 3" ;
            break; 
        case "9" : 
            producto = "Tangem 3" ;
            break; 
        case "10" : 
            producto = "Ledger Nano" ;
            break; 
        default :        
            producto = false ;
    }
    return producto ;
}


//Agregado por que no andaba la funcion comprar.
function validarDatos(usuarioIngresado, passIngresado) {
    if (usuarioIngresado === usuarioCorrecto && passIngresado === contraseñaCorrecta) {
        return true;
    } else {
        alert("Usuario o contraseña incorrectos.");
        return false;
    }
}