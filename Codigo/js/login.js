// função inicial do sistema
onload = () => {
    let frmLogin = document.querySelector("#frmLogin");

    frmLogin.addEventListener("submit", (e) => {
        // impedit página de recarregar
        e.preventDefault();

        // obtendo os dados do usuário
        let email = e.target[0].value,
            pass = e.target[1].value;

        // chamar função de login
        login(email, pass);
    });

    // setando adm caso ainda não esteja setado
    setAdmUser();
}
    