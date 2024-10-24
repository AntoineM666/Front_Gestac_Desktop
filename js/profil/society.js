import { config } from "../../configEnv.js";

//-------------------------------------SOCIETYS-------------------------------------------------//

window.loadSocieties = async function(societyURIs) {
    const fetchPromises = societyURIs.map(async (uri) => {
        const response = await fetch(config.API_BASE_URL + uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données société');
        }

        return response.json();
    });

    try {
        const societies = await Promise.all(fetchPromises);

        societies.forEach((society, index) => {
            if (index === 0) {
                displayFirstSociety(society);
            } else {
                createSocietyContainer(society);
            }
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données société', error);
    }
};


// Fonction pour afficher la première société dans le conteneur de base
function displayFirstSociety(society) {
    document.getElementById('societyName').textContent = society.namesociety || 'Non spécifié';
    document.getElementById('societyAdresse').textContent = society.adress || 'Non spécifié';
    document.getElementById('societySiren').textContent = society.siren || 'Non spécifié';
    document.getElementById('societySiret').textContent = society.siret || 'Non spécifié';
    document.getElementById('societyTelephone').textContent = society.telsociety || 'Non spécifié';
}

function createSocietyContainer(society) {
    // Sélectionne le conteneur de base
    const baseContainer = document.querySelector('#sideSociety');

    if (!baseContainer) {
        console.error('Conteneur de base introuvable');
        return;
    }

    // Clone le conteneur de base
    const newContainer = baseContainer.cloneNode(true);

    // Modifie l'ID pour que chaque conteneur soit unique
    // newContainer.id = `sideSociety`;
    newContainer.class = `sidebarSociety`;

    // Met à jour les éléments à l'intérieur du conteneur
    newContainer.querySelector('#societyName').textContent = society.namesociety || 'Non spécifié';
    newContainer.querySelector('#societyAdresse').textContent = society.adress || 'Non spécifié';
    newContainer.querySelector('#societySiren').textContent = society.siren || 'Non spécifié';
    newContainer.querySelector('#societySiret').textContent = society.siret || 'Non spécifié';
    newContainer.querySelector('#societyTelephone').textContent = society.telsociety || 'Non spécifié';

    // Ajoute le nouveau conteneur après le conteneur de base
    baseContainer.parentNode.appendChild(newContainer);
}



// Fonction pour modifier les informations utilisateur
window.editsocietyInfo = function() {
    var infoDiv = document.getElementById('societyInfo');
    var societyInfo = infoDiv.querySelectorAll('p');
    societyInfo.forEach(function (p) {
        var text = p.innerText.split(':');
        var label = text[0];
        var value = text[1] ? text[1].trim() : '';
        p.innerHTML = `${label}: <input type="text" value="${value}">`;
    });

    var editsocietyButton = document.getElementById('editSocietyButton');
    editsocietyButton.innerText = "Enregistrer";
    editsocietyButton.setAttribute("onclick", "saveSocietyInfo()");
};

// Fonction pour enregistrer les informations utilisateur
window.savesocietyInfo = async function() {

    if (!societyId) {
        console.error("L'ID de l'utilisateur est introuvable.");
        alert('Impossible de mettre à jour les informations, ID utilisateur manquant');
        return;
    }

    const societyInfo = {};
    const societyInfoDiv = document.querySelector('#societyInfo');

    const fields = [
        'nom', 
        'prenom', 
        'mail', 
        'tel'
    ];

    fields.forEach((field, index) => {
        const inputElement = societyInfoDiv.querySelector(`p:nth-child(${index + 1}) input`);
        if (inputElement) {
            societyInfo[field] = inputElement.value;
        } else {
            console.warn(`Champ d'entrée pour ${field} introuvable.`);
        }
    });

    console.log('Données envoyées:', societyInfo);

    try {
        const response = await fetch( config.API_BASE_URL + uri, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/merge-patch+json'
            },
            body: JSON.stringify(societyInfo)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des données :', errorData);
            alert(`Erreur: ${errorData['hydra:description'] || 'Erreur lors de la mise à jour des informations utilisateur'}`);
            return;
        }

        alert('Les informations utilisateur ont été mises à jour avec succès !');
        
        // Réafficher les informations mises à jour
        displaySocietyInfo(societyInfo);

    } catch (error) {
        console.error('Erreur lors de la requête :', error);
        alert('Erreur de connexion au serveur.');
    }

    // Remet le texte du bouton à "Éditer"
    var editSocietyButton = document.getElementById('editSocietyButton');
    editSocietyButton.innerText = "Éditer";
    editSocietyButton.setAttribute("onclick", "editSocietyInfo()");
};
// Fonction pour changer logo entreprise
window.changeLogo = function() {
    var fileInput = document.getElementById('logoInput');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('societyLogo').src = e.target.result;
    };
    reader.readAsDataURL(file);
}
