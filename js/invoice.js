// Fonction pour mettre à jour les totaux HT, TVA et TTC
function updateTotals() {
    var table = document.getElementById("tbody");
    var rows = table.getElementsByTagName("tr");
    var totalHT = 0;

    // Boucle à travers chaque ligne du tableau pour calculer le total HT
    for (var i = 0; i < rows.length; i++) {
        var totalCell = rows[i].getElementsByTagName("td")[3]; // Récupère la cellule du total HT
        var totalValue = parseFloat(totalCell.textContent.replace('€', '').replace(/\s/g, '').replace(',', '.')); // Convertit en nombre
        totalHT += totalValue;
    }

    // Calcule de la TVA et du total TTC
    var tva = totalHT * 0.20;
    var totalTTC = totalHT + tva;

    // Mise à jour des valeurs dans le DOM
    document.getElementById("total-ht").textContent = totalHT.toFixed(2).replace('.', ',') + "€";
    document.getElementById("tva").textContent = tva.toFixed(2).replace('.', ',') + "€";
    document.getElementById("total-ttc").textContent = totalTTC.toFixed(2).replace('.', ',') + "€";
}

// Affiche la liste déroulante lors du clic sur le bouton "plus"
function showDropdown() {
    var dropdown = document.getElementById('dropdown');
    dropdown.style.display = 'block'; // Affiche la liste déroulante
}

// Remplit le tableau en fonction de l'option sélectionnée
function fillTable() {
    var table = document.getElementById("tbody");
    var selectedItem = document.getElementById("items").value;

    var description = "";
    var quantity = 1;
    var unitPrice = 0;
    var totalPrice = 0;

    // Données statiques pour chaque option (à remplacer par des appels API plus tard)
    if (selectedItem === "rapport") {
        description = "Génération des rapports d'activité";
        quantity = 4;
        unitPrice = 800.00;
    } else if (selectedItem === "audit") {
        description = "Audit complet du système";
        quantity = 1;
        unitPrice = 1200.00;
    } else if (selectedItem === "formation") {
        description = "Formation des employés";
        quantity = 3;
        unitPrice = 500.00;
    }

    totalPrice = quantity * unitPrice;

    // Génère la nouvelle ligne avec les données et ajoute un bouton "poubelle"
    var newRow = `<tr>
                    <td>${description}</td>
                    <td>${quantity}</td>
                    <td class="text-right">${unitPrice.toFixed(2)}€</td>
                    <td class="text-right">${totalPrice.toFixed(2)}€</td>
                    <td><i class="fa-solid fa-trash" style="cursor: pointer;" onclick="removeRow(this)"></i></td>
                  </tr>`;

    // Ajoute la nouvelle ligne au tableau
    table.insertAdjacentHTML('afterbegin', newRow);

    // Met à jour les totaux
    updateTotals();

    // Masque la liste déroulante après sélection
    document.getElementById('dropdown').style.display = 'none';
}

// Fonction pour supprimer une ligne spécifique
function removeRow(element) {
    // L'élément est l'icône "poubelle", nous devons donc remonter à la ligne <tr>
    var row = element.parentNode.parentNode;
    row.parentNode.removeChild(row); // Supprime la ligne du tableau

    // Met à jour les totaux après la suppression
    updateTotals();
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

//function de telechargement de la facture pdf
function downloadPDF() {
    html2canvas(document.getElementById('print'), {
        scale: 1,
        windowWidth: 1920,
        windowHeight: 1080
    }).then(function (canvas) {
        var pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
        pdf.save("page.pdf");
    });
}


//suite de