//Cerrar ventana emergente
document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

//Carrito de compras

let carrito = [];

// Agregar productos  al carrito

function agregarAlCarrito(id) {
    fetch('../JS/productos.json')
        .then(response => response.json())
        .then(data => {
            const producto = data.find(p => p.id === id);
            if (!producto) {
                console.error("Producto no encontrado");
                return;
            }

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Verificar si el producto ya está en el carrito

            const productoExistente = carrito.find(p => p.id === id);
            if (productoExistente) {
                productoExistente.cantidad += 1; 
            } else {
                carrito.push({ ...producto, cantidad: 1 }); // Agregar nuevo producto
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            Toastify({
                text: `${producto.nombre} agregado al carrito`,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff6b6b, #ff4d4d)",
                },
            }).showToast();

            mostrarCarrito();
        })
        .catch(error => console.error("Error al agregar al carrito:", error));
}

// Mostrar carrito
function mostrarCarrito() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        Swal.fire({
            title: "Carrito vacío",
            text: "¡Agrega productos para comenzar tu compra!",
            icon: "info",
            confirmButtonText: "Aceptar",
        });
        return;
    }

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const contenidoCarrito = carrito
        .map(p => `<li>${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}</li>`)
        .join("");

    Swal.fire({
        title: "Carrito de Compras",
        html: `<ul>${contenidoCarrito}</ul><p><strong>Total: $${total}</strong></p>`,
        showCancelButton: true,
        confirmButtonText: "Comprar",
        cancelButtonText: "Vaciar Carrito",
    }).then(result => {
        if (result.isConfirmed) {
            completarCompra();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            vaciarCarrito();
        }
    });

    setTimeout(() => {
        Swal.close();
    }, 9000);
}

// Completar compra
function completarCompra() {
    carrito = [];
    localStorage.removeItem("carrito");

    Swal.fire({
        title: "¡Gracias por tu compra!",
        text: "Muchas gracias por comprar en tienda BATTA, se enviará su factura por el mail registrado. ¡Sigue aprovechando nuestros fabulosos descuentos!",
        icon: "success",
        confirmButtonText: "Aceptar",
    });
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");

    Toastify({
        text: "Carrito vaciado",
        duration: 8000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ff6b6b, #ff4d4d)",
        },
    }).showToast();
}

document.querySelector(".nav-buttons .btn.carrito").addEventListener("click", mostrarCarrito);

// Calculos de precios

function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

/* -------- Navegación Dinámica ------ */
function cargarPagina(pagina) {
    fetch(pagina)
        .then(response => response.text())
        .then(html => {
            const contenedor = document.getElementById("contenido");
            if (contenedor) contenedor.innerHTML = html;
        })
        .catch(error => console.error("Error al cargar la página:", error));
}

// Mostrar sección dinámica
function mostrarSeccion(seccionId) {
    document.querySelectorAll("main .section").forEach(section => {
        section.style.display = "none"; 
    });
    const target = document.getElementById(seccionId);
    if (target) target.style.display = "block"; 
}
