function exibeInformacoes() {
    $("#tbl-noticias").html("");
    for (i = 0; i < dbn.data.length; i++) {
        let noticia = dbn.data[i];
        $("#tbl-noticias").append(`<tr>
                                <td>${noticia.id}</td>
                                <td>${noticia.usuario}</td>
                                <td>${noticia.titulo}</td>
                                <td>${noticia.descricao}</td>
                                <td>${noticia.categoria}</td>
                                <td>${noticia.fonte}</td>
                                <td>${noticia.data}</td>
                            </tr>`);
    }
    $("#inputCategoria").html("");
    for (i = 0; i < db.data.length; i++) {
        let categoria = db.data[i];
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
        let campoFonte = $("#inputFonte").val();
        let campoData = $("#inputData").val();
        let noticia = {
            titulo: campoTitulo,
            descricao: campoDescricao,
            categoria: campoCategoria,
            fonte: campoFonte,
            data: campoData,
        };
        setDataInLocalStorage(noticia);
        exibeInformacoes();
        $("#form-noticias")[0].reset();
        alert("Incluído com sucesso.");
    });
    $("#btnUpdate").click(function() {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            alert("Selecione uma noticia para ser alterada.");
            return;
        }
        let campoTitulo = $("#inputTitulo").val();
        let campoDescricao = $("#inputDescricao").val();
        let campoCategoria = $("#inputCategoria").val();
        let campoFonte = $("#inputFonte").val();
        let campoData = $("#inputData").val();
        let noticia = {
            titulo: campoTitulo,
            descricao: campoDescricao,
            categoria: campoCategoria,
            fonte: campoFonte,
            data: campoData,
        };
        updateNoticia(parseInt(campoId), noticia);
        exibeInformacoes();
        $("#form-noticias")[0].reset();
        alert("Atualizado com sucesso.");
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