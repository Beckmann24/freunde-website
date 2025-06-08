import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyDpkfY7jqQULUWfVu_2sVCVJ1TRatK3tnc",
  authDomain: "freunde-website.firebaseapp.com",
  projectId: "freunde-website",
  storageBucket: "freunde-website.appspot.com",
  messagingSenderId: "843365542292",
  appId: "1:843365542292:web:5377750aa88120c74b8781"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Registrierung mit E-Mail
document.getElementById("registerBtn").onclick = async () => {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const vorname = document.getElementById("vorname").value;
  const nachname = document.getElementById("nachname").value;
  const geburtstag = document.getElementById("geburtstag").value;

  if (!vorname || !nachname || !geburtstag || !email || !password) {
    alert("Bitte fülle alle Felder aus!");
    return;
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      vorname,
      nachname,
      geburtstag,
      createdAt: new Date().toISOString()
    });

    alert("Registrierung erfolgreich!");
  } catch (error) {
    alert("Fehler bei der Registrierung: " + error.message);
  }
};

// Anmeldung mit E-Mail
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Erfolgreich angemeldet!");
  } catch (error) {
    alert("Fehler bei der Anmeldung: " + error.message);
  }
};

// Google-Login
document.getElementById("googleLoginBtn").onclick = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Zusätzliche Daten abfragen (manuell)
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
      createdAt: new Date().toISOString()
    });

    alert("Google-Login erfolgreich!");
  } catch (error) {
    console.error(error);
    alert("Fehler beim Google Login: " + error.message);
  }
};
