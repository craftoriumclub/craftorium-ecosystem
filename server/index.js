const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bitcoin = require('bitcoinjs-lib');
const bitcoinMessage = require('bitcoinjs-message');
const {networks} = require("bitcoinjs-lib");


const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3001;


// Initialize SQLite database
const db = new sqlite3.Database('./data/messages.db', (err) => {
    if (err) {
        console.error('Failed to connect to the SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, publicKey TEXT,  message TEXT, signature TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
    }
});

function insertMessage(db, publicKey, messageText, signatureBase64, timestamp) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO messages (publicKey, message, signature, timestamp) VALUES (?, ?, ?, ?)";
        db.run(sql, [publicKey, messageText, signatureBase64, timestamp], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}


app.post('/sign', async (req, res) => {
    const {publicKey, privateKeyWIF, messageText} = req.body;

    try {
        const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, networks.bitcoin);
        const privateKey = keyPair.privateKey;
        const signature = bitcoinMessage.sign(messageText, privateKey, keyPair.compressed);

        const signatureBase64 = signature.toString('base64');
        const timestamp = new Date().toString();

        const lastID = await insertMessage(db, publicKey, messageText, signatureBase64, timestamp);
        res.json({id: lastID, signature: signatureBase64});
    } catch (error) {
        console.error('Error in /sign:', error);
        res.status(400).send('Invalid data');
    }
});

// Verify message endpoint
app.post('/verify', (req, res) => {
    const {publicKey, messageText, signature} = req.body;

    try {
        const verified = bitcoinMessage.verify(messageText, publicKey, signature);
        res.json({verified});
    } catch (error) {
        console.error('Error in /verify:', error);
        res.status(400).send('Invalid data');
    }
});


app.get('/messages', (req, res) => {
    db.all("SELECT * FROM messages", [], (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching messages');
            return;
        }
        res.json(rows);
    });
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});