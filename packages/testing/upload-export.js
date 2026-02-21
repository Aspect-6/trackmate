import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── Configuration ──────────────────────────────────────────────────────────────
const UID = 'YEesbZ6GTkaLE5IC8fzkKhVWlhx2';

const app = initializeApp({
    apiKey: "AIzaSyBJOCTTREW16d0xFHrCXUCDfqIcBCWYgv4",
    authDomain: "trackmate.co",
    projectId: "trackmate-fb7cd",
    storageBucket: "trackmate-fb7cd.firebasestorage.app",
    messagingSenderId: "308955083111",
    appId: "1:308955083111:web:0acdc34bd99ec7a2e57fc2",
});

const auth = getAuth(app);
const db = getFirestore(app);

// ── Prompt helper ──────────────────────────────────────────────────────────────
function prompt(question) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer); }));
}

// ── Load the export JSON ───────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const exportPath = join(__dirname, 'data', 'firestore-export.json');
const exportData = JSON.parse(readFileSync(exportPath, 'utf-8'));

// ── Sign in and upload ─────────────────────────────────────────────────────────
async function upload() {
    const email = await prompt('Email: ');
    const password = await prompt('Password: ');

    console.log('\nSigning in...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (userCredential.user.uid !== UID) {
        console.error(`\n✗ Signed-in UID (${userCredential.user.uid}) does not match expected UID (${UID}). Aborting.`);
        process.exit(1);
    }

    console.log(`✓ Signed in as ${userCredential.user.email} (${userCredential.user.uid})`);

    const docNames = Object.keys(exportData);
    console.log(`\nUploading ${docNames.length} documents to: users/${UID}/academic/\n`);

    for (const docName of docNames) {
        const docRef = doc(db, `users/${UID}/academic/${docName}`);
        const data = exportData[docName];

        try {
            await setDoc(docRef, data);
            if (data.items) {
                console.log(`  ✓ ${docName} — ${data.items.length} items`);
            } else {
                const fieldCount = Object.keys(data).length;
                console.log(`  ✓ ${docName} — ${fieldCount} fields`);
            }
        } catch (err) {
            console.error(`  ✗ ${docName} — ${err.message}`);
        }
    }

    console.log('\nDone!');
    process.exit(0);
}

upload();
