import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = window.auth;
const provider = new GoogleAuthProvider();

const authSection = document.getElementById("authSection");
const mainContent = document.getElementById("mainContent");

document.getElementById("toggleToRegister").onclick = () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
};

document.getElementById("toggleToLogin").onclick = () => {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
};

document.getElementById("registerBtn").onclick = async () => {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const vorname = document.getElementById("regVorname").value;
  const nachname = document.getElementById("regNachname").value;
  const geburtstag = document.getElementById("regGeburtstag").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    localStorage.setItem("userData", JSON.stringify({ vorname, nachname, geburtstag }));

    alert("Registrierung erfolgreich!");
  } catch (error) {
    alert("Fehler bei der Registrierung: " + error.message);
  }
};

document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("Fehler beim Login: " + error.message);
  }
};

document.getElementById("googleLoginBtn").onclick = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert("Fehler beim Google Login: " + error.message);
  }
};

document.getElementById("logoutBtn").onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    mainContent.style.display = "block";
  } else {
    authSection.style.display = "block";
    mainContent.style.display = "none";
  }
});
