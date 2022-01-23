const router = require('express').Router();
const {
    filterByQuery,
    findByid,
    createNewNote,
    validateNote
} = require('../../lib/notes');
// const handleNoteDelete = require('../../public/assets/js')
let { notes } = require('../../db/db.json');
// const { id } = require('prelude-ls');
const fs = require('fs');
// const { NOTINITIALIZED } = require('dns');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req, res) {
        results = filterByQuery(req.query, results);
    }
    // could've had a read file here
    // fs.readFile()
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
        // notes = filteredResult;

        fs.writeFileSync(__dirname + '/../../db/db.json', parsedNotes, (err) => {
            if (err) throw err;
        })

        res.end();
        // if (results) {
        //     res = delete results;
        // } else {
        //     res.send(404);
        // }
        // res = delete notes[id];
        // const results = findByid(req.params.id, notes);
        // const data = fs.readFileSync(results);
        // const json = JSON.parse(data);
        // const note = json.notes;
        // json.notes = notes.filter((notes) => {
        //     return note.id !== removeNote
        // });
        // fs.writeFileSync('results.json', JSON.stringify(json, null, 2));
        
        // if (results) {
        //     delete notes;
        // } else {
        //     res.send(404);
        // }
    })

// router.param("id", (req, res, next, id) => {
//     req.note = notes[id]
//     console.log(id);
//     next()
// })
// router.get('/notes/:id', (req, res) => {
    
// });

// router.delete it looks like the id one

module.exports = router;