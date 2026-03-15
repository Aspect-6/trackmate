import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions"
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check"

export const app = initializeApp({
    apiKey: "AIzaSyBJOCTTREW16d0xFHrCXUCDfqIcBCWYgv4",
    authDomain: "trackmate.co",
    projectId: "trackmate-fb7cd",
    storageBucket: "trackmate-fb7cd.firebasestorage.app",
    messagingSenderId: "308955083111",
    appId: "1:308955083111:web:0acdc34bd99ec7a2e57fc2",
    measurementId: "G-MG9C08136S"
})

// Enable App Check debug mode on localhost
if (window.location.hostname === "localhost") {
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6Lc2ooosAAAAAKGJU40sqQOWMu8o4aLj9HJlvAZi"),
    isTokenAutoRefreshEnabled: true
})

export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)

export const googleAuthProvider = new GoogleAuthProvider()
export const facebookAuthProvider = new FacebookAuthProvider()
