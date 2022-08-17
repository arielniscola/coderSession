const socket = io()
//campos productos form
const formProduct = document.querySelector("#formProduct")
const titleInput = document.querySelector("#titleInput")
const priceInput = document.querySelector("#priceInput")
const thumbnailInput = document.querySelector("#thumbnailInput")
//campos mensajes form
const formMessage = document.querySelector('#formMessage')
const emailInput = document.querySelector('#emailInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')
const logoutInput = document.querySelector('#logout')

function sendMessage() {
    try {
        const username = emailInput.value
        const message = messageInput.value
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        socket.emit('client:message', { username, date, message })
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}
function sendProduct(){
    try {
        const title = titleInput.value
        const price = priceInput.value
        const thumbnail = thumbnailInput.value;
        socket.emit('client:product', { title, price, thumbnail})
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}
function renderMessages(messagesArray) {
    try {
        const html = messagesArray.map(messageInfo => {
            return(`<div>
            <strong style="color: blue;" >${messageInfo.username}</strong>[
            <span style="color: brown;">${messageInfo.date}</span>]:
            <em style="color: green;font-style: italic;">${messageInfo.message}</em> </div>`)
        }).join(" ");
        messagesPool.innerHTML = html
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}
//formulario de ingreso mensaje
formMessage.addEventListener('submit', event => {
    event.preventDefault();
    sendMessage();
    messageInput.value = "" 
})
formProduct.addEventListener('submit', event => {
    event.preventDefault();
    sendProduct();
    titleInput.value = "";
    priceInput.value = 0;
    thumbnailInput.value = "";
    
})
logoutInput.addEventListener('submit', event => {
    event.preventDefault();
    window.location.href = "/logout";
})

socket.on('server:message', renderMessages);


async function renderProducts(products){
    try{
        const response = await fetch('/plantilla.hbs')
        const plantilla = await response.text()
   
        const template = Handlebars.compile(plantilla)
        const html = template({products:products})
        document.querySelector('#productos').innerHTML = html
    }catch(err){
        console.log(`Hubo un error ${error}`)
    }
       
}
    const el = document.getElementById("welcomeuser");
    el.textContent = "Bienvenido!!";
    

socket.on('server:products', renderProducts);
