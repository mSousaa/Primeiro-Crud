function onChangeEmail() {
    const email = form.email().value
    form.emailRequire().style.display = email ? "none" : "block"

    form.emailInvalido().style.display = validateEmail(email) ? "none" : "block"
}

const form = {
    confirmarSenha: () => document.getElementById("confirmPassword"),
    email: () => document.getElementById("email"),
    emailRequire: () => document.getElementById("emailerror"),
    emailInvalido: () => document.getElementById("email-invalido"),
    senha: () => document.getElementById("senha")
}