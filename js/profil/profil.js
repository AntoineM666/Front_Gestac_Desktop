import { config } from "../../configEnv.js";

window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Fonction pour récupérer les informations utilisateur
    fetchUserInfo();

    // Définir la fonction openTab
    window.openTab = function(evt, tabName) {
        console.log('openTab called with:', tabName); // Ajoutez cette ligne pour vérifier si la fonction est appelée
        var i, tabcontent, tablinks;

        // Cacher tout le contenu des onglets
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";  
        }

        // Retirer la classe "active" de tous les liens des onglets
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Afficher l'onglet actuel et ajouter la classe "active" au bouton qui a ouvert l'onglet
        document.getElementById(tabName).style.display = "block";  
        evt.currentTarget.className += " active";
    };
});


// Fonction pour récupérer les informations de l'utilisateur
async function fetchUserInfo() {
    try {
        const response = await fetch(config.API_BASE_URL + config.API_PROTEC, {
            method: 'GET',
            credentials: 'include', // Inclure les cookies dans la requête
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        const userData = await response.json();

        // Stocke l'ID de l'utilisateur pour les futures mises à jour
        userId = userData.id; // Assigne l'ID de l'utilisateur à la variable globale

        displayUserInfo(userData); // Affiche les informations de l'utilisateur

        // Récupère les URIs des sociétés de l'utilisateur connecté
        const societyURIs = userData.society.map(society => society.uri);
        loadSocieties(societyURIs); // Appel de la fonction pour charger les sociétés

    } catch (error) {
        console.error(error);
        alert('Erreur lors de la récupération des informations utilisateur');
    }
}

// Fonction pour afficher les informations de l'utilisateur dans le HTML
function displayUserInfo(user) {
    document.querySelector('#userInfo').innerHTML = `
        <p><strong> Nom :</strong> ${user.nom ? user.nom : 'Non spécifié'}</p>
        <p><strong> Prénom :</strong> ${user.prenom ? user.prenom : 'Non spécifié'}</p>
        <p><strong> Mail :</strong> ${user.mail ? user.mail : 'Non spécifié'}</p>
        <p><strong> Téléphone :</strong> ${user.tel ? user.tel : 'Non spécifié'}</p>
    `;

    document.querySelector('#userName').innerHTML = `
        ${user.nom ? user.nom : 'Non spécifié'} ${user.prenom ? user.prenom : 'Non spécifié'}
        
    `;
}

let userId = null; // Variable pour stocker l'ID de l'utilisateur

// Fonction pour modifier les informations utilisateur
window.editUserInfo = function() {
    var infoDiv = document.getElementById('userInfo');
    var userInfo = infoDiv.querySelectorAll('p');
    userInfo.forEach(function (p) {
        var text = p.innerText.split(':');
        var label = text[0];
        var value = text[1] ? text[1].trim() : '';
        p.innerHTML = `${label}: <input type="text" value="${value}">`;
    });

    var editUserButton = document.getElementById('editUserButton');
    editUserButton.innerText = "Enregistrer";
    editUserButton.setAttribute("onclick", "saveUserInfo()");
};

// Fonction pour enregistrer les informations utilisateur
window.saveUserInfo = async function() {

    if (!userId) {
        console.error("L'ID de l'utilisateur est introuvable.");
        alert('Impossible de mettre à jour les informations, ID utilisateur manquant');
        return;
    }

    const userInfo = {};
    const userInfoDiv = document.querySelector('#userInfo');

    const fields = [
        'nom', 
        'prenom', 
        'mail', 
        'tel'
    ];

    fields.forEach((field, index) => {
        const inputElement = userInfoDiv.querySelector(`p:nth-child(${index + 1}) input`);
        if (inputElement) {
            userInfo[field] = inputElement.value;
        } else {
            console.warn(`Champ d'entrée pour ${field} introuvable.`);
        }
    });

    console.log('Données envoyées:', userInfo);

    try {
        const response = await fetch( config.API_BASE_URL + config.API_USER + `/${userId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/merge-patch+json'
            },
            body: JSON.stringify(userInfo)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des données :', errorData);
            alert(`Erreur: ${errorData['hydra:description'] || 'Erreur lors de la mise à jour des informations utilisateur'}`);
            return;
        }

        alert('Les informations utilisateur ont été mises à jour avec succès !');
        
        // Réafficher les informations mises à jour
        displayUserInfo(userInfo);

    } catch (error) {
        console.error('Erreur lors de la requête :', error);
        alert('Erreur de connexion au serveur.');
    }

    // Remet le texte du bouton à "Éditer"
    var editUserButton = document.getElementById('editUserButton');
    editUserButton.innerText = "Éditer";
    editUserButton.setAttribute("onclick", "editUserInfo()");
};