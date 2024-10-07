// Liste des prestations
let prestations = {
    "rapport": { description: "Génération des rapports d'activité", puht: 100 },
    "audit": { description: "Audit complet du système", puht: 300 },
    "formation": { description: "Formation des employés", puht: 200 }
};

// Fonctions utilisées pour la pagination et l'affichage
let ligneCount = 0;
let currentPage = 1;
const maxLinesFirstPage = 10;
const maxLinesFollowingPages = 10;

// Fonctions pour la pagination
function showDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

// Fonction de remplissage du tableau
function fillTable() {
    const select = document.getElementById("items");
    const selectedValue = select.value;

    if (selectedValue && prestations[selectedValue]) {
        const tableBody = document.getElementById("tbody");

        // Nouvelle ligne
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${prestations[selectedValue].description}</td>
            <td><input type="number" class="quantite" value="1" min="1" onchange="calculateRow(this)"></td>
            <td>${prestations[selectedValue].puht.toFixed(2)}€</td>
            <td class="total-ht">${prestations[selectedValue].puht.toFixed(2)}€</td>
            <td><i class="fa-solid fa-trash" style="cursor: pointer;" onclick="removeRow(this)"></i></td>
        `;

        tableBody.appendChild(row);
        ligneCount++;

        calculateTotal();

        // Gestion de la pagination
        let maxLines = currentPage === 1 ? maxLinesFirstPage : maxLinesFollowingPages;
        if (ligneCount > maxLines * currentPage) {
            createNewPage();
        }

        // Déplacer les lignes excédentaires vers la nouvelle page si nécessaire
        moveExcessRowsToNewPage();

        // Réinitialiser la sélection
        select.value = "";
    }
}

// Fonction pour calculer le prix total unitaire
function calculateRow(input) {
    const row = input.parentElement.parentElement;
    const quantity = parseFloat(input.value);
    const puht = parseFloat(row.cells[2].textContent.replace("€", ""));
    const totalHtCell = row.querySelector(".total-ht");

    const totalHt = (quantity * puht).toFixed(2);
    totalHtCell.textContent = `${totalHt}€`;

    calculateTotal();
}

// Fonction pour calculer le prix total global
function calculateTotal() {
    let totalHt = 0;
    const totalCells = document.querySelectorAll(".total-ht");

    totalCells.forEach(cell => {
        totalHt += parseFloat(cell.textContent.replace("€", ""));
    });

    const tva = (totalHt * 0.2).toFixed(2);
    const totalTtc = (totalHt + parseFloat(tva)).toFixed(2);

    document.getElementById("total-ht").textContent = `${totalHt.toFixed(2)}€`;
    document.getElementById("tva").textContent = `${tva}€`;
    document.getElementById("total-ttc").textContent = `${totalTtc}€`;
}

// Fonction pour supprimer une ligne spécifique
function removeRow(element) {
    // L'élément est l'icône "poubelle", nous devons donc remonter à la ligne <tr>
    var row = element.parentNode.parentNode;
    row.parentNode.removeChild(row); // Supprime la ligne du tableau

    // Met à jour les totaux après la suppression
    updateTotals();
}

// Fonction pour ajouter une nouvelle page
function createNewPage() {
    currentPage++;

    // Créer une nouvelle page pour les lignes supplémentaires
    const invoiceContainer = document.querySelector(".invoice");
    const newPage = document.createElement("div");
    newPage.classList.add("invoice", "new-page");
    newPage.innerHTML = `
        <div class="row">
            <div class="col-7">
                <img src="../assets/svg/G.svg" class="logofacture">
            </div>
        </div>
        
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>PU HT</th>
                    <th>Total HT</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tbodyPage${currentPage}">
            </tbody>
        </table>


        <p class="conditions">
            En votre aimable règlement

            Et avec nos remerciements.

            Conditions de paiement : paiement à réception de facture, à 15 jours.

            Aucun escompte consenti pour règlement anticipé.

            Règlement par virement bancaire.

            En cas de retard de paiement, indemnité forfaitaire pour frais de recouvrement : 40
            euros (art. L.4413
            et L.4416 code du commerce).
        </p>

        <p>
            90TECH SAS - N° SIRET 80897753200015 RCS METZ<br>
        </p>
    `;

    invoiceContainer.insertAdjacentElement('afterend', newPage);

    // Déplacer les lignes excédentaires vers la nouvelle page
    moveExcessRowsToNewPage();

    // Appeler la fonction pour déplacer la balise row
    moveRowToNewPage(newPage);
}

// Fonction pour déplacer la balise row sous la table de la nouvelle page
function moveRowToNewPage(newPage) {
    const row = document.querySelector(".row2");  // Sélectionner la balise .row

    if (row) {
        // Sélectionner la table de la nouvelle page
        const newTable = newPage.querySelector("table");

        if (newTable) {
            // Déplacer la balise .row juste après la nouvelle table
            newTable.insertAdjacentElement('afterend', row);
        }
    }
}

// Fonction pour déplacer les lignes excédentaires vers la nouvelle page
function moveExcessRowsToNewPage() {
    const tableBody = document.getElementById("tbody");
    const rows = Array.from(tableBody.children);

    let maxLines = currentPage === 2 ? maxLinesFirstPage : maxLinesFollowingPages;

    if (rows.length > maxLines) {
        const excessRows = rows.slice(maxLines);
        const newTableBody = document.getElementById(`tbodyPage${currentPage}`);
        excessRows.forEach(row => {
            newTableBody.appendChild(row);
        });
    }
}

// Sélectionne le titre et le bouton
const documentType = document.getElementById('documentType');
const toggleButton = document.getElementById('toggleButton');

// Ajoute un écouteur d'événements au bouton pour alterner entre FACTURE et DEVIS
toggleButton.addEventListener('click', () => {
  if (documentType.textContent === 'FACTURE') {
    documentType.textContent = 'DEVIS';
  } else {
    documentType.textContent = 'FACTURE';
  }
});

