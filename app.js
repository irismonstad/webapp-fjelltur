const express = require('express');
const app = express();
app.use(express.static('public'));

const PORT = 3000;

const Database = require('better-sqlite3');
const db = new Database('fjelltur.db');

const cors = require('cors');
app.use(cors());

app.get('/api/fjell_info', (req, res) => {
    const rows = db.prepare('SELECT fjellnavn, hoyde, beskrivelse, foto FROM fjell').all();
    res.json(rows);
});

app.get('/api/personer_alle', (req, res) => {
    const rows = db.prepare('SELECT brukernavn FROM person').all();
    res.json(rows);
});

app.get('/api/fjellturer/:brukernavn', (req, res) => {
    const brukernavn = req.params.brukernavn;
    if (!brukernavn) return res.status(400).json({error : 'Mangler brukernavn'});

    const rows = db.prepare(`
        SELECT fjell.fjellnavn
        FROM person
        JOIN fjelltur on person.brukernavn = fjelltur.brukernavn
        JOIN fjell ON fjelltur.fjell_id = fjell.fjell_id
        WHERE person.brukernavn = ?`).all(brukernavn);

    res.json(rows);
})

app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});

