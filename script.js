import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyDpkfY7jqQULUWfVu_2sVCVJ1TRatK3tnc",
  authDomain: "freunde-website.firebaseapp.com",
  projectId: "freunde-website",
  storageBucket: "freunde-website.appspot.com",
  messagingSenderId: "843365542292",
  appId: "1:843365542292:web:5377750aa88120c74b8781",
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fertig geladen");

  document.getElementById("registerBtn").onclick = async () => {
    console.log("Registrieren-Button geklickt");

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const vorname = document.getElementById("vorname").value;
    const nachname = document.getElementById("nachname").value;
    const geburtstag = document.getElementById("geburtstag").value;

    if (!vorname || !nachname || !geburtstag || !email || !password) {
      alert("Bitte fülle alle Felder aus!");
      console.log("Felder unvollständig:", { vorname, nachname, geburtstag, email, password });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Firebase-User erstellt:", result.user.uid);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        vorname,
        nachname,
        geburtstag,
        createdAt: new Date().toISOString(),
      });

      alert("Registrierung erfolgreich!");
      window.location.href = "Dashboard.html";
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      alert("Fehler bei der Registrierung: " + error.message);
    }
  };

  document.getElementById("loginBtn").onclick = async () => {
    console.log("Login-Button geklickt");

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("Bitte E-Mail und Passwort eingeben!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Erfolgreich angemeldet!");
      window.location.href = "Dashboard.html";
    } catch (error) {
      console.error("Fehler bei der Anmeldung:", error);
      alert("Fehler bei der Anmeldung: " + error.message);
    }
  };

  document.getElementById("googleRegisterBtn").onclick = async () => {
    console.log("Google-Registrierung gestartet");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const vorname = prompt("Bitte gib deinen Vornamen ein:");
      const nachname = prompt("Bitte gib deinen Nachnamen ein:");
      const geburtstag = prompt("Bitte gib dein Geburtsdatum ein (JJJJ-MM-TT):");

      if (!vorname || !nachname || !geburtstag) {
        alert("Alle Felder müssen ausgefüllt werden!");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        vorname,
        nachname,
        geburtstag,
        createdAt: new Date().toISOString(),
      });

      alert("Google-Registrierung erfolgreich!");
      window.location.href = "Dashboard.html";
    } catch (error) {
      console.error("Fehler bei der Google-Registrierung:", error);
      alert("Fehler bei der Google-Registrierung: " + error.message);
    }
  };

  document.getElementById("googleLoginBtn").onclick = async () => {
    console.log("Google-Login gestartet");

    try {
      await signInWithPopup(auth, provider);
      alert("Google-Login erfolgreich!");
      window.location.href = "Dashboard.html";
    } catch (error) {
      console.error("Fehler beim Google Login:", error);
      alert("Fehler beim Google Login: " + error.message);
    }
  };
});
