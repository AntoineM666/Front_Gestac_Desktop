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

function toggleClientFields() {
    const clientType = document.getElementById('clientType').value;
    const clientFields = document.getElementById('clientFields');
    const professionalFields = document.getElementById('professionalFields');

    clientFields.style.display = clientType ? 'block' : 'none';
    professionalFields.style.display = clientType === 'professionnel' ? 'block' : 'none';

    // Clear previous values
    document.getElementById('clientName').value = '';
    document.getElementById('clientSurname').value = '';
    document.getElementById('clientAddress').value = '';
    document.getElementById('clientEmail').value = '';
    document.getElementById('clientPhone').value = '';
    document.getElementById('clientCompanyName').value = '';
    document.getElementById('clientSIREN').value = '';
    document.getElementById('clientSIRET').value = '';
}

function addClient() {
    const clientType = document.getElementById('clientType').value;

    const name = document.getElementById('clientName').value;
    const surname = document.getElementById('clientSurname').value;
    const address = document.getElementById('clientAddress').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const companyName = clientType === 'professionnel' ? document.getElementById('clientCompanyName').value : '';
    const SIREN = clientType === 'professionnel' ? document.getElementById('clientSIREN').value : '';
    const SIRET = clientType === 'professionnel' ? document.getElementById('clientSIRET').value : '';

    const tableBody = document.getElementById('clientList');
    const newRow = tableBody.insertRow();

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${surname}</td>
        <td>${companyName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>
            <button onclick="editClient(this)">Modifier</button>
            <button onclick="removeClient(this)">Supprimer</button>
        </td>
    `;

    // Clear input fields
    toggleClientFields();
}

function removeClient(button) {
    const row = button.closest('tr');
    row.remove();
}

function editClient(button) {
    const row = button.closest('tr');
    const cells = row.cells;

    // Remplir les champs d'entrée avec les valeurs existantes
    document.getElementById('clientName').value = cells[0].innerText;
    document.getElementById('clientSurname').value = cells[1].innerText;
    document.getElementById('clientEmail').value = cells[3].innerText;
    document.getElementById('clientPhone').value = cells[4].innerText;

    // Vérifier si le client est un professionnel pour remplir les champs supplémentaires
    const companyName = cells[2].innerText;
    document.getElementById('clientCompanyName').value = companyName ? companyName : '';
    document.getElementById('clientType').value = companyName ? 'professionnel' : 'particulier';

    // Afficher les champs correspondants
    toggleClientFields();

    // Ajouter un gestionnaire d'événements pour mettre à jour la ligne une fois l'édition terminée
    const addClientButton = document.querySelector('#clientFields button');
    addClientButton.innerText = 'Mettre à jour';
    addClientButton.setAttribute('onclick', `updateClient(this, ${row.rowIndex})`);
    
    // Cachez la ligne dans le tableau après l'édition
    row.style.display = 'none'; // Cachez la ligne actuelle pour éviter les doublons
}

function updateClient(button, rowIndex) {
    const tableBody = document.getElementById('clientList');
    const updatedRow = tableBody.rows[rowIndex];

    // Mettre à jour les valeurs de la ligne avec les champs d'entrée
    updatedRow.cells[0].innerText = document.getElementById('clientName').value;
    updatedRow.cells[1].innerText = document.getElementById('clientSurname').value;
    updatedRow.cells[2].innerText = document.getElementById('clientCompanyName').value;
    updatedRow.cells[3].innerText = document.getElementById('clientEmail').value;
    updatedRow.cells[4].innerText = document.getElementById('clientPhone').value;

    // Réinitialiser le bouton pour "Ajouter Client"
    button.innerText = 'Ajouter Client';
    button.setAttribute('onclick', 'addClient()');

    // Réinitialiser les champs d'entrée
    toggleClientFields();
}
