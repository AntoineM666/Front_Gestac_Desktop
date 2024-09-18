const Form_Login = document.getElementById('form_login');
const APIURL = 'http://localhost:8080';

Form_Login.addEventListener('submit', (event) => {
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
            'Content-Type': 'application/ld+json',
        },
    };

    fetch(`${APIURL}/auth`, options).then((res) => {
        console.log(res.json());
        if (res.status === 200) {
            alert('Connexion reussie');
        } else if (res.status !== 200) {
            alert('Identifiant ou mot de passe incorrect');
        }
    });
});