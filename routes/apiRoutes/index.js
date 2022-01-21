const router = require('express').Router();
const {
    filterByQuery,
    findByid,
    createNewNote,
    validateNote
} = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const { id } = require('prelude-ls');

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
        const results = findByid(req.params.id, notes);
        if (results) {
            (results);
        } else {
            res.send(404);
        }
    })

router.param("id", (req, res, next, id) => {
    req.note = notes[id]
    console.log(id);
    next()
})
// router.get('/notes/:id', (req, res) => {
    
// });

// router.delete it looks like the id one

module.exports = router;