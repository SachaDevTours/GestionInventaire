import { QRCodeSVG } from "qrcode.react";
import React from "react";
import ReactDOMServer from "react-dom/server";

/**
 * Génère et télécharge un QR Code en format SVG.
 * @param {string} qrValue - Valeur à encoder dans le QR Code.
 * @param {string} fileName - Nom du fichier à télécharger.
 */
export const downloadQRCodeSVG = (qrValue, fileName) => {
    const svgContainer = document.createElement("div");
    document.body.appendChild(svgContainer);

    import("react-dom").then((ReactDOM) => {
        ReactDOM.createRoot(svgContainer).render(<QRCodeSVG value={qrValue} size={256} />);

        setTimeout(() => {
            const svgElement = svgContainer.querySelector("svg");
            if (!svgElement)
                return;

            const svgData = new XMLSerializer().serializeToString(svgElement);

            const blob = new Blob([svgData], { type: "image/svg+xml" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName + ".svg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            document.body.removeChild(svgContainer);
        }, 100);
    });
};
