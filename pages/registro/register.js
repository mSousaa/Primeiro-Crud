function onChangeEmail() {
    const email = form.email().value
    form.emailRequire().style.display = email ? "none" : "block"

    form.emailInvalido().style.display = validateEmail(email) ? "none" : "block"
    toggleRegisterButton()
}

function onChangePassword(){
    const password = form.senha().value
    form.passwordRequire().style.display = password ? "none" : "block"
    form.passwordMinLenght().style.display = password.length >=6 ? "none" : "block"

    validatePasswordsMath()
    toggleRegisterButton()
}

function onChangeConfirmPassword() {
    validatePasswordsMath()
    toggleRegisterButton()
}

function validatePasswordsMath() {
    const password = form.senha().value
    const confirmPassword = form.confirmarSenha().value

    form.confirmPasswordDoesntMathError().style.display = password == confirmPassword ? "none" : "block"
}

function toggleRegisterButton() {
    form.registerButton().disable = !isFormValid()
}

function isFormValid() {
    const email = form.email().value
    if(!email || !validateEmail(email)){
        return false
    }
    const password = form.senha().value
    if(!password || password.length < 6){
        return false
    }
    const confirmPassword = form.confirmarSenha().value
    if(password != confirmPassword){
        return false
    }

    return true
}
const form = {
    confirmarSenha: () => document.getElementById("confirmPassword"),
    confirmPasswordDoesntMathError: () => document.getElementById("senha-nao-igual"),
    email: () => document.getElementById("email"),
    emailRequire: () => document.getElementById("emailerror"),
    emailInvalido: () => document.getElementById("email-invalido"),
    senha: () => document.getElementById("senha"),
    passwordRequire: () => document.getElementById("senha-error"),
    passwordMinLenght: () => document.getElementById("senha-minima"),
    registerButton: () => document.getElementById("register-button"),
}