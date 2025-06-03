// src/globals.d.ts
declare const __APP_VERSION__: string;

// Allow our custom window property too, if using
interface Window {
    __hasShownEasterEgg?: boolean;
}