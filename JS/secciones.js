// Funcion para cargar una nueva página dentro del contenedor "contenido"

function cargarPagina(pagina) {
    const contenedor = document.getElementById("contenido");

    fetch(pagina)
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar la página.");
            return response.text();
        })
        .then(data => {
            contenedor.innerHTML = data;
            window.scrollTo(0, 0);

            // Buscar y ejecutar scripts en la página cargada
            const scripts = contenedor.querySelectorAll("script");
            scripts.forEach(script => {
                const nuevoScript = document.createElement("script");
                if (script.src) {
                    nuevoScript.src = script.src;
                } else {
                    nuevoScript.innerHTML = script.innerHTML;
                }
                document.body.appendChild(nuevoScript);
                document.body.removeChild(nuevoScript); // Limpieza de memoria
            });

            // Llamadas a inicializadores según la página
            if (pagina.includes("../HTML/loggin.html")) {
                cargarFormularioLogin();
            }
            if (pagina.includes("../HTML/productos.html")) {
                mostrarProductos();
            }
        })
        .catch(error => {
            contenedor.innerHTML = "<p>Error al cargar el contenido. Inténtalo de nuevo más tarde.</p>";
            console.error(error);
        });
}

// Inicializar la página de inicio automáticamente al cargar
document.addEventListener("DOMContentLoaded", () => {
    cargarPagina("inicio.html");
});
