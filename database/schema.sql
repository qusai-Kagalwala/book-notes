-- Create database (run this separately)
-- CREATE DATABASE book_notes_db;

-- Connect to the database
-- \c book_notes_db

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(20),
  rating INTEGER CHECK (rating BETWEEN 1 AND 10),
  notes TEXT,
  date_read DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data (optional)
INSERT INTO books
    (title, author, isbn, rating, notes, date_read)
VALUES
    ('Atomic Habits', 'James Clear', '9780735211292', 9, 'Tiny changes, remarkable results. An easy & proven way to build good habits & break bad ones.', '2023-01-15'),
    ('Thinking, Fast and Slow', 'Daniel Kahneman', '9780374533557', 8, 'Explores the two systems that drive the way we think: System 1 is fast, intuitive; System 2 is slow, deliberate.', '2022-11-20'),
    ('Sapiens', 'Yuval Noah Harari', '9780062316097', 10, 'A brief history of humankind - from the emergence of Homo sapiens to the present.', '2022-08-05');