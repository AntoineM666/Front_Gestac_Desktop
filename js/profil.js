function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";  
    }

    // Remove the "active" class from all tab links
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";  
    evt.currentTarget.className += " active";
}

//------------------------------- EDITER LE PROFIL ---------------------------------------//
function editUserInfo() {
    // Affiche le bouton pour changer le logo
    document.getElementById('changeLogoButton').style.display = 'block';

    // Transforme les informations en champs éditables
    var infoDiv = document.getElementById('userInfo');
    var userInfo = infoDiv.querySelectorAll('p');
    userInfo.forEach(function (p) {
        // Récupère le texte actuel et le sépare en label et valeur
        var text = p.innerHTML.split(': ');
        var label = text[0]; // Récupère le label sans changement
        var value = text[1]; // Récupère la valeur

        // Remplace le texte par un champ input
        p.innerHTML = `${label}: <input type="text" value="${value}">`;
    });

    // Change le texte du bouton "Éditer" en "Enregistrer"
    var editButton = document.getElementById('editButton');
    editButton.innerText = "Enregistrer";
    editButton.setAttribute("onclick", "saveUserInfo()");
}

function saveUserInfo() {
    // Cache le bouton pour changer le logo après enregistrement
    document.getElementById('changeLogoButton').style.display = 'none';

    // Récupère les nouvelles valeurs et réaffiche le texte
    var infoDiv = document.getElementById('userInfo');
    var userInfo = infoDiv.querySelectorAll('p');
    userInfo.forEach(function (p) {
        var input = p.querySelector('input').value; // Récupère la valeur de l'input
        var label = p.innerHTML.split(': ')[0]; // Récupère le label sans ajout de `:`

        // Affiche la valeur sans ajouter de ':' supplémentaire
        p.innerHTML = `${label}: ${input}`;
    });

    // Remet le texte du bouton à "Éditer"
    var editButton = document.getElementById('editButton');
    editButton.innerText = "Éditer";
    editButton.setAttribute("onclick", "editUserInfo()");
}

function triggerLogoInput() {
    // Ouvre la boîte de dialogue de sélection d'image
    document.getElementById('logoInput').click();
}

function changeLogo() {
    var fileInput = document.getElementById('logoInput');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('userLogo').src = e.target.result;
    };
    reader.readAsDataURL(file);
}


//-------------------------------------PRESTATIONS-------------------------------------------------//

let isAdding = true; // Variable pour suivre l'état du bouton

// Fonction pour ajouter ou valider une ligne TABLEAU PRESTATIONS
function validateRow(button) {
    // Récupère la ligne parent de l'icône
    var row = button.closest('tr');
    
    // Récupère les inputs dans la ligne
    var descriptionInput = row.cells[0].querySelector('input');
    var puhtInput = row.cells[1].querySelector('input');
    var tvaInput = row.cells[2].querySelector('input');

    // Récupère les valeurs entrées par l'utilisateur
    var descriptionValue = descriptionInput.value;
    var puhtValue = puhtInput.value;
    var tvaValue = tvaInput.value;

    // Remplace les inputs par les valeurs validées
    row.cells[0].innerHTML = descriptionValue;
    row.cells[1].innerHTML = puhtValue;
    row.cells[2].innerHTML = tvaValue;

    // Remplace l'icône de validation par l'icône de suppression et modification
    row.cells[3].innerHTML = `
        <td class="table-actions"><span class="material-icons" style="cursor: pointer; font-size: 13px; color: green;" onclick="editRow(this)">edit</span></td>
        <td class="table-actions"><span class="material-icons" style="cursor: pointer; font-size: 13px; color: #c50a0a;" onclick="removeRow(this)">backspace</span></td>
    `;
}

function addRow() {
    var table = document.getElementById('prestations').getElementsByTagName('tbody')[0];

    // Ajoute une nouvelle ligne au tableau
    var newRow = table.insertRow();

    // Insère les cellules et les inputs correspondants
    newRow.innerHTML = `
        <td><input type="text" placeholder="Description"></td>
        <td><input type="number" placeholder="PU HT"></td>
        <td><input type="number" placeholder="TVA"></td>
        <td class="table-actions"><span class="material-icons" onclick="validateRow(this)">check_circle</span></td>`;
}

function removeRow(button) {
    var row = button.closest('tr');
    row.remove();
}

// Fonction pour éditer une ligne validée
function editRow(button) {
    var row = button.closest('tr');

    // Récupère les valeurs validées
    var descriptionValue = row.cells[0].innerText;
    var puhtValue = row.cells[1].innerText;
    var tvaValue = row.cells[2].innerText;

    // Remplace les valeurs validées par des inputs
    row.cells[0].innerHTML = `<input type="text" value="${descriptionValue}">`;
    row.cells[1].innerHTML = `<input type="number" value="${puhtValue}">`;
    row.cells[2].innerHTML = `<input type="number" value="${tvaValue}">`;

    // Remplace les icônes par un bouton de validation
    row.cells[3].innerHTML = `<span class="material-icons" style="cursor: pointer; color: green;" onclick="validateRow(this)">check_circle</span>`;
}




//--------------------------------- Portefeuille Clients -------------------------------//

// Fonction pour afficher le tableau correspondant
function showClientTable(type) {
    document.getElementById('particulierTable').style.display = type === 'particulier' ? 'block' : 'none';
    document.getElementById('professionnelTable').style.display = type === 'professionnel' ? 'block' : 'none';
}

// Fonction pour ajouter une ligne pour les clients particuliers
function addPartRow() {
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
function validatePartRow(button) {
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
function addProRow() {
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
function validateProRow(button) {
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

function editPartRow(button) {
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

function removePartRow(button) {
    const row = button.closest('tr');
    row.remove();
}


function editProRow(button) {
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

function removeProRow(button) {
    const row = button.closest('tr');
    row.remove();
}


// Fonction pour ouvrir la pop-up d'ajout de client
function openClientModal(type) {
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
function closeClientModal() {
    document.getElementById('clientModal').style.display = 'none';
}

// Fonction pour ajouter un client à partir de la pop-up
function addClientFromModal() {
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
