const router = require('express').Router();
const {
    filterByQuery,
    findByid,
    createNewNote,
    validateNote
} = require('../../lib/notes');
let { notes } = require('../../db/db.json');
const fs = require('fs');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req, res) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    
    if (!validateNote(req.body)) {
        res.status(400).send({ message: "This ain't the right damn format!"});
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router
    .route("/notes/:id")
    .get((req, res) => {
        const results = findByid(req.params.id, notes);
        if (results) {
            res.json(results);
        } else {
            res.send(404);
        }
    })
    .delete((req, res) => {
        console.info('delete')
        const result = req.params.id;

        let filteredResult = notes.filter(function (note) {
            return note.id != result;
        });
        notes = { notes:filteredResult }
        let parsedNotes = JSON.stringify(notes);
        notes = filteredResult;

        fs.writeFileSync(__dirname + '/../../db/db.json', parsedNotes, (err) => {
            if (err) throw err;
        })

        res.end();
        
    })


module.exports = router;