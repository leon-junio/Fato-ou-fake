'use strict'

// var db_contatos_inicial = [
//     {
//     "nome": "Kirstin",
//     "nascimento": "04/20/2017",
//     "email": "kollerhead0@mediafire.com"
//   }, {
//     "nome": "Radesh",
//     "nascimento": "12/14/2017",
//     "email": "arenwick1@comcast.net"
//   }, {
//     "nome": "Ebony",
//     "nascimento": "07/25/2020",
//     "email": "eeddins2@cbsnews.com"
//   }, {
//     "nome": "Irwinn",
//     "nascimento": "08/10/2018",
//     "email": "ibudgen3@mapy.cz"
//   }, {
//     "nome": "Neron",
//     "nascimento": "04/17/2020",
//     "email": "nblamires4@360.cn"
//   }, {
//     "nome": "Odelinda",
//     "nascimento": "01/01/2018",
//     "email": "ochildes5@google.com.au"
//   }, {
//     "nome": "Collin",
//     "nascimento": "07/11/2020",
//     "email": "craistrick6@wunderground.com"
//   }, {
//     "nome": "Drusie",
//     "nascimento": "01/24/2019",
//     "email": "dizkoveski7@ibm.com"
//   }, {
//     "nome": "Issiah",
//     "nascimento": "08/23/2021",
//     "email": "ieslinger8@examiner.com"
//   }, {
//     "nome": "Korry",
//     "nascimento": "12/25/2018",
//     "email": "kgoodlip9@ask.com"
//   }, {
//     "nome": "Brose",
//     "nascimento": "05/11/2017",
//     "email": "bbowkera@google.it"
//   },
// ];

var db = JSON.parse(localStorage.getItem('db_usuarios'));
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
            dataNascimento: document.getElementById('dataNascimento').value,
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
        <td>${client.dataNascimento}</td>
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
    document.getElementById('dataNascimento').value = client.dataNascimento
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