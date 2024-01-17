Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#barcode-scanner'),
        constraints: {
            width: 640,
            height: 480,
            facingMode: "environment" // or "user" for front camera
        },
    },
    decoder: {
        readers: ["ean_reader", "upc_reader"]
    }
}, function (err) {
    if (err) {
        console.error(err);
        return;
    }
    Quagga.start();
});
Quagga.onDetected(function (result) {
    var code = result.codeResult.code;
    alert("Barcode detected: " + code);
    // You can perform further actions with the scanned barcode, such as making an API call or updating the UI.
});
