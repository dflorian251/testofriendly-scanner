document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('qr-video');
    const resultElement = document.getElementById('result');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
            video.srcObject = stream;
            video.setAttribute("playsinline", true);
            video.play();

            const canvasElement = document.createElement("canvas");
            const canvas = canvasElement.getContext("2d");
            canvasElement.width = video.videoWidth;
            canvasElement.height = video.videoHeight;

            video.addEventListener('loadedmetadata', () => {
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });

                if (code) {
                    resultElement.innerHTML = "QR Code detected: " + code.data;
                    // Perform actions with the scanned data
                } else {
                    resultElement.innerHTML = "Scanning...";
                }

                requestAnimationFrame(scan);
            });

            function scan() {
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });

                if (code) {
                    resultElement.innerHTML = "QR Code detected: " + code.data;
                    // Perform actions with the scanned data
                }

                requestAnimationFrame(scan);
            }
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });
});
