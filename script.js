// Base de dados

const data = {
    produtos: [
        {
            id: 1,
            nome: "Produto 1",
            preco: 10.99,
            categoria: "Categoria A",
            imagem: "assets/produto1.jpg",
            descricao: "Descrição do Produto 1",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Produto 2",
            preco: 19.99,
            categoria: "Categoria B",
            imagem: "assets/produto2.jpg",
            descricao: "Descrição do Produto 2",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Produto 3",
            preco: 5.99,
            categoria: "Categoria A",
            imagem: "assets/produto3.jpg",
            descricao: "Descrição do Produto 3",
            emEstoque: true
        },
        {
            id: 4,
            nome: "Produto 4",
            preco: 29.99,
            categoria: "Categoria C",
            imagem: "assets/produto4.jpg",
            descricao: "Descrição do Produto 4",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Produto 5",
            preco: 14.99,
            categoria: "Categoria B",
            imagem: "assets/produto5.jpg",
            descricao: "Descrição do Produto 5",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Produto 6",
            preco: 9.99,
            categoria: "Categoria A",
            imagem: "assets/produto6.jpg",
            descricao: "Descrição do Produto 6",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Produto 7",
            preco: 19.99,
            categoria: "Categoria C",
            imagem: "assets/produto7.jpg",
            descricao: "Descrição do Produto 7",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Produto 8",
            preco: 24.99,
            categoria: "Categoria B",
            imagem: "assets/produto8.jpg",
            descricao: "Descrição do Produto 8",
            emEstoque: false
        }
    ]
};


// Seleção dos elementos DOM

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const search = document.querySelector("#search");
const category = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");


// Função para formatar preço

function formatPrice(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// Criar card do produto

function createProductCard(produto) {
    const card = document.createElement("div");

    card.setAttribute("data-id", produto.id);
    card.classList.add("card");

    card.style.backgroundColor = "white";

    const imagem = document.createElement("img");
    imagem.setAttribute("src", produto.imagem);
    imagem.setAttribute("alt", produto.nome);

    const titulo = document.createElement("h2");
    titulo.classList.add("card-title");
    titulo.textContent = produto.nome;

    const preco = document.createElement("p");
    preco.textContent = formatPrice(produto.preco);

    const categoriaProduto = document.createElement("p");
    categoriaProduto.textContent = "Categoria: " + produto.categoria;

    const btnDetalhes = document.createElement("button");
    btnDetalhes.textContent = "Ver Detalhes";

    btnDetalhes.addEventListener("click", function() {
        showProductDetails(produto);
    });

    const btnDestacar = document.createElement("button");
    btnDestacar.textContent = "Destacar Produto";

    btnDestacar.addEventListener("click", function() {
        card.classList.toggle("highlight");
    });

    card.appendChild(imagem);
    card.appendChild(titulo);
    card.appendChild(preco);
    card.appendChild(categoriaProduto);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestacar);

    return card;
}


// Renderizar produtos

function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(function(produto) {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {
        console.log(
            "Card criado - data-id:",
            card.getAttribute("data-id")
        );
    });
}


// Renderizar categorias

function renderCategories() {
    category.innerHTML = "";

    const opcaoTodas = document.createElement("option");

    opcaoTodas.value = "Todas";
    opcaoTodas.textContent = "Todas";

    category.appendChild(opcaoTodas);

    const categorias = [];

    data.produtos.forEach(function(produto) {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorias.forEach(function(nomeCategoria) {
        const opcao = document.createElement("option");

        opcao.value = nomeCategoria;
        opcao.textContent = nomeCategoria;

        category.appendChild(opcao);
    });
}


// Mostrar detalhes

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}


// Filtrar produtos

function filterProducts() {
    const textoBusca = search.value.toLowerCase();
    const categoriaSelecionada = category.value;

    const produtosFiltrados = data.produtos.filter(function(produto) {
        const nomeCoincide = produto.nome
            .toLowerCase()
            .includes(textoBusca);

        const categoriaCoincide =
            categoriaSelecionada === "Todas" ||
            produto.categoria === categoriaSelecionada;

        return nomeCoincide && categoriaCoincide;
    });

    return produtosFiltrados;
}


// Eventos

search.addEventListener("input", function() {
    const produtosFiltrados = filterProducts();
    renderProducts(produtosFiltrados);
});

category.addEventListener("change", function() {
    const produtosFiltrados = filterProducts();
    renderProducts(produtosFiltrados);
});

btnRender.addEventListener("click", function() {
    const produtosFiltrados = filterProducts();
    renderProducts(produtosFiltrados);
});


// Inicialização

renderCategories();
renderProducts(data.produtos);