import { config } from "../configEnv.js";

// Sélection du formulaire et de l'élément pour afficher les messages
const form = document.getElementById('registerForm');

// Ajouter un écouteur d'événement pour intercepter la soumission du formulaire
form.addEventListener('submit', (event) => {
  event.preventDefault();  // Empêche la soumission du formulaire classique
    const userData = {

  // Récupérer les données du formulaire
   nom : document.getElementById('nom').value,
   prenom : document.getElementById('prenom').value,
   mail : document.getElementById('email').value,
   plainPassword : document.getElementById('password').value,
   tel : document.getElementById('tel').value,
 };

 fetch( config.API_BASE_URL + config.API_USER, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/ld+json'
   },
   body: JSON.stringify(userData) // Convertir les données en JSON
 })
 .then(response => {
  if (response.ok) {
    // Inscription réussie, on redirige vers la page de connexion
    alert('Inscription réussie');
    window.location.href = './login.html';
  } else {
    return response.json().then(data => {
      // Gestion des erreurs d'API
      alert('Erreur lors de l\'inscription : ' + (data.message || 'Vérifiez vos données.'));
    });
  }
})
.catch(error => {
  console.error('Erreur:', error);
  alert('Erreur lors de la soumission. Veuillez réessayer plus tard.');
});
});

// submitButton.addEventListener('click', function(event) {
//     event.preventDefault(); // Empêche l'envoi du formulaire par défaut
//     console.log('Le bouton a été cliqué sans soumettre le formulaire');
// });

