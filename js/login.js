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


        if (res.status === 200) {
            window.location.replace('http://127.0.0.1:5500/') ;
            sessionStorage.setItem('redirected', false);
        } else {
            alert('Identifiant ou mot de passe incorrect');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Une erreur sest produite. Veuillez réessayer.');
    }
});