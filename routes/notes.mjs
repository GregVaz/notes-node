// const util = require('util');
import { default as express } from 'express';
import { NotesStore as notes } from '../app.mjs';

export const router = express.Router();

// Add a note
router.get('/add', (req, res, next) => {
  res.render('noteedit', {
    title: 'Add a note',
    docreate: true,
    notekey: '',
    note: undefined
  });
});

// Read the note (read)
router.get('/view', async (req, res, next) => {
  try {
    let note = await notes.read(req.query.key);
    res.render('noteview', {
      title: note ? note.title : '',
      notekey: req.query.key,
      note: note
    });
  } catch (err) {
    next(err);
  }
});

// Save the note (create)
router.post('/save', async (req, res, next) => {
  try {
    let note;
    if (req.body.docreate === 'create') {
      note = await notes.create(req.body.notekey, req.body.title, req.body.body);
    } else {
      note = await notes.update(req.body.notekey, req.body.title, req.body.body);
    }
    res.redirect('/notes/view?key=' + req.body.notekey);
  } catch (err) { 
    next(err);
  }
});
