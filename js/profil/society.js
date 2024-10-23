import { config } from "../../configEnv.js";

//-------------------------------------SOCIETYS-------------------------------------------------//

// Fonction pour changer logo entreprise
window.changeLogo = function() {
    var fileInput = document.getElementById('logoInput');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('userLogo').src = e.target.result;
    };
    reader.readAsDataURL(file);
}
