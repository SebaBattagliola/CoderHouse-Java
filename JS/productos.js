document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.querySelector(".product-container");
    if (contenedorProductos) {
        cargarProductos();
    } else {
        console.error("Error: '.product-container' no está en el DOM.");
    }
});


//Cargar productos
//Tuve problemas con dejar cargados los productos, si me los deja cargado... no los ordena luego. Preferi dejar el orden, cuando los ordenan aparecen. Salu2s profe.

function cargarProductos() {
    fetch("../JS/productos.json")
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar el archivo JSON");
            return response.json();
        })
        .then(data => {
            mostrarProductos(data);
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
        });
}



//Mostrar productos


function mostrarProductos(productos) {
    const contenedorProductos = document.querySelector(".product-container");
    if (!contenedorProductos) return;

    contenedorProductos.innerHTML = ""; 

    productos.forEach(producto => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product", `product-${producto.id}`);

        productDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <button class="btn comprar" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(productDiv);
    });
}


// Agregar al carrito
function agregarAlCarrito(id) {
    fetch("../JS/productos.json")
        .then(response => response.json())
        .then(data => {
            const producto = data.find(p => p.id === id);
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));

            Toastify({
                text: "Producto agregado al carrito",
                duration: 5000,
                close: true,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff6b6b, #ff4d4d)",
                },
            }).showToast();
        })
        .catch(error => console.error("Error al agregar al carrito:", error));
}

// Ordenar productos
function ordenarProductos(criterio) {
    fetch("../JS/productos.json")
        .then(response => response.json())
        .then(data => {
            let productosOrdenados = [...data];
            if (criterio === "asc") {
                productosOrdenados.sort((a, b) => a.precio - b.precio);
            } else if (criterio === "desc") {
                productosOrdenados.sort((a, b) => b.precio - a.precio);
            }
            mostrarProductos(productosOrdenados);
        })
        .catch(error => console.error("Error al ordenar productos:", error));
}

