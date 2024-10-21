/*!
    * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


// Variable pour la base de l'API
const API_BASE_URL = 'http://localhost:8080/api';

// Fonction pour récupérer les informations de l'utilisateur
async function fetchUserConnect() {
    try {
        const response = await fetch(`${API_BASE_URL}/protected`, {
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
        
        displayUserConnect(userData); // Affiche les informations de l'utilisateur
    } catch (error) {
        console.error(error);
        alert('Erreur lors de la récupération des informations utilisateur');
    }
}

// Fonction pour afficher les informations de l'utilisateur dans le HTML
function displayUserConnect(user) {
    document.querySelector('#userName').innerHTML = `
        ${user.username ? user.username : 'Non spécifié'} ${user.prenom ? user.prenom : 'Non spécifié'}
        
    `;
}

// Appelle la fonction lors du chargement de la page
window.onload = fetchUserConnect;