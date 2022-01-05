/* estrutura do json de usuários

db_usuarios = [{
        id: '300cfcad-600a-4d7b-b250-fb635b4ffd2b', // rash de id
        nome: 'Fulano',
        email: 'teste@email'
        senha: 'senha123',
        dataNascimento: '20/05/2001', // precisa ser maior de 18 anos
	    tipo: 'adm'||'user'
    },
    .
    .
    .
]

*/

//  definição de constantes
const TOAST_ERROR = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
});

const URLS = {
    commonUser: "./pages/common-user/index.html",
    admUser: "./pages/adm-user/index.html"
};

// função para gerar o id único do usuário 
function generateUIID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// função para criar usuários
function createUsuario(attrs) {
    return {
        id: generateUIID(),
        nome: attrs.nome, 
        email: attrs.email, 
        senha: attrs.senha, 
        dataNascimento: attrs.dataNascimento, 
        tipo: attrs.tipo
    }
}

// obtendo usuários do localStorage
function getDataInLocalStorage(db) {
    let data = JSON.parse(localStorage.getItem(db)) || [];

    return data;
}

// setando dados no localStorage 
function setDataInLocalStorage(db, newData, type) {
    if (type == 'array') {
        let data = getDataInLocalStorage(db); 
    
        data.push(newData);

        localStorage.setItem(db, JSON.stringify(data));
    } else {
        localStorage.setItem(db, JSON.stringify(newData));
    }
}

// setando o adm do sistema
function setAdmUser() {
    let users = getDataInLocalStorage('db_usuarios'),
        adm = createUsuario({ 
            nome: "adm",
            email: "adm@adm", 
            senha: "123adm", 
            dataNascimento: "0000-00-00",
            tipo: "adm" 
        });

    // setando adm no local storage 
    let checkAdm = users.find(item => item.tipo == "adm");

    if (!checkAdm) {
        setDataInLocalStorage('db_usuarios', adm, 'array');
    }
}

// função de login do sistema
function login(email, pass) {
    if (!email || !pass) {
        TOAST_ERROR.fire({
            icon: 'error',
            title: 'Houve um erro ao efetuar o login! Por favor, tente novamente!'
        })
    } else {
        let users = getDataInLocalStorage('db_usuarios'),
            checkUser = users.find(item => item.email == email && item.senha == pass);

        if (checkUser) {
            // setando usuário logado;
            setDataInLocalStorage('usuario_logado', checkUser, 'object');
            
            if (checkUser.tipo == 'adm') window.location.href = URLS.admUser;
            else window.location.href = URLS.commonUser;
        
        } else {
            TOAST_ERROR.fire({
                icon: 'error',
                title: 'E-mail ou senha incorretos'
            });
        }
    }
}

// função para conferir data de nascimento 
function isUderAge(date) {
    let birthDate = new Date(date),
        today = new Date(),
        year = today.getFullYear() - birthDate.getFullYear(),
        month = today.getMonth() - birthDate.getMonth();
    
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        year--;
    } 
    
    return (year < 18) ? true : false;
}

// função para cadastrar novo usuário no sistema 
function singUp(name, email, dataNascimento, pass, confirmPass) {
    if (!name || !email || !dataNascimento || !pass || !confirmPass) {
        TOAST_ERROR.fire({
            icon: 'error',
            title: 'Houve um erro ao cadastrar novo usuário! Por favor, tente novamente!'
        })
    } else {
        if (isUderAge(dataNascimento)) {
            TOAST_ERROR.fire({
                icon: 'error',
                title: 'Usuário é menor de idade'
            })
        } else if (pass != confirmPass) {
            TOAST_ERROR.fire({
                icon: 'error',
                title: 'Senhas não coincidem'
            })
        } else {
            let users = getDataInLocalStorage('db_usuarios'),
                newUser = createUsuario({
                    nome: name,
                    email, 
                    senha: pass, 
                    dataNascimento: dataNascimento,
                    tipo: "user" 
                }),
                toastSuccess = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didDestroy: (toast) => {
                        // fazer login se caso tudo estiver correto
                        login(newUser.email, newUser.senha);
                    }
                });
            
            let checkUser = users.find(item => item.email == newUser.email);

            if (checkUser) {
                TOAST_ERROR.fire({
                    icon: 'error',
                    title: 'Esse e-mail já está cadastrado!'
                })
            } else {
                setDataInLocalStorage('db_usuarios', newUser, 'array');
                
                toastSuccess.fire({
                    icon: 'success',
                    title: 'Usuário cadastrado com sucesso'
                })
            }
        }
    }
}

// formatar data de nascimento para a impressão na tela
function formatDate(date){
    if(!date) return "";
    
    let dd = date.substring(8, 10);
    let mm = date.substring(5, 7);
    let yy = date.substring(0, 4); 
    let time = date.substring(11,19);
    let fdata = `${dd}/${mm}/${yy} ${time}`;
    return fdata == '// ' ? '' : fdata;
}

// função para listar o usuário logado 
function listUsers(table, loggedUser) {
    let users = getDataInLocalStorage(),
        rows = "";

    if (loggedUser.tipo == 'adm') {
        for (user of users) {
            rows += 
            `<tr>
                <td scope="row">${user.nome}</td>
                <td>${formatDate(user.dataNascimento)}</td>
                <td>${user.email}</td>
                <td>${user.senha}</td>
            </tr>`;
        }
    } else {
        rows = 
        `<tr>
            <td scope="row">${loggedUser.nome}</td>
            <td>${formatDate(loggedUser.dataNascimento)}</td>
            <td>${loggedUser.email}</td>
            <td>${loggedUser.senha}</td>
        </tr>`;
    }

    table.innerHTML = rows;
}
