const fs = require('fs');
const {
    filterByQuery,
    findByTitle,
    createNewNote,
    validateNote
} = require('../lib/notes');
const { notes } = require('../db/db.json');

jest.mock('fs');

test('creates a note object', () => {
    const note = createNewNote(
        { title: 'test', text: 'testing' },
        notes
    );

    expect(note.title).toBe('test');
    expect(note.text).toBe('testing');
});

test('filters by query', () => {
    const startingNotes = [
        {
            title: 'test',
            text: 'just a test'
        },
        {
            title: 'test two',
            text: 'just another test'
        }
    ];

    const updatedNotes = filterByQuery({text: 'just another test' }, startingNotes);

    expect(updatedNotes.length).toEqual(1)
});

test('finds by title', () => {
    const startingNotes = [
        {
            title: 'test',
            text: 'just a test'
        },
        {
            title: 'test two',
            text: 'just another test'
        }
    ];

    const result = findByTitle('test two', startingNotes);

    expect(result.text).toBe('just another test');
});

test('validates title', () => {
    const note = {
        title: 'test a string',
        text: 'just a test'
    };

    const invalidNote = {
        title: 99,
        text: 'just another test'
    };

    const result = validateNote(note);
    const result2 = validateNote(invalidNote);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});

