// Ensure the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const camera = document.getElementById('camera');

    // Initialize QuaggaJS
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: camera,
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader", "code_39_reader", "upc_reader"],
        },
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        // Start the live stream when QuaggaJS is initialized
        Quagga.start();
    });

    // Listen for file input change
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            // Read the selected image file and process it
            const reader = new FileReader();
            reader.onload = function (e) {
                Quagga.decodeSingle({
                    decoder: {
                        readers: ["ean_reader", "code_128_reader", "code_39_reader", "upc_reader"],
                    },
                    locate: true,
                    src: e.target.result,
                }, function (result) {
                    if (result && result.codeResult) {
                        alert("Barcode detected: " + result.codeResult.code);
                    } else {
                        alert("No barcode detected.");
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    });
});
