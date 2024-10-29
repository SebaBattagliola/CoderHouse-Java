const productos = [
    { id: 1, nombre: "Cold Wallet", descripcion: "Protege tus criptomonedas con una Cold Wallet segura.", imagen: "imagenes/ColdWallet_Cel.jpg" },
    { id: 2, nombre: "Minner S19j", descripcion: "Equipo de minería de alto rendimiento.", imagen: "imagenes/minner_s19.jpg" },
    { id: 3, nombre: "Minner Ebit10", descripcion: "Eficiente y poderoso equipo de minería.", imagen: "imagenes/minner_ebit10.jpg" },
    { id: 4, nombre: "Minner Asic Pro", descripcion: "Minería avanzada con alto desempeño.", imagen: "imagenes/minner_asic_pro.jpg" },
    { id: 5, nombre: "Minner Bitmain", descripcion: "Equipo de minería Bitmain confiable.", imagen: "imagenes/minnner_bitmain.jpg" },
    { id: 6, nombre: "Nerdminder V2", descripcion: "Nueva versión de Nerdminder.", imagen: "imagenes/nerdminder_v2.jpg" },
    { id: 7, nombre: "Conector Dummy", descripcion: "Conector versátil para minería.", imagen: "imagenes/connector_dummy.jpg" },
    { id: 8, nombre: "Trezor Safe 3", descripcion: "Almacena tus criptomonedas de forma segura.", imagen: "imagenes/Trezor_safe_3.jpeg" },
    { id: 9, nombre: "Tangem 3", descripcion: "Tarjeta inteligente para almacenar cripto.", imagen: "imagenes/tangem_3.jpg" },
    { id: 10, nombre: "Ledger Nano", descripcion: "Almacena tus activos digitales con Ledger.", imagen: "imagenes/ledger_nano.jpg" }
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
            <button class="btn comprar" onclick="agregarAlCarrito('${producto.nombre}')">Comprar</button>
            <button class="btn carrito" onclick="agregarAlCarrito('${producto.nombre}')">Agregar al Carrito</button>
        `;

        
        contenedorProductos.appendChild(productDiv);
    });
}


document.addEventListener("DOMContentLoaded", mostrarProductos);