function exibeCategorias() {
    $("#tbl-categorias").html("");
    for (i = 0; i < db.data.length; i++) {
        let categoria = db.data[i];
        $("#tbl-categorias").append(`<tr><td scope="row">
                                <td>${categoria.id}</td>
                                <td>${categoria.nome}</td>
                                <td>${categoria.descricao}</td>
                            </tr>`);
    }
}

function init() {
    $("#btnInsert").click(function() {
        if (!$('#form-categorias')[0].checkValidity()) {
            alert("Preencha o formulário corretamente.");
            return;
        }
        let campoNome = $("#inputNome").val();
        let campoDescricao = $("#inputDescricao").val();
        let categoria = {
            nome: campoNome,
            descricao: campoDescricao
        };
        setDataInLocalStorage(categoria);
        exibeCategorias();
        $("#form-categorias")[0].reset();
    });
    $("#btnUpdate").click(function() {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            alert("Selecione uma categoria para ser alterada.");
            return;
        }
        let campoNome = $("#inputNome").val();
        let campoDescricao = $("#inputDescricao").val();
        let categoria = {
            nome: campoNome,
            descricao: campoDescricao
        };
        updateCategoria(parseInt(campoId), categoria);
        exibeCategorias();
        $("#form-categorias")[0].reset();
    });
    $("#btnDelete").click(function() {
        let campoId = $("#inputId").val();
        if (campoId == "") {
            alert("Selecione uma categoria para ser excluída.");
            return;
        }
        deleteCategoria(parseInt(campoId));
        exibeCategorias();
        $("#form-categorias")[0].reset();
    });
    $("#btnClear").click(function() {
        $("#form-categorias")[0].reset();
    });
    $('#msg').bind("DOMSubtreeModified", function() {
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function() {
                $(this).remove();
            });
        }, 5000);
    });
    $("#grid-categoria").on("click", "tr", function(e) {
        let linhaCategoria = this;
        colunas = linhaCategoria.querySelectorAll("td");
        $("#inputId").val(colunas[1].innerText);
        $("#inputNome").val(colunas[2].innerText);
        $("#inputDescricao").val(colunas[3].innerText);
    });
    exibeCategorias();
}