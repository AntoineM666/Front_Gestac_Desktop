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
            if (!response.ok) {
                throw new Error('Erreur lors de la déconnexion : ' + response.statusText);
            }
            return response.json(); // Traitez les données retournées par le serveur si nécessaire
        })
        .then(data => {
            console.log('Déconnexion réussie:', data);
            // Vous pouvez rediriger l'utilisateur ou faire d'autres actions ici
            window.location.href = '/login'; // Redirige vers la page de connexion par exemple
        })
        .catch(error => {
            console.error('Erreur:', error); // Gestion des erreurs
        });
}

