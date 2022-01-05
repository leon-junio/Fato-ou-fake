//constantes
const URLS = {
    index: "index.html"
};

// declara as categorias padrão do site
var db_categorias = {
    "data": [{
            "id": 1,
            "nome": "Economia",
            "descricao": "Noticias sobre o mercado de ações, cotação de moedas e investimentos em fundos financeiros."
        },
        {
            "id": 2,
            "nome": "Artes",
            "descricao": "Noticias sobre a vericidade, compra e raridade de obras de arte."
        },
        {
            "id": 3,
            "nome": "Esportes",
            "descricao": "Noticias sobre futebol, esportistas e o dia a dia do mercado de transferências."
        },
        {
            "id": 4,
            "nome": "Politica",
            "descricao": "Noticias sobre ações de politicos, novas leis criadas, ações vindas de Brasilia e informações de estratégia política."
        },
    ]
}

//inicia o localstorage
var db = getDataInLocalStorage();
if (!db) {
    db = db_categorias;
};

// função para criar categorias
function createCategoria(attrs) {
    return {
        id: generateUIID(),
        nome: attrs.nome,
        descricao: attrs.descricao,
    }
}

// obtendo categorias do localStorage
function getDataInLocalStorage() {
    let categorias = JSON.parse(localStorage.getItem("db_categorias"));
    return categorias;
}

// setando dados no localStorage 
function setDataInLocalStorage(categoria) {
    let idCat = 1;
    if (db.data.length != 0)
        idCat = db.data[db.data.length - 1].id + 1;
    let newCat = {
        "id": idCat,
        "nome": categoria.nome,
        "descricao": categoria.descricao
    };
    db.data.push(newCat);
    localStorage.setItem('db_categorias', JSON.stringify(db));
}


function updateCategoria(id, categoria) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.data.map(obj => obj.id).indexOf(id);
    // Altera os dados do objeto no array
    db.data[index].nome = categoria.nome,
        db.data[index].descricao = categoria.descricao
    alert("categoria alterada com sucesso");
    // Atualiza os dados no Local Storage
    localStorage.setItem('db_categorias', JSON.stringify(db));
}

function deleteCategoria(id) {
    // Filtra o array removendo o elemento com o id passado
    db.data = db.data.filter(function(element) { return element.id != id });
    alert("categoria removida com sucesso");
    // Atualiza os dados no Local Storage
    localStorage.setItem('db_categorias', JSON.stringify(db));
}