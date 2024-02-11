// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { bitcore, Message } = require('bitcore-message');
const sqlite3 = require('sqlite3').verbose();

// Setup Express
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Setup SQLite database
const db = new sqlite3.Database('./messages.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, signature TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");

// Sign message endpoint
app.post('/sign', (req, res) => {
    const { privateKey, message } = req.body;
    try {
        const key = new bitcore.PrivateKey(privateKey);
        const bitcoreMessage = new Message(message);
        const signature = bitcoreMessage.sign(key);

        // Save to database
        const insert = db.prepare("INSERT INTO messages (message, signature) VALUES (?, ?)");
        insert.run(message, signature, function(err) {
            if (err) {
                return res.status(500).send('Error saving to database');
            }
            res.json({ id: this.lastID, signature });
        });
        insert.finalize();
    } catch (error) {
        res.status(400).send('Invalid data');
    }
});

// Verify message endpoint
app.post('/verify', (req, res) => {
    const { address, message, signature } = req.body;
    try {
        const verified = new Message(message).verify(address, signature);
        res.json({ verified });
    } catch (error) {
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

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
