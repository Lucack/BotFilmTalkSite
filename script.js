const seatingContainer = document.querySelector('.seating');
const rows = 13; // Número de filas (M até A)
const seatsPerRowMLK = 12; // Número de cadeiras por fila (para M, L, K)
const seatsPerRowOthers = 10; // Número de cadeiras por fila (para outras fileiras)
const occupiedSeats = [
    { row: 'M', seats: [3, 4, 7, 8] },
    { row: 'L', seats: [2, 3, 6, 7] },
    { row: 'K', seats: [1, 2, 5, 6] },
    { row: 'B', seats: [3, 4, 5, 6] },
    { row: 'A', seats: [4, 5, 6] }
]; // Cadeiras ocupadas (simulação)

function createSeats() {
    const columnLabels = ['M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];

    for (let i = 0; i < rows; i++) {
        const row = columnLabels[i];
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        const columnLabel = document.createElement('div');
        columnLabel.classList.add('column-label');
        columnLabel.textContent = row;
        rowElement.appendChild(columnLabel);

        const seatsCount = row === 'M' || row === 'L' || row === 'K' ? seatsPerRowMLK : seatsPerRowOthers;
        for (let seat = 1; seat <= seatsCount; seat++) {
            const div = document.createElement('div');
            div.classList.add('seat');
            div.dataset.seatNumber = seat;
            div.dataset.rowNumber = row;
            if (isSeatOccupied(row, seat)) {
                div.classList.add('occupied');
            } else {
                div.addEventListener('click', toggleSeat);
            }
            rowElement.appendChild(div);
        }
        seatingContainer.appendChild(rowElement);
    }
}

function isSeatOccupied(row, seat) {
    const occupiedRow = occupiedSeats.find(item => item.row === row);
    return occupiedRow && occupiedRow.seats.includes(seat);
}

function toggleSeat(event) {
    const seat = event.target;
    seat.classList.toggle('selected');
    if (seat.classList.contains('selected')) {
        const seatName = seat.dataset.rowNumber + seat.dataset.seatNumber;
        seat.textContent = seatName;
    } else {
        seat.textContent = '';
    }
}

function getSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.selected');
    const selectedSeatsArray = Array.from(selectedSeats).map(seat => {
        return {
            chair: seat.dataset.rowNumber + seat.dataset.seatNumber,
        };
    });
    return selectedSeatsArray;
}

function confirmSelection() {
    const selectedSeats = getSelectedSeats();
    const jsonData = {
        film: "",
        day: "",
        cinema: "",
        section: "",
        chairs: selectedSeats
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://agente-fintalk-default-rtdb.firebaseio.com/buying.json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(jsonData));
}

window.onload = createSeats;

function showConfirmation() {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "block";

    const selectedSeats = getSelectedSeats();
    const selectedSeatsList = document.getElementById("selectedSeatsList");
    selectedSeatsList.innerHTML = "";
    selectedSeats.forEach(seat => {
        const listItem = document.createElement("li");
        listItem.textContent = seat.chair;
        selectedSeatsList.appendChild(listItem);
    });
}

// Função para confirmar a seleção e mostrar a tela de confirmação
function confirmSelection() {
    const selectedSeats = getSelectedSeats();
    const jsonData = {
        film: "",
        day: "",
        cinema: "",
        section: "",
        chairs: selectedSeats
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://agente-fintalk-default-rtdb.firebaseio.com/buying.json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Redirecionar para a página de confirmação após o PUT ser concluído com sucesso
            window.location.href = "confirmation.html";
        } else {
            console.error("Erro ao enviar dados.");
        }
    };
    xhr.send(JSON.stringify(jsonData));

    // Após enviar os dados para o servidor, mostrar a tela de confirmação
    showConfirmation();
}


function returnToService() {
    window.location.href = "index.html";
}

function closeConfirmation() {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "none";

    confirmSelection();
}
