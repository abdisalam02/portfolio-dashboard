import path from "path";
import sqlite3 from "sqlite3";

// Resolve the absolute path to the database file
const dbPath = path.resolve("data/portfolio.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

export default db;

