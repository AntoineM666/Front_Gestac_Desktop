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


///// affichage du login de l'utilisateur si déjà connecté  en cookie avec un jwt/////

// Fonction pour vérifier si le cookie BEARER HttpOnly est envoyé avec la requête
async function checkHttpOnlyCookie() {
    try {
      // Effectue une requête à une route protégée de ton API ou serveur
      const response = await fetch('http://localhost:8080/api/protected', {
        method: 'GET',
        credentials: 'include' // Les cookies (même HttpOnly) seront envoyés automatiquement
      });
  
      // Si la réponse est 200, cela signifie que le serveur a accepté le cookie
      if (response.ok) {

        console.log('Le cookie BEARER HttpOnly est présent et valide.');
        document.getElementById('login').style.display = 'none';

      } else {
        
        console.log('veuillez vous connecter pour accéder à cette page.');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du cookie BEARER HttpOnly:', error);
    }
  }
  
  checkHttpOnlyCookie();
