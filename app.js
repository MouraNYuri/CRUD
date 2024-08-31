// Formulário
const produtoForm = document.getElementById('produtoForm');

//Inputs do formulário
const inputNome = document.getElementById('nome');
const inputPreco = document.getElementById('preco');
const inputSubmit = document.getElementById('submit');

// Corpo da tabela
const produtoTableBody = document.querySelector('#produtoTable tbody');

// Lista de objetos dos produtos
let produtos = [{valueInputNome: 'Prato', valueInputPreco: '5'}, {valueInputNome: 'Garfo', valueInputPreco: '2'}];

// Variável de controle para saber se estamos editando
let indexEdicao = null;

// Função de atualizar produto da lista de produtos
function atualizarProduto(index) {
    const produto = produtos[index];
    inputNome.value = produto.valueInputNome;
    inputPreco.value = produto.valueInputPreco;
    inputSubmit.value = 'Atualizar';

    // Define o índice de edição
    indexEdicao = index;
}

// Função de deletar um produto da lista de produtos
function deletarProduto(index) {
    produtos.splice(index, 1);
    visualizarListaProdutos();
}

// Função de visualizar os produtos no corpo da tabela
function visualizarListaProdutos() {
    // Limpa o corpo tabela
    produtoTableBody.innerHTML = '';

    produtos.forEach((produto, index) => {
        // Cria uma nova linha no corpo tabela
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${index + 1}</td>
            <td>${produto.valueInputNome}</td>
            <td>${produto.valueInputPreco}</td>
            <td>
                <button class="atualizar" onclick="atualizarProduto(${index})">Editar</button>
                <button class="deletar" onclick="deletarProduto(${index})">Deletar</button>
            <td>
        `;

        produtoTableBody.appendChild(linha);
    });
}

// Função de limpar os campos de input do formulário
function limparInputs() {
    inputNome.value = '';
    inputPreco.value = '';
    inputSubmit.value = 'Enviar';
    indexEdicao = null;
}

// Função de adicionar um produto
function adicionarProduto() {
    const valueInputNome = inputNome.value;
    const valueInputPreco = inputPreco.value;
    produtos.push({ valueInputNome, valueInputPreco });

    limparInputs();
    visualizarListaProdutos();
}

// Função de atualizar um produto existente
function atualizarProdutoExistente() {
    const valueInputNome = inputNome.value;
    const valueInputPreco = inputPreco.value;
    produtos[indexEdicao] = { valueInputNome, valueInputPreco };
    
    limparInputs();
    visualizarListaProdutos();
}

// Função de submit no formulário
function aoSubmeterFormulario(evento) {
    evento.preventDefault();

    if (indexEdicao !== null) {
        atualizarProdutoExistente();
    } else {
        adicionarProduto();
    }
}

// Evento de submit do formulário
produtoForm.addEventListener('submit', aoSubmeterFormulario);

// Inicializa a visualização da lista
visualizarListaProdutos();
