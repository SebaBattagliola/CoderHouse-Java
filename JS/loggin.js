document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.querySelector(".login-container");
    if (loginContainer) {
        console.log("Login cargado correctamente.");}
        else {
            console.log("Error al cargar loggin.")
        }
    

    const botonRegistro = document.getElementById("botonRegistro");
    if (botonRegistro) {
        botonRegistro.addEventListener("click", mostrarFormularioRegistro);
    }
});

// Mostrar/ocultar formulario de registro
function mostrarFormularioRegistro() {
    const registroContainer = document.getElementById("registro-container");
    if (registroContainer) {
        registroContainer.classList.toggle("oculto");
        // Cambiar botón a "Cerrar registro" si el formulario está visible
        const botonRegistro = document.getElementById("botonRegistro");
        if (registroContainer.classList.contains("oculto")) {
            botonRegistro.textContent = "Registrar Usuario";
        } else {
            botonRegistro.textContent = "Cerrar Registro";
        }
    } else {
        console.error("El contenedor de registro no se encontró.");
    }
}

// Manejar inicio de sesión
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(
        u => u.username === username && u.password === password
    );

    if (usuarioValido) {
        Swal.fire({
            title: "¡Bienvenido!",
            text: "Inicio de sesión exitoso. Disfruta de los maravillosos descuentos.",
            icon: "success",
            confirmButtonText: "Aceptar"
        });

        // Resetear formulario de login
        document.getElementById("formLogin").reset();
    } else {
        Swal.fire({
            title: "Error",
            text: "Usuario o contraseña incorrectos.",
            icon: "error",
            confirmButtonText: "Intentar de nuevo"
        });
    }
}

// Manejar registro de usuario
function handleRegister(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const username = document.getElementById("usernameRegistro").value.trim();
    const password = document.getElementById("passwordRegistro").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validaciones básicas
    if (!nombre || !apellido || !username || !password || !edad || !email) {
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    // Crear nuevo usuario
    const nuevoUsuario = { nombre, apellido, username, password, edad, email };

    // Guardar usuario en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
        title: "Registro exitoso",
        text: "Usuario registrado correctamente. Ahora puedes iniciar sesión.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });

    // Ocultar formulario de registro
    mostrarFormularioRegistro();

    // Resetear el formulario
    document.getElementById("formRegistro").reset();
}

console.log("JS de loggin cargado correctamente.");





