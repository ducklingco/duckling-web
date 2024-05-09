// plugins/qrcode.client.ts
import QRCodeStyling, { type Options } from 'qr-code-styling';

export default defineNuxtPlugin((_) => {
    return {
        provide: {
            // Provide a helper that returns an instance of QRCodeStyling
            qrCodeStyling: (options: Partial<Options>) : QRCodeStyling => {
                return new QRCodeStyling(options);
            },
        }
    }
});