import { config } from "../../configEnv.js";

//-------------------------------------PRESTATIONS-------------------------------------------------//

let isAdding = true; // Variable pour suivre l'état du bouton

// Fonction pour ouvrir la pop-up d'ajout de prestation
window.openPrestationsModal = function() {
    // Réinitialise les champs de la pop-up
    document.getElementById('modalPrestationsDescription').value = '';
    document.getElementById('modalPrestationsPUHT').value = '';
    document.getElementById('modalPrestationsTVA').value = '';

    // Affiche la modal
    document.getElementById('prestationsModal').style.display = 'block';
}

// Fonction pour fermer la pop-up
window.closePrestationsModal = function() {
    document.getElementById('prestationsModal').style.display = 'none';
}

// Fonction pour ajouter une prestation à partir de la pop-up
window.addPrestationsFromModal = function() {
    const description = document.getElementById('modalPrestationsDescription').value;
    const puht = document.getElementById('modalPrestationsPUHT').value;
    const tva = document.getElementById('modalPrestationsTVA').value;

    // Ajoute la prestation au tableau
    const table = document.getElementById('prestationsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${description}</td>
        <td>${puht}</td>
        <td>${tva}</td>
        <td class="table-actions">
            <span class="material-icons" style="cursor: pointer; color: green;" onclick="editRow(this)">edit</span>
            <span class="material-icons" style="cursor: pointer; color: red;" onclick="removeRow(this)">backspace</span>
        </td>
    `;

    // Ferme la pop-up
    closePrestationsModal();
}

// Fonction pour supprimer une ligne
window.removeRow = function(button) {
    const row = button.closest('tr');
    row.remove();
}

// Fonction pour éditer une ligne validée
window.editRow = function(button) {
    const row = button.closest('tr');

    // Récupère les valeurs validées
    const descriptionValue = row.cells[0].innerText;
    const puhtValue = row.cells[1].innerText;
    const tvaValue = row.cells[2].innerText;

    // Remplace les valeurs validées par des inputs
    row.cells[0].innerHTML = `<input type="text" value="${descriptionValue}">`;
    row.cells[1].innerHTML = `<input type="number" value="${puhtValue}">`;
    row.cells[2].innerHTML = `<input type="number" value="${tvaValue}">`;

    // Remplace les icônes par un bouton de validation
    row.cells[3].innerHTML = `<span class="material-icons" style="cursor: pointer; color: green;" onclick="validateRow(this)">check_circle</span>`;
}

// Fonction pour valider une ligne
window.validateRow = function(button) {
    const row = button.closest('tr');

    const descriptionInput = row.cells[0].querySelector('input').value;
    const puhtInput = row.cells[1].querySelector('input').value;
    const tvaInput = row.cells[2].querySelector('input').value;

    // Remplace les inputs par les valeurs validées
    row.cells[0].innerText = descriptionInput;
    row.cells[1].innerText = puhtInput;
    row.cells[2].innerText = tvaInput;

    // Remplace l'icône de validation par les icônes d'édition et de suppression
    row.cells[3].innerHTML = `
        <span class="material-icons" style="cursor: pointer; color: green;" onclick="editRow(this)">edit</span>
        <span class="material-icons" style="cursor: pointer; color: red;" onclick="removeRow(this)">backspace</span>
    `;
}