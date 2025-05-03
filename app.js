const express = require('express');
const axios = require('axios');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// Routes
// Home page - display all books
app.get('/', async (req, res) => {
  try {
    const sortBy = req.query.sort || 'rating';
    const order = req.query.order || 'DESC';
    
    let query = 'SELECT * FROM books ORDER BY ';
    
    if (sortBy === 'rating') {
      query += 'rating DESC';
    } else if (sortBy === 'date_read') {
      query += 'date_read DESC';
    } else if (sortBy === 'title') {
      query += 'title ASC';
    } else {
      query += 'rating DESC';
    }
    
    const { rows } = await db.query(query);
    res.render('index', { books: rows, sortBy });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).render('index', { books: [], error: 'Failed to load books' });
  }
});

// Add book page
app.get('/add', (req, res) => {
  res.render('add');
});

// Add book form submission
app.post('/add', async (req, res) => {
  try {
    const { title, author, isbn, rating, notes, date_read } = req.body;
    
    // Insert book into database
    const query = `
      INSERT INTO books (title, author, isbn, rating, notes, date_read) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `;
    
    await db.query(query, [title, author, isbn, rating, notes, date_read]);
    res.redirect('/');
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).render('add', { 
      error: 'Failed to add book', 
      formData: req.body 
    });
  }
});

// Edit book page
app.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM books WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    
    res.render('edit', { book: rows[0] });
  } catch (error) {
    console.error('Error fetching book for edit:', error);
    res.status(500).send('Server error');
  }
});

// Update book
app.post('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, rating, notes, date_read } = req.body;
    
    const query = `
      UPDATE books 
      SET title = $1, author = $2, isbn = $3, rating = $4, notes = $5, date_read = $6 
      WHERE id = $7
    `;
    
    await db.query(query, [title, author, isbn, rating, notes, date_read, id]);
    res.redirect('/');
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send('Failed to update book');
  }
});

// Delete book
app.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM books WHERE id = $1', [id]);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send('Failed to delete book');
  }
});

// Get book cover from Open Library API
app.get('/api/cover/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params;
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    res.json({ coverUrl });
  } catch (error) {
    console.error('Error fetching book cover:', error);
    res.status(500).json({ error: 'Failed to fetch book cover' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});