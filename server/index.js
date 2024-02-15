const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bitcoin = require('bitcoinjs-lib');
const bitcoinMessage = require('bitcoinjs-message');


const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3001;


// Initialize SQLite database
const db = new sqlite3.Database('./messages.db', (err) => {
    if (err) {
        console.error('Failed to connect to the SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, signature TEXT, publicKey TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
    }
});


app.post('/sign', (req, res) => {
    const {privateKeyWIF, messageText} = req.body;

    try {
        const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF);
        const privateKey = keyPair.privateKey;
        const signature = bitcoinMessage.sign(messageText, privateKey, keyPair.compressed);

        res.json({signature: signature});
    } catch (error) {
        console.error('Error in /sign:', error);
        res.status(400).send('Invalid data');
    }
});

// Verify message endpoint
app.post('/verify', (req, res) => {
    const {address, messageText, signature} = req.body;

    try {
        const verified = bitcoinMessage.verify(messageText, address, signature);
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