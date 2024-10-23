import { config } from "../../configEnv.js";

//--------------------------------- Portefeuille Clients -------------------------------//

// Fonction pour afficher le tableau correspondant
window.showClientTable = function(type) {
    document.getElementById('particulierTable').style.display = type === 'particulier' ? 'block' : 'none';
    document.getElementById('professionnelTable').style.display = type === 'professionnel' ? 'block' : 'none';
}

// Fonction pour ajouter une ligne pour les clients particuliers
window.addPartRow = function() {
    const table = document.getElementById('particulierClientTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td><input type="text" placeholder="Nom"></td>
        <td><input type="text" placeholder="Prénom"></td>
        <td><input type="text" placeholder="Adresse"></td>
        <td><input type="email" placeholder="Email"></td>
        <td><input type="tel" placeholder="Téléphone"></td>
        <td class="table-actions">
            <span class="material-icons" onclick="validatePartRow(this)">check_circle</span>
        </td>`;
}

// Fonction pour valider une ligne pour les clients particuliers
window.validatePartRow = function(button) {
    const row = button.closest('tr');

    const nameValue = row.cells[0].querySelector('input').value;
    const surnameValue = row.cells[1].querySelector('input').value;
    const addressValue = row.cells[2].querySelector('input').value;
    const emailValue = row.cells[3].querySelector('input').value;
    const phoneValue = row.cells[4].querySelector('input').value;

    row.cells[0].innerHTML = nameValue;
    row.cells[1].innerHTML = surnameValue;
    row.cells[2].innerHTML = addressValue;
    row.cells[3].innerHTML = emailValue;
    row.cells[4].innerHTML = phoneValue;

    row.cells[5].innerHTML = `
        <span class="material-icons" style="cursor: pointer; color: green;" onclick="editPartRow(this)">edit</span>
        <span class="material-icons" style="cursor: pointer; color: red;" onclick="removePartRow(this)">backspace</span>`;
}

// Fonction pour ajouter une ligne pour les clients professionnels
window.addProRow = function() {
    const table = document.getElementById('professionnelClientTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td><input type="text" placeholder="Nom"></td>
        <td><input type="text" placeholder="Prénom"></td>
        <td><input type="text" placeholder="Nom de l'entreprise"></td>
        <td><input type="text" placeholder="Adresse"></td>
        <td><input type="email" placeholder="Email"></td>
        <td><input type="tel" placeholder="Téléphone"></td>
        <td><input type="text" placeholder="N° SIRET"></td>
        <td><input type="text" placeholder="N° SIREN"></td>
        <td class="table-actions">
            <span class="material-icons" onclick="validateProRow(this)">check_circle</span>
        </td>`;
}

// Fonction pour valider une ligne pour les clients professionnels
window.validateProRow = function(button) {
    const row = button.closest('tr');

    const nameValue = row.cells[0].querySelector('input').value;
    const surnameValue = row.cells[1].querySelector('input').value;
    const companyNameValue = row.cells[2].querySelector('input').value;
    const addressValue = row.cells[3].querySelector('input').value;
    const emailValue = row.cells[4].querySelector('input').value;
    const phoneValue = row.cells[5].querySelector('input').value;
    const siretValue = row.cells[6].querySelector('input').value;
    const sirenValue = row.cells[7].querySelector('input').value;

    row.cells[0].innerHTML = nameValue;
    row.cells[1].innerHTML = surnameValue;
    row.cells[2].innerHTML = companyNameValue;
    row.cells[3].innerHTML = addressValue;
    row.cells[4].innerHTML = emailValue;
    row.cells[5].innerHTML = phoneValue;
    row.cells[6].innerHTML = siretValue;
    row.cells[7].innerHTML = sirenValue;

    row.cells[8].innerHTML = `
        <span class="material-icons" style="cursor: pointer; color: green;" onclick="editProRow(this)">edit</span>
        <span class="material-icons" style="cursor: pointer; color: red;" onclick="removeProRow(this)">backspace</span>`;
}

window.editPartRow = function(button) {
    const row = button.closest('tr');

    const nameValue = row.cells[0].innerText;
    const surnameValue = row.cells[1].innerText;
    const addressValue = row.cells[2].innerText;
    const emailValue = row.cells[3].innerText;
    const phoneValue = row.cells[4].innerText;

    // Remplace les cellules par des inputs avec les valeurs actuelles
    row.cells[0].innerHTML = `<input type="text" value="${nameValue}">`;
    row.cells[1].innerHTML = `<input type="text" value="${surnameValue}">`;
    row.cells[2].innerHTML = `<input type="text" value="${addressValue}">`;
    row.cells[3].innerHTML = `<input type="email" value="${emailValue}">`;
    row.cells[4].innerHTML = `<input type="tel" value="${phoneValue}">`;

    // Remplace les icônes par une icône de validation
    row.cells[5].innerHTML = `<span class="material-icons" style="cursor: pointer; color: green;" onclick="validatePartRow(this)">check_circle</span>`;
}

window.removePartRow = function(button) {
    const row = button.closest('tr');
    row.remove();
}


window.editProRow = function(button) {
    const row = button.closest('tr');

    const nameValue = row.cells[0].innerText;
    const surnameValue = row.cells[1].innerText;
    const companyNameValue = row.cells[2].innerText;
    const addressValue = row.cells[3].innerText;
    const emailValue = row.cells[4].innerText;
    const phoneValue = row.cells[5].innerText;
    const siretValue = row.cells[6].innerText;
    const sirenValue = row.cells[7].innerText;

    // Remplace les cellules par des inputs avec les valeurs actuelles
    row.cells[0].innerHTML = `<input type="text" value="${nameValue}">`;
    row.cells[1].innerHTML = `<input type="text" value="${surnameValue}">`;
    row.cells[2].innerHTML = `<input type="text" value="${companyNameValue}">`;
    row.cells[3].innerHTML = `<input type="text" value="${addressValue}">`;
    row.cells[4].innerHTML = `<input type="email" value="${emailValue}">`;
    row.cells[5].innerHTML = `<input type="tel" value="${phoneValue}">`;
    row.cells[6].innerHTML = `<input type="text" value="${siretValue}">`;
    row.cells[7].innerHTML = `<input type="text" value="${sirenValue}">`;

    // Remplace les icônes par une icône de validation
    row.cells[8].innerHTML = `<span class="material-icons" style="cursor: pointer; color: green;" onclick="validateProRow(this)">check_circle</span>`;
}

window.removeProRow = function(button) {
    const row = button.closest('tr');
    row.remove();
}


// Fonction pour ouvrir la pop-up d'ajout de client
window.openClientModal = function(type) {
    console.log(`Opening modal for ${type} client`);
    document.getElementById('modalClientType').value = type;

    // Met à jour le titre du modal
    document.getElementById('modalTitle').innerText = type === 'particulier' ? 'Ajouter un client particulier' : 'Ajouter un client professionnel';
    
    // Affiche ou cache les champs spécifiques aux professionnels
    document.getElementById('modalProfessionalFields').style.display = type === 'professionnel' ? 'block' : 'none';
    
    // Réinitialise les champs de la pop-up
    document.getElementById('modalClientName').value = '';
    document.getElementById('modalClientSurname').value = '';
    document.getElementById('modalClientAddress').value = '';
    document.getElementById('modalClientEmail').value = '';
    document.getElementById('modalClientPhone').value = '';
    document.getElementById('modalClientCompanyName').value = '';
    document.getElementById('modalClientSIRET').value = '';
    document.getElementById('modalClientSIREN').value = '';

    // Affiche la modal
    document.getElementById('clientModal').style.display = 'block';
}


// Fonction pour fermer la pop-up
window.closeClientModal = function() {
    document.getElementById('clientModal').style.display = 'none';
}

// Fonction pour ajouter un client à partir de la pop-up
window.addClientFromModal = function() {
    const type = document.getElementById('modalClientType').value;
    
    if (type === 'particulier') {
        const name = document.getElementById('modalClientName').value;
        const surname = document.getElementById('modalClientSurname').value;
        const address = document.getElementById('modalClientAddress').value;
        const email = document.getElementById('modalClientEmail').value;
        const phone = document.getElementById('modalClientPhone').value;

        // Ajoute le client particulier au tableau
        const table = document.getElementById('particulierClientTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${surname}</td>
            <td>${address}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td class="table-actions">
                <span class="material-icons" style="cursor: pointer; color: green;" onclick="editPartRow(this)">edit</span>
                <span class="material-icons" style="cursor: pointer; color: red;" onclick="removePartRow(this)">backspace</span>
            </td>
        `;
    } else if (type === 'professionnel') {
        const name = document.getElementById('modalClientName').value;
        const surname = document.getElementById('modalClientSurname').value;
        const companyName = document.getElementById('modalClientCompanyName').value;
        const address = document.getElementById('modalClientAddress').value;
        const email = document.getElementById('modalClientEmail').value;
        const phone = document.getElementById('modalClientPhone').value;
        const siret = document.getElementById('modalClientSIRET').value;
        const siren = document.getElementById('modalClientSIREN').value;

        // Ajoute le client professionnel au tableau
        const table = document.getElementById('professionnelClientTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${surname}</td>
            <td>${companyName}</td>
            <td>${address}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${siret}</td>
            <td>${siren}</td>
            <td class="table-actions">
                <span class="material-icons" style="cursor: pointer; color: green;" onclick="editProRow(this)">edit</span>
                <span class="material-icons" style="cursor: pointer; color: red;" onclick="removeProRow(this)">backspace</span>
            </td>
        `;
    }

    // Ferme la pop-up
    closeClientModal();
}