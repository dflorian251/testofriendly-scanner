document.getElementById('barcode-image-input').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const image = new Image();
            image.src = e.target.result;

            image.onload = function () {
                scanBarcode(image);
            };
        };

        reader.readAsDataURL(file);
    }
}

function scanBarcode(image) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = BarcodeScannerReader.decode(imageData);

    if (code) {
        document.getElementById('result').innerText = "Barcode detected: " + code;
    } else {
        document.getElementById('result').innerText = "No barcode found.";
    }
}
