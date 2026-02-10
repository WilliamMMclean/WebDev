// app.js

// Import modules using ES Modules
import sqlite3 from 'sqlite3';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

// Initialize SQLite database
const db = new sqlite3.Database('./database/employees.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the employees database.');
  }
});

// Create table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

// Display interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Insert
app.post('/add', (req, res) => {
  db.serialize(() => {
    db.run(
      'INSERT INTO emp(id,name) VALUES(?,?)',
      [req.body.id, req.body.name],
      function (err) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log('New employee has been added');
        res.sendFile(path.join(__dirname, './public/index.html'));
      }
    );
  });
});

// View
app.post('/view', (req, res) => {
  db.serialize(() => {
    db.each(
      'SELECT id ID, name NAME FROM emp WHERE id =?',
      [req.body.id],
      (err, row) => {
        if (err) {
          console.error(err.message);
          res.send('Error encountered while displaying');
          return;
        }
        console.log('Entry displayed successfully');
        res.send(`ID: ${row.ID}, Name: ${row.NAME}`);
      }
    );
  });
});

// Update
app.post('/update', (req, res) => {
  db.serialize(() => {
    db.run(
      'UPDATE emp SET name = ? WHERE id = ?',
      [req.body.name, req.body.id],
      function (err) {
        if (err) {
          console.error(err.message);
          res.send('Error encountered while updating');
          return;
        }
        console.log('Entry updated successfully');
        res.send('Entry updated successfully');
      }
    );
  });
});

// Delete
app.post('/delete', (req, res) => {
  db.serialize(() => {
    db.run('DELETE FROM emp WHERE id = ?', req.body.id, function (err) {
      if (err) {
        console.error(err.message);
        res.send('Error encountered while deleting');
        return;
      }
      console.log('Entry deleted');
      res.send('Entry deleted');
    });
  });
});

// Show all
app.post('/showAll', (req, res) => {
  db.serialize(() => {
    db.all('SELECT * FROM emp', (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows,
      });
    });
  });
});

// Close database
app.get('/close', (req, res) => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
      res.send('There is some error in closing the database');
      return;
    }
    console.log('Closing the database connection.');
    res.send('Database connection successfully closed');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


