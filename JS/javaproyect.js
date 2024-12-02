//ESTA PARTE NO ESTA TRABAJADA, ES PARA PASAR LOS TOKENS A MONEDA NORMAL Y COMPRAR.

//EN PROCESO
//EN PROCESO
//EN PROCESO
//EN PROCESO
//EN PROCESO
//EN PROCESO
//EN PROCESO
//EN PROCESO
//EN PROCESO



// ABI del contrato ERC-20 Battas
const battasAbi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)"
];

// Dirección del contrato del token  (después de desplegarlo)
const battasAddress = "0x..."; // Dirección del contrato del token

let provider;
let signer;
let contract;
let carrito = [];
let productos = [
    { id: 1, nombre: 'Wallet de Criptomonedas', precio: 100 }, 
    { id: 2, nombre: 'Miner ASIC', precio: 1500 },
    { id: 3, nombre: 'PC para Minería', precio: 2000 }
];

// Conectar a MetaMask
async function connect() {
    if (window.ethereum) {
        await ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        document.getElementById("account").innerText = `Cuenta: ${await signer.getAddress()}`;

        // Conectar contrato del token Battas
        contract = new ethers.Contract(battasAddress, battasAbi, signer);

        mostrarProductos();
    } else {
        alert("Instala MetaMask para interactuar con esta Web.");
    }
}

// Mostrar productos en la página
function mostrarProductos() {
    let productosDiv = document.getElementById("productos");
    productos.forEach(producto => {
        let productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <p><strong>${producto.nombre}</strong> - Precio: ${producto.precio} BTS</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

// Agregar productos al carrito
function agregarAlCarrito(id) {
    let producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

// Mostrar el carrito
function actualizarCarrito() {
    let carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = ""; // Limpiar carrito actual
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio;
        let itemDiv = document.createElement("div");
        itemDiv.innerText = `${producto.nombre} - ${producto.precio} BTS`;
        carritoDiv.appendChild(itemDiv);
    });

    let totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total a pagar: ${total} BTS</strong>`;
    carritoDiv.appendChild(totalDiv);
}

// Pagar con tokens
async function pagarConBattas() {
    let total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    let tiendaAddress = "0x..."; // Dirección wallet que recibe

    // Convertir el total a formato en decimales del token
    let totalInWei = ethers.utils.parseUnits(total.toString(), 18);

    // Transferir tokens al dueño de la tienda
    let tx = await contract.transfer(tiendaAddress, totalInWei);
    alert(`Transacción enviada. Hash: ${tx.hash}`);

    await tx.wait();
    alert("¡Pago confirmado!");



    // Limpiar carrito
    carrito = [];
    actualizarCarrito();
}

document.getElementById("connectButton").addEventListener("click", connect);
document.getElementById("pagarButton").addEventListener("click", pagarConBattas);
