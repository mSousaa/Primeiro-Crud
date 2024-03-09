firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "pages/home/home.html"
    }
})

function validacaoEmail() {
    toggleButtons()
    toggleErrorEmail()
}
function validacaoSenha() {
    toggleButtons()
    toggleErrorSenha()
}

function emailValido(){
    const email = form.email().value
    if (!email){
        return false
    }
    return validateEmail(email)
}
function senhaValida(){
    const senha = form.senha().value
    if (!senha) {
        return false
    }
    return true
}

function toggleErrorEmail() {
    const email = form.email().value
    form.emailError().style.display = email ? "none" : "block"
    form.emailInvalido().style.display = emailValido(email) ? "none" : "block"
}

function toggleErrorSenha() {
    const senha = form.senha().value
    form.senhaError().style.display = senha ? "none" : "block"
}

function toggleButtons(){
    const email = emailValido()
    form.recuperarSenha().disabled = !email
    const senha = senhaValida()
    form.login().disabled = !email || !senha
}

const form = {
    email: () => document.getElementById("email"),
    senha: () => document.getElementById("senha"),
    recuperarSenha: () => document.getElementById("recuperarsenha"),
    login: () => document.getElementById("login"),
    emailError: () => document.getElementById("emailerror"),
    emailInvalido: () => document.getElementById("email-invalido"),
    senhaError: () => document.getElementById("senha-error")
}


function paglogin() {
    showLoading()
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.senha().value
    ).then(response => {
        hideLoading()
        window.location.href = "./pages/home/home.html"
    }).catch(error => {
        hideLoading()
        alert(getError(error))
    })
}
function getError(error) {
    if(error.code == "auth/invalid-credential") {
        return "Usuário não encontrado, ou senha inválida"
    }
    if (error.code == "auth/wrong-passord"){
        return "Senha inválida"
    }
    return error.message
}

function register() {
    window.location.href = "./pages/registro/registro.html"
}

function recoverPassword(){
    showLoading()
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading()
        alert("Email de recuperação de senha enviado com sucesso")
    }).catch(error => {
        hideLoading()
        alert(getError(error))
    })
}