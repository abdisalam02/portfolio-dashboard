import path from 'path';
import sqlite3 from 'sqlite3';

// Resolve the absolute path for the database file
const dbPath = path.resolve('data/portfolio.db'); // Adjust 'data/portfolio.db' to match the actual location of your database

// Open the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Initialize tables
db.serialize(() => {
  // Create Projects table
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
  `);

  // Create Ratings table
  db.run(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects (id)
    )
  `);

  console.log('Database initialized');
});

// Close the database
db.close();
