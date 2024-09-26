const Form_Login = document.getElementById('form_login');
const APIURL = 'http://localhost:8080';

Form_Login.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dataForm = {
        mail: document.getElementById('email_login').value,
        password: document.getElementById('password_login').value,
    };

    const options = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dataForm),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    try {
        const res = await fetch(`${APIURL}/auth`, options);  // Utiliser des backticks ici
        const data = await res.json();  // Attendre la réponse JSON

        if (res.status === 200) {
            alert('Connexion réussie');
            // const expirationDate = new Date(Date.now() + 3600000); // 1 heure en millisecondes
            // document.cookie = `BEARER=${data.token}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=Lax`;
            console.log(data); // Vous pouvez traiter les données ici si nécessaire
        } else {
            alert('Identifiant ou mot de passe incorrect');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Une erreur sest produite. Veuillez réessayer.');
    }
});