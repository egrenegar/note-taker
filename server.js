const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

const notes = [];

// Routes
// _______________________________________

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// API routes
app.get('/api/notes', function(req, res) {

    fs.readFile('db/db.json', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        }
        console.log(data)
        res.json(JSON.parse(data));
    })
   
});

app.post('/api/notes', function(req, res) {
    const newNote = req.body;
    req.body.id = Math.floor(Math.random() * 10000) + 1;
    notes.push(newNote);
    // console.log(notes);
    fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), function(err) {
        if(err) {
            console.log(err);
        }
    })
   res.json(newNote);
});

app.delete('/api/notes/:id', function(req, res) {
    const id = parseInt(req.params.id);

    const filteredNotes = notes.filter(function(note) {
        return note.id !== id;
    })
    res.json(filteredNotes);

    fs.writeFile('db/db.json', JSON.stringify(filteredNotes, null, 2), function(err) {
        if(err) {
            console.log(err);
        }
    })
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });