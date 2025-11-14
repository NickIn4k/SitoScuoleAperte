// -------------------------
// 1. Lista frasi
// -------------------------
const phrases = [
    "INFORMATICA FANTASTICA",
    "LA CRITTOGRAFIA E MAGIA ",
    "ITIS ROSSI IL MIGLIORE",
    "SCUOLE APERTE",
    "SCHOOL IS FUN",
    "DECIFRIAMO INSIEME",
    "CHE TECNOLOGIA",
    "HAI CAPITO BENE",
    "QUANTE NE SAPEVA CESARE",
    "AMIAMO DECRITTARE"
];

// Scegli frase casuale
const original = phrases[Math.floor(Math.random() * phrases.length)];

// -------------------------
// 2. Genera chiave casuale (da 1 a 25)
// -------------------------
const key = Math.floor(Math.random() * 25) + 1;

// Mostra la chiave nella pagina
document.getElementById("key").textContent = key;

// -------------------------
// 3. Funzione cifrario di Cesare
// -------------------------
function caesarCipher(str, shift) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let char of str.toUpperCase()) {
        if (alphabet.includes(char)) {
            const idx = alphabet.indexOf(char);
            const newIndex = (idx + shift) % 26;
            result += alphabet[newIndex];
        } else {
            result += char; // spazi, accenti, ecc.
        }
    }

    return result;
}

// Cifra la frase con la chiave casuale
const encrypted = caesarCipher(original, key);

// -------------------------
// 4. Gestione del progresso
// -------------------------
let revealed = Array(original.length).fill("_");

function updateProgress() {
    let text = "";
    for (let i = 0; i < original.length; i++) {
        if (revealed[i] !== "_") {
            text += original[i];
        } else if (original[i] === " ") {
            text += " ";
        } else {
            text += "_";
        }
    }
    document.getElementById("progress").textContent = text;
}

// Svela una lettera non ancora trovata
function revealOneLetter() {
    let indexes = [];
    for (let i = 0; i < original.length; i++) {
        if (revealed[i] === "_" && original[i] !== " ") {
            indexes.push(i);
        }
    }
    if (indexes.length === 0) return;

    const randomIndex = indexes[Math.floor(Math.random() * indexes.length)];
    revealed[randomIndex] = original[randomIndex];
}

// -------------------------
// 5. Verifica risposta
// -------------------------
function checkGuess() {
    const input = document.getElementById("guessInput");
    const guess = input.value.toUpperCase().trim();
    const message = document.getElementById("message");

    // ───────────────
    // Evita input vuoti
    // ───────────────
    if (guess.length === 0) {
        message.textContent = "Inserisci una frase!";
        message.className = "error";
        return;
    }

    // ───────────────
    // Risposta corretta
    // ───────────────
    if (guess === original) {
        message.textContent = "✨ Bravissimo! Hai decifrato il messaggio! ✨";
        message.className = "success";

        // Mostra la frase intera!
        revealed = original.split("");  
        updateProgress();

        // Animazione finale sulla frase
        const progress = document.getElementById("progress");
        progress.classList.add("correct-animation");

        return;
    }

    // ───────────────
    // Risposta sbagliata
    // ───────────────
    message.textContent = "❌ Non è corretto! Ti svelo una lettera...";
    message.className = "error";
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 300);

    revealOneLetter();
    updateProgress();
}

// -------------------------
// 6. Avvio del gioco
// -------------------------
document.getElementById("encrypted").textContent = encrypted;
updateProgress();
