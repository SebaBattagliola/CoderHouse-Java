const productos = [
    { id: 1, nombre: "Cold Wallet", descripcion: "Protege tus criptomonedas con una Cold Wallet segura.", precio: 4000, imagen: "imagenes/ColdWallet_Cel.jpg" },
    { id: 2, nombre: "Minner S19j", descripcion: "Equipo de minería de alto rendimiento.", precio: 9500, imagen: "imagenes/minner_s19.jpg" },
    { id: 3, nombre: "Minner Ebit10", descripcion: "Eficiente y poderoso equipo de minería.", precio: 8350, imagen: "imagenes/minner_ebit10.jpg" },
    { id: 4, nombre: "Minner Asic Pro", descripcion: "Minería avanzada con alto desempeño.", precio: 10750, imagen: "imagenes/minner_asic_pro.jpg" },
    { id: 5, nombre: "Minner Bitmain", descripcion: "Equipo de minería Bitmain confiable.", precio: 16000, imagen: "imagenes/minnner_bitmain.jpg" },
    { id: 6, nombre: "Nerdminder V2", descripcion: "Nueva versión de Nerdminder.", precio: 3000, imagen: "imagenes/nerdminder_v2.jpg" },
    { id: 7, nombre: "Conector Dummy", descripcion: "Conector versátil para minería.", precio: 200, imagen: "imagenes/connector_dummy.jpg" },
    { id: 8, nombre: "Trezor Safe 3", descripcion: "Almacena tus criptomonedas de forma segura.", precio: 1100, imagen: "imagenes/Trezor_safe_3.jpeg" },
    { id: 9, nombre: "Tangem 3", descripcion: "Tarjeta inteligente para almacenar cripto.", precio: 2000, imagen: "imagenes/tangem_3.jpg" },
    { id: 10, nombre: "Ledger Nano", descripcion: "Almacena tus activos digitales con Ledger.", precio: 900, imagen: "imagenes/ledger_nano.jpg" }
];

// Función para mostrar productos en HTML
function mostrarProductos() {
    const contenedorProductos = document.querySelector(".product-container");
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="btn comprar" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
        `;

        
        contenedorProductos.appendChild(productDiv);
    });
}


document.addEventListener("DOMContentLoaded", mostrarProductos);
