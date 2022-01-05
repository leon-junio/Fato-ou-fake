// FUNÇÃO PARA MOSTRAR O MENU
const menuShow = () => {
    const nav = $(`#navMenu`);

    if (nav) nav.toggleClass('menu-show');
}

// FUNÇÃO PARA REMOVER O MENU
const removeMenu = () => {
    const nav = $(`#navMenu`);

    if (nav) nav.removeClass('menu-show');
}

// FUNÇÃO DE SCROLL PARA ATIVAR LINKS 
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            $(`.nav-link[href*='${sectionId}']`).addClass('active')
        }else{
            $(`.nav-link[href*='${sectionId}']`).removeClass('active')
        }
    })
}

// const scrollActive = () => {
//     const scrollY = window.pageYOffset;

// }

// FUNÇÃO INIT
onload = () => {
    // declaração das variáveis
    const toggle = $('#navToggle'), 
          navLinks = $('.nav-link'),
          btnEntrar = $('#btnEntrar'); 

    // adicionar listener de click aos elementos 
    toggle.click(menuShow);

    navLinks.click(removeMenu)

    btnEntrar.click(function() {
        window.location.href = './login.html' 
    })

    // adicionar listener de scroll
    //sections.scroll(scrollActive)
}