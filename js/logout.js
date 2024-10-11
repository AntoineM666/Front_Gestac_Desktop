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
                window.location.href = 'http://127.0.0.1:5500/pages/login.html';
            }
            elsif(!response.ok)
            {
                throw new Error('Erreur lors de la déconnexion : ' + response.statusText);
            }
        })
        ;
}

