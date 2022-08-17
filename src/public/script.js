const loginForm = document.querySelector('#loginForm')
const usernameInput = document.querySelector('#username')

async function submitHandler(e){
    e.preventDefault()
    try {
        console.log(usernameInput.value);
        await fetch(`/api/login?username=${usernameInput.value}`)

       window.location.href = "/";
    } catch (error) {
        console.log(error);
    }
   
}

loginForm.addEventListener('submit', submitHandler);