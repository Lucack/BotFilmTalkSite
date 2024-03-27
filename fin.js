// Função para abrir o modal de pagamento
function openPaymentModal(method) {
    const modal = document.getElementById("paymentModal");
    const paymentMethod = document.getElementById("paymentMethod");
    paymentMethod.textContent = `Pagamento com ${method}`;
    modal.style.display = "block";
}

// Função para fechar o modal de pagamento
function closePaymentModal() {
    const modal = document.getElementById("paymentModal");
    modal.style.display = "none";
}

// Simulação de pagamento ao clicar em "Pagar"
function confirmPayment() {
    alert("Pagamento realizado com sucesso!");
    closePaymentModal();
}

// Função para exibir os dados de compra na página
function displayBuyingData(buyingData) {
    const dataContainer = document.getElementById("dataContainer");
    for (const key in buyingData) {
        if (buyingData.hasOwnProperty(key)) {
            const value = buyingData[key];
            if (Array.isArray(value)) {
                // Se for um array, criar uma string com as cadeiras separadas por "|"
                const chairsString = value.map(item => ` ${item.chair} `).join(" | ");
                const listItem = document.createElement("div");
                listItem.classList.add("data-item");
                listItem.innerHTML = `<span class="label">${getEmoji(key)} ${translateKey(key)}:</span> | ${chairsString} |`;
                dataContainer.appendChild(listItem);
            } else {
                // Se não for um array, exibir o valor diretamente
                const dataItem = document.createElement("div");
                dataItem.classList.add("data-item");
                const emoji = getEmoji(key);
                dataItem.innerHTML = `<span class="label">${emoji} ${translateKey(key)}:</span> ${value}`;
                dataContainer.appendChild(dataItem);
            }
        }
    }
}
// Função para redirecionar para a página bought.html após o pagamento
function confirmPayment() {
    // Redirecionar para a página bought.html
    window.location.href = "bought.html";
}


// Função para obter o emoji correspondente à chave
function getEmoji(key) {
    switch (key) {
        case "chairs":
            return "💺";
        case "cinema":
            return "🚩";
        case "day":
            return "🗓️";
        case "film":
            return "🎥";
        case "section":
            return "🕑";
        default:
            return "";
    }
}



// Função para exibir o pôster do filme na página
function displayFilmPoster(filmsData, buyingFilmTitle) {
    const film = filmsData.find(film => film.Título === buyingFilmTitle);
    if (film) {
        const posterImg = document.getElementById("poster");
        posterImg.src = film.Pôster;
        posterImg.alt = `Pôster do Filme ${film.Título}`;
    } else {
        console.error("Pôster do filme não encontrado.");
    }
}

// Função para traduzir as chaves dos dados de compra
function translateKey(key) {
    switch (key) {
        case "chairs":
            return "Cadeiras";
        case "cinema":
            return "Cinema";
        case "day":
            return "Dia";
        case "film":
            return "Filme";
        case "section":
            return "Sessão";
        default:
            return key;
    }
}

// Obter os dados do endpoint fornecido e preencher as informações do filme
fetch("https://agente-fintalk-default-rtdb.firebaseio.com/.json")
    .then(response => response.json())
    .then(data => {
        // Exibir os dados de compra na página
        displayBuyingData(data.buying);
        // Exibir o pôster do filme, se disponível
        displayFilmPoster(data.films, data.buying.film);
        // Exibir o título do filme
        const filmTitleElement = document.getElementById("filmTitle");
        filmTitleElement.textContent = data.buying.film;
    })
    .catch(error => console.error("Erro ao obter os dados:", error));
