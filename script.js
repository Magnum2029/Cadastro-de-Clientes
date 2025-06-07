const apiBaseUrl = "https://crudcrud.com/api/33c66541604049e1b6da7277c7b6167d/clientes";

const form = document.getElementById("cliente-form");
const nomeInput = Document.getElementById("nome");
const emailInput = document.getElementById("email");
const listaClientes = document.getElementById("clientes-lista");

// Carregar clientes ao iniciar
window.addEventListener("DOMContentLoaded", carregarClientes);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const cliente = {
        nome: nomeInput.value,
        email: emailInput.value
    };

    fetch(apiBaseUrl, {
        method: "POST",
        headers: {"Content-Type": "application/jon" },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json() )
    .then(data => {
        adicionarClienteNaLista(data);
        form.reset();
    })
    .catch(err => console.error("Erro ao cadastrar:", err));
});

function carregarClientes() {
    fetch(apiBaseUrl)
    .then(response => response.json())
    .then(clientes => {
        listaClientes.innerHTML = "";
        clientes.forEach(adicionarClienteNaLista);
    })
    .catch(err => console.error("Erro ao carregar clientes:",));
}

function adicionarClienteNaLista(cliente) {
    const li = document.createElement("li");
    li.textContent = `${cliente.nome} - ${cliente.email}`;

    const btn = document.createElement("button");
    btn.textContent = "Excluir";
    btn.className = "delete-btn";
    btn.onclick = () => deletarCliente(cliente._id, li);

    li.appendChild(btn);
    listaClientes.appendChild(li);
}

function deletarCliente(id, liElement) {
    fetch(`${apiBaseUrl}/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        liElement.remove();
    })
    .catch(err => console.error("Erro ao excluir cliente:", err));
}