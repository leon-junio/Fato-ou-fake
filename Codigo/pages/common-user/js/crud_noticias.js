function exibeInformacoes() {
    $("#tbl-noticias").html("");
    for (i = 0; i < dbn.length; i++) {
        let noticia = dbn[i];
        let user = getUser(noticia.idUsuario);
        let cat = getCategoria(noticia.idCategoria);
        if (cat == null) {
            cat = {
                id: "0",
                nome: "desconhecido"
            }
        }
        if (user == null) {
            user = {
                id: "0",
                nome: "desconhecido"
            }
        }
        $("#tbl-noticias").append(`<tr>
                                <td>${noticia.id}</td>
                                <td>${user.nome}</td>
                                <td>${noticia.titulo}</td>
                                <td>${noticia.descricao}</td>
                                <td>${cat.nome}</td>
                                <td>${noticia.fonteNoticia}</td>
                                <td>${noticia.dataPublicada}</td>
                            </tr>`);
    }
    $("#inputCategoria").html("");
    for (i = 0; i < db.length; i++) {
        let categoria = db[i];
        $("#inputCategoria").append(
            `<option value=${categoria.nome}>${categoria.nome}</option>`);
    }
}

function FormatarData(data) {
    var dia = data.split("-")[2];
    var mes = data.split("-")[1];
    var ano = data.split("-")[0];
    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
}


function init() {
    $("#btnInsert").click(function() {
        if (!$('#form-noticias')[0].checkValidity()) {
            alert("Preencha o formulário corretamente.");
            return;
        }
        let campoTitulo = $("#inputTitulo").val();
        let campoDescricao = $("#inputDescricao").val();
        let campoCategoria = $("#inputCategoria").val();
        let cat = 0;
        for (let ai = 0; ai < db.length; ai++) {
            if (db[ai].nome == campoCategoria) {
                console.log("hello");
                cat = db[ai].id;
            }
        }
        console.log(cat);
        let campoFonte = $("#inputFonte").val();
        let fake = document.getElementById("inputFake");
        let campoData = $("#inputData").val();
        bannerImage = document.getElementById('bannerImg');
        imgData = "data:image/png;base64,";
        imgData += getBase64Image(bannerImage);
        let noticia = {
            titulo: campoTitulo,
            descricao: campoDescricao,
            idCategoria: cat,
            fonteNoticia: campoFonte,
            isFakeNews: fake,
            imagem: imgData,
            dataPublicada: campoData,
        };
        setDataInLocalStorage(noticia);
        exibeInformacoes();
        $("#form-noticias")[0].reset();
        bannerImage.src = " ";
        alert("Incluído com sucesso.");
    });
    $("#btnPesquisa").click(function() {
        var value = $("#pesquisa").val().toLowerCase();
        $("#grid-noticias tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#btnDelete").click(function() {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            alert("Selecione uma noticia para ser excluída.");
            return;
        }
        deleteNoticia(parseInt(campoId));
        exibeInformacoes();
        $("#form-noticias")[0].reset();
    });
    $("#btnClear").click(function() {
        $("#form-noticias")[0].reset();
    });
    $('#msg').bind("DOMSubtreeModified", function() {
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                $(this).remove();
            });
        }, 5000);
    });
    $("#grid-noticias").on("click", "tr", function(e) {
        let linhaNoticia = this;
        colunas = linhaNoticia.querySelectorAll("td");
        $("#inputId").val(colunas[0].innerText);
        $("#inputUsuario").val(colunas[1].innerText);
        $("#inputTitulo").val(colunas[2].innerText);
        $("#inputDescricao").val(colunas[3].innerText);
        $("#inputData").val(FormatarData(colunas[6].innerText));
        $("#inputCategoria").val(colunas[4].innerText);
        $("#inputFonte").val(colunas[5].innerText);
        $("#inputFake").val("indisponivel ou não analisado");
    });
    $("#pesquisa").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#grid-noticias tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    exibeInformacoes();
}