//// logout fetch///
function logout() { 
    const options = {
        method: 'POST', // Utiliser POST pour la déconnexion
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include' // Assurez-vous que les cookies sont envoyés
    };

    // Envoyer la requête de déconnexion
    fetch('http://localhost:8080/api/logout', options)
        .then(response => {
            if (response.ok) {
                window.location.replace('http://127.0.0.1:5500/pages/login.html');
                sessionStorage.setItem('redirected', true);
                
            }
            elsif(!response.ok)
            {
                throw new Error('Erreur lors de la déconnexion : ' + response.statusText);
            }
        })
        ;
}

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

        console.log('vous etes connecté.');
        document.getElementById('login').style.display = 'none';
        sessionStorage.setItem('redirected', false);

      } else {
        if (sessionStorage.getItem('redirected',true)) {
          window.location.replace('http://127.0.0.1:5500/pages/login.html');
          console.log('veuillez vous connecter pour accéder à cette page.');
        };
        
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du cookie BEARER HttpOnly:', error);
    }
  }
  
  checkHttpOnlyCookie();
