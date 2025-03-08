import sqlite3 from "sqlite3";
import path from "path";

// Define the database file path (stored in the project directory)
let db: sqlite3.Database;

export function createDatabase(databasePath: string|undefined){
  if (!databasePath) {
    databasePath = path.join(__dirname, "database.sqlite");
  }
   db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to SQLite database.");
    }
  });
}


export type Album = {
  album_id: string;
  amount: number;
};

export function initializeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
        `CREATE TABLE IF NOT EXISTS albums (
         album_id TEXT PRIMARY KEY,
         amount INTEGER DEFAULT 1
         )`,
        (err) => (err ? reject(err) : resolve())
    );
  });
}

export function closeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
        reject(err);
      } else {
        console.log("Database connection closed.");
        resolve();
      }
    });
  });
}

export function addAlbum(albumId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
        `INSERT INTO albums (album_id)
         VALUES (?)
           ON CONFLICT(album_id) DO UPDATE SET amount = amount + 1`,
        [albumId],
        (err) => (err ? reject(err) : resolve())
    );
  });
}

export function getAlbumById(albumId: string): Promise<Album | null> {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM albums WHERE album_id = ?`, [albumId], (err, row) => {
      if (err) reject(err);
      else resolve(row ? (row as Album) : null);
    });
  });
}

export function getAlbumCount(): Promise<number> {
  return new Promise((resolve, reject) => {
    db.get<{ count: number }>(`SELECT COUNT(*) AS count FROM albums`, [], (err, row) => {
      if (err) reject(err);
      else resolve(row ? row.count : 0);
    });
  });
}

export function getAllAlbums(): Promise<Album[]> {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM albums`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Album[]);
    });
  });
}
