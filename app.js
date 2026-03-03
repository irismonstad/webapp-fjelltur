const express = require('express');
const app = express();
app.use(express.static('public'));

const PORT = 3000;

const Database = require('better-sqlite3');
const db = new Database('fjelltur.db');

const cors = require('cors');
app.use(cors());

app.get('/api/fjell_info', (req, res) => {
    const rows = db.prepare('SELECT fjellnavn, hoyde, beskrivelse FROM fjell').all();
    res.json(rows);
});

app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});

