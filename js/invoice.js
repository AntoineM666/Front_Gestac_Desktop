// generation de champ dans le tableau de facture
function generate_table() {


    var table = document.getElementById("tbody");
    var newRow = `<tr>
                        <td>Génération des rapports d'activité   fdbdbfdbdbfdbfdbfdbfdbdbfdbfdbdbdbdbfdbffdb</td>
                        <td>4</td>
                        <td class="text-right">800,00€</td>
                        
                        <td class="text-right">3 200,00€</td>
                    </tr>`
    table.insertAdjacentHTML('afterbegin', newRow);
};



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