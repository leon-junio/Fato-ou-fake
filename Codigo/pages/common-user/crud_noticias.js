var dbn = getNoticiasInLocalStorage();
var db = getCategoriasInLocalStorage();
var dbu = getUsersInLocalStorage();

function exibeInformacoes() {
    $("#tbl-noticias").html("");
    for (i = 0; i < dbn.length; i++) {
        let noticia = dbn[i];
        let user = getUser(noticia.idUsuario);
        if (user == null) {
            user = {
                id: "0",
                nome: "desconhecido"
            }
        }
        let categoria = getCategoria(noticia.idCategoria);
        if (categoria == null) {
            categoria = {
                id: "0",
                nome: "desconhecido"
            }
        }
        $("#tbl-noticias").append(`<tr>
            <td>${noticia.id}</td>
            <td>${user.nome}</td>
            <td>${noticia.titulo}</td>
            <td>${noticia.descricao}</td>
            <td>${categoria.nome}</td>
            <td>${noticia.fonteNoticia}</td>
            <td>${noticia.dataPublicada}</td>
            <td><button style="padding: 1rem; background: #FFB200; cursor: pointer;" type="button" onclick="window.location.href = './pagina-noticia.html?id=${noticia.id}'">Ver</button></td>
        </tr>`);
    }
}

function getUser(id) {
    for (iu = 0; iu < dbu.length; iu++) {
        if (id == iu) {
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

function getNoticiasInLocalStorage() {
    let noticias = JSON.parse(localStorage.getItem("db_noticias"));
    return noticias;
}

function getUsersInLocalStorage() {
    let usuarios = JSON.parse(localStorage.getItem("db_usuarios"));
    return usuarios;
}

function getCategoriasInLocalStorage() {
    let categorias = JSON.parse(localStorage.getItem("db_categorias"));
    return categorias;
}

function FormatarData(data) {
    var dia = data.split("-")[2];
    var mes = data.split("-")[1];
    var ano = data.split("-")[0];
    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
}


function init() {
    $("#pesquisa").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#grid-noticias tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    exibeInformacoes();
}