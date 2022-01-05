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

// função para mostrar as notícias
const showNoticias = (areaNoticias) => {
    const noticias = JSON.parse(localStorage.getItem("db_noticias")), 
          categorias = JSON.parse(localStorage.getItem("db_categorias"));

    // resetando área das notícias
    areaNoticias.html('');

    for (const noticia of noticias) {
        let categoria = categorias.find(item => item.id == noticia.idCategoria);

        let html = `
            <div class="card" id="card${noticia.id}" data-id="${noticia.id}">
                <div class="card-header">
                    <img src="${noticia.imagem}" alt="Imagem notícia"/>
                </div>
                <div class="card-body">
                    <span class="tag tag-${categoria.tagColor}">${categoria.nome}</span>
                    <h4>${noticia.titulo}</h4>
                </div>
            </div>
        `;

        let el = $(html);

        areaNoticias.append(el);
    }
}

onload = () => {
    const toggle = $('#headerToggle'),
          link = $('.nav-link'),
          btnLogout = $('#btnHeaderUser'),
          areaNoticias = $('#areaNoticias'), 
          userLogado = JSON.parse(localStorage.getItem("usuario_logado"));

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

    // mostrar notícias
    showNoticias(areaNoticias); 

    // evento click nos cards 
    let cards = $('.card');

    if (cards) {
        cards.click(function () {
           let idNoticia = $(this).data('id');

           window.location.href = `./pagina-noticia.html?id=${idNoticia}`; 
        });
    }
}