const fs = require('fs');
const path = require('path');

function filterByQuery(query, notes) {
    let filteredResults = notes;
    if (query.title) {
        filteredResults = filteredResults.filter(
            (note) => note.title === query.title
        );
    }
    if (query.text) {
        filteredResults = filteredResults.filter(
            (note) => note.text === query.text
        );
    }
    return filteredResults;
};

function findByTitle(title, notes) {
    const result = notes.filter((note) => note.title === title)[0];
    return result;
};

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes }, null, 2)
    );
    console.log(note);
    return note;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    filterByQuery,
    findByTitle,
    createNewNote,
    validateNote
};

