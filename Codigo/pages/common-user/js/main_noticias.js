//constantes
const URLS = {
    index: "index.html"
};


//inicia o localstorage
var db = getCategoriasInLocalStorage();
var dbn = getNoticiasInLocalStorage();
var dbu = getUsersInLocalStorage();
var user = getUserInLocalStorage();

// função para criar noticias
function createNoticia(attrs) {
    return {
        id: generateUIID(),
        titulo: attrs.titulo,
        idCategoria: attrs.categoria.id,
        descricao: attrs.descricao,
        dataPublicada: attrs.data,
        idUsuario: attrs.user.id,
        isFakeNews: false,
        fonte: attrs.fonte,
    }
}

function getCategoriasInLocalStorage() {
    let categorias = JSON.parse(localStorage.getItem("db_categorias"));
    return categorias;
}


// obtendo categorias do localStorage
function getCategoriasInLocalStorage() {
    let categorias = JSON.parse(localStorage.getItem("db_categorias"));
    return categorias;
}

function getUserInLocalStorage() {
    let user = JSON.parse(localStorage.getItem("usuario_logado"));
    return user;
}

function getUsersInLocalStorage() {
    let usuarios = JSON.parse(localStorage.getItem("db_usuarios"));
    return usuarios;
}


// obtendo noticias do localStorage
function getNoticiasInLocalStorage() {
    let noticias = JSON.parse(localStorage.getItem("db_noticias"));
    return noticias;
}

// setando dados no localStorage 
function setDataInLocalStorage(noticia) {
    let idNot = 1;
    if (dbn.length != 0) {
        idNot = dbn[dbn.length - 1].id + 1;
    }
    let newNot = {
        "id": idNot,
        "idUsuario": user.id,
        "titulo": noticia.titulo,
        "descricao": noticia.descricao,
        "imagem": noticia.imagem,
        "dataPublicada": noticia.dataPublicada,
        "idCategoria": noticia.idCategoria,
        "isFakeNews": noticia.isFakeNews.checked,
        "fonteNoticia": noticia.fonteNoticia,
    };
    dbn.push(newNot);
    localStorage.setItem('db_noticias', JSON.stringify(dbn));
}

function previewFile() {
    var preview = document.getElementById('bannerImg');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        preview.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

function getUser(id) {
    for (iu = 0; iu < dbu.length; iu++) {
        if (id == dbu[iu].id) {
            return dbu[iu];
        }
    }
    return null;
}

function getCategoria(id2) {
    for (ic = 0; ic < db.length; ic++) {
        if (id2 == db[ic].id) {
            return db[ic];
        }
    }
    return null;
}

function deleteNoticia(id) {
    // Filtra o array removendo o elemento com o id passado
    dbn = dbn.filter(function(element) { return element.id != id });
    alert("Noticia removida com sucesso");
    // Atualiza os dados no Local Storage
    localStorage.setItem('db_noticias', JSON.stringify(dbn));
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}