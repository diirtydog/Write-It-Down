const router = require('express').Router();
const {
    filterByQuery,
    findByTitle,
    createNewNote,
    validateNote
} = require('../../lib/notes');
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req, res) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:title', (req, res) => {
    const results = findByTitle(req.params.title, notes);
    if (results) {
        res.json(results);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.title = notes.length.toString();
    
    if (!validateNotes(req.body)) {
        res.status(400).send({ message: "This ain't the right damn format!"});
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;