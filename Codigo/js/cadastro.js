// função inicial do sistema 
onload = () => {
    let frmSingUp = document.querySelector("#frmSingUp");

    frmSingUp.addEventListener("submit", (e) => {
        // impedit página de recarregar
        e.preventDefault();

        // obtendo os dados do usuário
        let name = e.target[0].value,
            email = e.target[1].value,
            date = e.target[2].value,
            pass = e.target[3].value,
            confirmPass = e.target[4].value;

        // chamar função de cadastro de usuário
        singUp(name, email, date, pass, confirmPass);
    });

    // setando adm caso ainda não esteja setado
    setAdmUser();
};
