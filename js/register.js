

const APIURL = 'http://localhost:8080/api';
// Sélection du formulaire et de l'élément pour afficher les messages
const form = document.getElementById('registerForm');

// Ajouter un écouteur d'événement pour intercepter la soumission du formulaire
form.addEventListener('submit', (event) => {
  event.preventDefault();  // Empêche la soumission du formulaire classique
    const userData = {
  // Récupérer les données du formulaire
   nom : document.getElementById('nom').value,
   prenom : document.getElementById('prenom').value,
   nomEntreprise : document.getElementById('nomEntreprise').value,
   mail : document.getElementById('email').value,
   plainPassword : document.getElementById('password').value,
   tel : document.getElementById('tel').value,
   adresse : document.getElementById('adresse').value,
   siret : document.getElementById('siret').value,
   siren : document.getElementById('siren').value,
 };

 fetch(`${APIURL}/users`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/ld+json'
   },
   body: JSON.stringify(userData) // Convertir les données en JSON
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error('Erreur:', error));
});

// submitButton.addEventListener('click', function(event) {
//     event.preventDefault(); // Empêche l'envoi du formulaire par défaut
//     console.log('Le bouton a été cliqué sans soumettre le formulaire');
// });

