'use strict'

var db_contatos_inicial = [
    {
    "nome": "Kirstin",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "kollerhead0@mediafire.com"
  }, {
    "nome": "Radesh",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "arenwick1@comcast.net"
  }, {
    "nome": "Ebony",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "eeddins2@cbsnews.com"
  }, {
    "nome": "Irwinn",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "ibudgen3@mapy.cz"
  }, {
    "nome": "Neron",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "nblamires4@360.cn"
  }, {
    "nome": "Odelinda",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "ochildes5@google.com.au"
  }, {
    "nome": "Collin",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "craistrick6@wunderground.com"
  }, {
    "nome": "Drusie",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "dizkoveski7@ibm.com"
  }, {
    "nome": "Issiah",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "ieslinger8@examiner.com"
  }, {
    "nome": "Korry",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "kgoodlip9@ask.com"
  }, {
    "nome": "Brose",
    "comentario": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure mollitia totam est atque quas, autem quia doloremque deserunt! Itaque dignissimos modi ipsum dicta vitae laudantium corporis quia sapiente est id.",
    "email": "bbowkera@google.it"
  },
];

var db = JSON.parse(localStorage.getItem('db_contato'));
if (!db) {
    db = db_contatos_inicial
};

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? db
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))


const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}
  
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}


const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveClient = () => {
    debugger
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            comentario: document.getElementById('comentario').value,
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.comentario}</td>
        <td>
            <button  type="button" class="button green" id="edit-${index}"><i class="fas fa-edit"></i></button>
            <button  type="button" class="button red " id="delete-${index}"><i class="fas fa-trash-alt"></i></button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    console.log(dbClient);
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('comentario').value = client.comentario
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Confirmar exclusão:`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)