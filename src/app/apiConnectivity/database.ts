import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

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
      db.close((err) => (err ? reject(err) : resolve()));
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
    db.get(`SELECT COUNT(*) AS count FROM albums`, [], (err, row) => {
      if (err) reject(err);
      else resolve(row.count);
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

