function generateBarcode() {
    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;

    // Generar código de barras sin número
    const barcodeCanvas = document.getElementById('barcode');
    JsBarcode(barcodeCanvas, code, { format: "CODE128", lineColor: "#000", width: width, height: height, displayValue: false });

    // Generar código de barras con número
    const barcodeWithNumberCanvas = document.getElementById('barcodeWithNumber');
    JsBarcode(barcodeWithNumberCanvas, code, { format: "CODE128", lineColor: "#000", width: width, height: height, displayValue: true });

    // Mostrar número por separado
    const numberElement = document.getElementById('number');
    numberElement.innerText = code;
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const name = document.getElementById('name').value;
    const currentDate = new Date().toLocaleDateString();

    doc.text(`Nombre del Colaborador: ${name}`, 10, 10);
    doc.text(`Fecha: ${currentDate}`, 10, 20);

    // Agregar código de barras sin número
    const barcodeCanvas = document.getElementById('barcode');
    const imgData = barcodeCanvas.toDataURL('image/png');
    const imgWidth = 180;
    const imgHeight = (barcodeCanvas.height / barcodeCanvas.width) * imgWidth;
    doc.addImage(imgData, 'PNG', 10, 30, imgWidth, imgHeight);

    // Agregar código de barras con número
    const barcodeWithNumberCanvas = document.getElementById('barcodeWithNumber');
    const imgDataWithNumber = barcodeWithNumberCanvas.toDataURL('image/png');
    const imgWidthWithNumber = 180;
    const imgHeightWithNumber = (barcodeWithNumberCanvas.height / barcodeWithNumberCanvas.width) * imgWidthWithNumber;
    doc.addImage(imgDataWithNumber, 'PNG', 10, imgHeight + 40, imgWidthWithNumber, imgHeightWithNumber);

    // Guardar el PDF con el nombre del colaborador
    const fileName = name ? name.replace(/\s+/g, '_') : 'barcode'; // Reemplazar espacios en blanco por guiones bajos
    doc.save(`${fileName}.pdf`);
}


function printBarcode() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<img src="' + document.getElementById('barcodeWithNumber').toDataURL() + '" />');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    //printWindow.print();
}
