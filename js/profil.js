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

//---------------------------------------------------- EDITER LE PROFIL ---------------------------------------------------------------//
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


//---------------------------------------------------PRESTATIONS-------------------------------------------------------------------//

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