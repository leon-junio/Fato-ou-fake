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
            "descricao": "Noticias sobre ações de politicos, novas leis criadas, ações vindas de Brasilia, informações de estratégia política e tudo envolvendo a vida dos politicos brasileiros."
        },
    ]
}

// declara noticias template
var db_noticias = {
    "data": [{
            "id": 1,
            "usuario": "admin",
            "titulo": "Brasileiro que passou pela África do Sul testa positivo para Covid",
            "descricao": "O paciente, que é vacinado, está em isolamento e cumpre quarentena em casa. Os órgãos de saúde estadual e municipal estão monitoramento o caso. Ministro Queiroga disse neste domingo que 'cuidados com essa variante são os mesmos' já recomendados para outras cepas.",
            "categoria": "Economia",
            "data": "2021-11-28",
            "fonte": "g1.globo.com",
            "fake": false,
        },
        {
            "id": 2,
            "usuario": "admin",
            "titulo": "Título da Libertadores rende mais de R$ 125 milhões ao Palmeiras",
            "descricao": "Somente a vitória na final levou R$ 84 mi para os cofres do clube. Outros R$ 40 mi foram acumulados nas fases anteriores do torneio",
            "categoria": "Esportes",
            "data": "2021-11-28",
            "fonte": "https://esportes.r7.com/",
            "fake": false,
        },
    ]
}

//inicia o localstorage
var db = getCategoriasInLocalStorage();
if (!db) {
    db = db_categorias;
    localStorage.setItem('db_categorias', JSON.stringify(db));
};
var dbn = getNoticiasInLocalStorage();
if (!dbn) {
    dbn = db_noticias;
    localStorage.setItem('db_noticias', JSON.stringify(dbn));
};



// função para criar noticias
function createNoticia(attrs) {
    return {
        id: generateUIID(),
        nome: attrs.titulo,
        categoria: attrs.categoria,
        descricao: attrs.descricao,
        data: attrs.data,
        usuario: "admin",
        fake: false,
        fonte: attrs.fonte,
    }
}

// obtendo categorias do localStorage
function getCategoriasInLocalStorage() {
    let categorias = JSON.parse(localStorage.getItem("db_categorias"));
    return categorias;
}
// obtendo noticias do localStorage
function getNoticiasInLocalStorage() {
    let noticias = JSON.parse(localStorage.getItem("db_noticias"));
    return noticias;
}

// setando dados no localStorage 
function setDataInLocalStorage(noticia) {
    let idNot = 1;
    if (dbn.data.length != 0)
        idNot = dbn.data[dbn.data.length - 1].id + 1;
    let newNot = {
        "id": idNot,
        "usuario": "admin",
        "titulo": noticia.titulo,
        "descricao": noticia.descricao,
        "data": noticia.data,
        "categoria": noticia.categoria,
        "fake": false,
        "fonte": noticia.fonte,
    };
    dbn.data.push(newNot);
    localStorage.setItem('db_noticias', JSON.stringify(dbn));
}


function updateNoticia(id, noticia) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = dbn.data.map(obj => obj.id).indexOf(id);
    // Altera os dados do objeto no array
    dbn.data[index].titulo = noticia.titulo,
        dbn.data[index].descricao = noticia.descricao,
        dbn.data[index].categoria = noticia.categoria,
        dbn.data[index].data = noticia.data,
        dbn.data[index].fonte = noticia.fonte;
    alert("Noticia alterada com sucesso");
    // Atualiza os dados no Local Storage
    localStorage.setItem('db_noticias', JSON.stringify(dbn));
}

function deleteNoticia(id) {
    // Filtra o array removendo o elemento com o id passado
    dbn.data = dbn.data.filter(function(element) { return element.id != id });
    alert("Noticia removida com sucesso");
    // Atualiza os dados no Local Storage
    localStorage.setItem('db_noticias', JSON.stringify(dbn));
}