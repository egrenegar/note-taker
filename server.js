const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

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
        // console.log(data)
        res.json(JSON.parse(data));
    })
   
});

app.post('/api/notes', function(req, res) {
    const newNote = req.body;
    
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

});

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. 
// In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });