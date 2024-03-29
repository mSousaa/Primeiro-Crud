function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html"
    }).catch(() => {
        alert("Error ao fazer logout")
    })
}

firebase.auth().onAuthStateChanged(user => {
    if(user){
        findTransactions(user)
    }
})


function findTransactions(user){
    firebase.firestore()
        .collection('teste')
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => doc.data())
            console.log(transactions)
            addTransactionsToScreen(transactions)
        })


}   

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById("transactions")

    transactions.forEach(transaction => {
        const li = document.createElement("li")
        li.classList.add(transaction.type)
        
        const date = document.createElement("p")
        date.innerHTML = formatDate(transaction.date)
        li.appendChild(date)

        const money = document.createElement("p")
        money.innerHTML = formatMoney(transaction.money)
        li.appendChild(money)

        const type = document.createElement("p")
        type.innerHTML = transaction.transactionsType
        li.appendChild(type)

        if(transaction.description) {
            const description = document.createElement("p")
            description.innerHTML = transaction.description
            li.appendChild(description)
        }

        orderedList.appendChild(li)
    })
}

function formatMoney(money) {
    return  `${money.currency} ${money.value.toFixed(2)}`
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-br")
}

const fakeTransactions = [{
    type: "expense",
    date: "2024-01-04",
    money: {
        currency: "R$",
        value: 10
    },
    transactionsType: "Supermecado"
}, {
    type: "income",
    date: "2024-01-03",
    money: {
        currency: "R$",
        value: 5000
    },
    transactionsType: "Salário",
    description: "Empresa A"
}, {
    type: "expense",
    date: "2024-01-01",
    money: {
        currency: "EUR",
        value: 10
    },
    transactionsType: "Transporte",
    description: "Metrô ida e volta"
}, {
    type: "expense",
    date: "2024-01-01",
    money: {
        currency: "USD",
        value: 600
    },
    transactionsType: "Aluguel",
    description: "Mensalidade"
}]