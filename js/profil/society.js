import { config } from "../../configEnv.js";

//-------------------------------------SOCIETYS-------------------------------------------------//
document.addEventListener('DOMContentLoaded', () => {
    fetchUserInfo();
});

window.loadSocieties = async function(societyURIs) {
    console.log('Chargement des sociétés avec URIs:', societyURIs);
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
    console.log('baseContainer:', baseContainer);

    if (!baseContainer) {
        console.error('Conteneur de base introuvable');
        return;
    }

    // Clone le conteneur de base
    const newContainer = baseContainer.cloneNode(true);

    // Modifie l'ID pour que chaque conteneur soit unique
    newContainer.id = `sideSociety`;
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
