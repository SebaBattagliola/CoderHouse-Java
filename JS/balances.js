/* Conectar Metamask */ 
document.addEventListener("DOMContentLoaded", function() {
    const metamaskButton = document.querySelector(".metamask");
    if (metamaskButton) {
        metamaskButton.addEventListener("click", async function() {
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
    } 
});


// Balances para red Sepolia

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".metamask").addEventListener("click", async function() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                alert("MetaMask conectado correctamente.");
                mostrarBalanceSepolia();
            } catch (error) {
                alert("Error al conectar con MetaMask: " + error.message);
            }
        } else {
            alert("MetaMask no está instalado. Por favor, instálalo desde https://metamask.io/");
        }
    });
});

async function mostrarBalanceSepolia() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        document.getElementById("token-balance").innerText = `+ ${ethers.utils.formatEther(balance)} ETH`;
    } catch (error) {
        console.error("Error al mostrar el balance:", error);
        alert("No se pudo obtener el balance. Verifica la conexión con la red Sepolia.");
    }
}

