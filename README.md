# 📚 Book Notes App

A full-stack web application to track your reading journey and take notes on books you've read.

## 🌟 Features

- 📖 Add books with title, author, and ISBN
- ⭐ Rate books on a scale of 1-10
- 📝 Write and store notes for each book
- 📅 Track reading dates
- 🖼️ Automatic book cover fetching using ISBN
- 🔄 Sort books by rating, date read, or title
- ✏️ Edit existing book entries
- 🗑️ Delete books from your collection

## 🛠️ Tech Stack

- **Frontend:** EJS, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **APIs:** Open Library (for book covers)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/qusai-Kagalwala/book-notes.git
   cd book-notes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL:
   * Create a database named `book_notes_db`
   * Run the schema file in schema.sql
   * Update database credentials in db.js

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## 🔧 Environment Setup

Make sure you have:
* Node.js installed
* PostgreSQL installed and running
* Database credentials configured

## 📱 Usage

* Visit `http://localhost:3000` to access the app
* Click "Add New Book" to add a book
* Use the sort options to organize your collection
* Click Edit or Delete to modify entries

## 📝 License

MIT License

## 👨‍💻 Created By

Qusai Kagalwala
