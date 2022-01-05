//  definição de constantes
const TOAST_ERROR = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
});

// função para logOut
function logout(e) {
    TOAST_ERROR.fire({
        icon: 'warning',
        title: 'Evento de logout não está disponível neste artefato'
    });
}

// função para mostrar o menu
const showMenu = () => {
    const nav = $('#navBar'),
        bodyPd = $('#bodyPd'),
        headerPd = $('#header');
  
    if (nav && bodyPd && headerPd) {
        nav.toggleClass('show-menu');

        $('#headerToggle').toggleClass('bx-x');

        bodyPd.toggleClass('body-pd');

        headerPd.toggleClass('body-pd');
    } 
}

// função para pegar o id da url 
function getUrlVars() {
    let vars = {};
    
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });

    return vars;
}

// função para listar a notícia
function showNoticia(areaNoticia, noticia) {
    let categorias = JSON.parse(localStorage.getItem("db_categorias")),
        categoria = categorias.find(item => item.id == noticia.idCategoria);

    let html = `
        <div class="noticia-header">
            <img src="${noticia.imagem}" alt="imagem da notícia">
        </div>
        <div class="noticia-body">
            <span class="tag tag-${categoria.tagColor}">${categoria.nome}</span>
            <h2>${noticia.titulo}</h2>
            <span class="data-noticia">${noticia.dataPublicada}</span>
            <p>${noticia.descricao}</p>
        </div>
    `;

    areaNoticia.append(html);
}

// função para printar o resultado
function printResult(itsRight, noticia) {
    if (itsRight) {
        $('#resultNoticia').text('Parabéns!! Você é um perito em achar Fake News!');
        $('#resultNoticia').removeClass('error');
        $('#resultNoticia').addClass('success');
    } else {
        let html = `
            <p>Essa não!! Você caiu em uma Fake News!</p>
            <p>Fonte da notícia: ${noticia.fonteNoticia}</p>
        `;

        $('#resultNoticia').html(html);
        $('#resultNoticia').removeClass('success');
        $('#resultNoticia').addClass('error');
    }
}

// função para validar a notícia
function validateNews(tag, noticia) {
    let usuario_logado = JSON.parse(localStorage.getItem("usuario_logado")),
        verificacoesNoticias = JSON.parse(localStorage.getItem("db_verificacoes_noticias")),
        isFakeNews = (tag == 'FATO') ? false : true, 
        validacao = {};

    if (noticia.isFakeNews == isFakeNews) {
        validacao = {
            idUsuario: usuario_logado.id, 
            itsRight: true
        };

        printResult(true, noticia);
    } else {
        validacao = {
            idUsuario: usuario_logado.id, 
            itsRight: false
        };

        printResult(false, noticia);
    }

    verificacoesNoticias.map(item => {
        if (item.idNoticia == noticia.id) {
            item.verificacoes.push(validacao)
        }
    });

    localStorage.setItem("db_verificacoes_noticias", JSON.stringify(verificacoesNoticias));

    $('#btnFooter').hide();
}

// código inicializado junto da página
onload = () => {
    // constantes para o menu
    const toggle = $('#headerToggle'),
          link = $('.nav-link'),
          btnLogout = $('#btnHeaderUser'), 
          userLogado = JSON.parse(localStorage.getItem("usuario_logado"));

    //  constantes da página
    const noticias = JSON.parse(localStorage.getItem("db_noticias")), 
          id = getUrlVars()["id"], 
          noticia = noticias.find(item => item.id == id), 
          areaNoticia = $('#areaNoticia'), 
          btnFato = $('#btnFato'), 
          btnFake = $('#btnFake'), 
          verificacoesNoticias = JSON.parse(localStorage.getItem("db_verificacoes_noticias"));

    // verificar se a noticia existe
    if (!noticia) {
        window.location.href = './index.html'
    }

    // SETAR USUÁRIO E MENU
    $('#headerUser').text(userLogado.nome);

    toggle.click(showMenu);

    btnLogout.click(function(e) {
        e.preventDefault();

        logout();
    });

    if (link) {
        link.click(function() {
            link.each(function(i) {
                $(this).removeClass('active');
            });

            $(this).addClass('active');
        });
    }
    
    // listar a notiícia na página
    showNoticia(areaNoticia, noticia);

    // verificar se já validou essa notícia 
    let checkVerificacoes = verificacoesNoticias.find(item => item.idNoticia == id);

    if (checkVerificacoes.verificacoes.length > 0) {
        let userVerificacao = checkVerificacoes.verificacoes.find(item => item.idUsuario == userLogado.id);
        
        if (userVerificacao) {
            $('#btnFooter').hide();

            printResult(userVerificacao.itsRight, noticia);
        }
    } 

    // adição do evento de clique nos botões
    btnFato.click(function() {
        validateNews('FATO', noticia);
    });

    btnFake.click(function() {
        validateNews('FAKE', noticia)
    })
}