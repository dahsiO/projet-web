import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDb = async () => {
  return open({
    filename: './db/cozycorner.db', // adapte le chemin si besoin
    driver: sqlite3.Database
  });
};
