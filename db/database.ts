import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function initDb() {
  return open({
    filename: path.resolve(__dirname, '../../../project.db'),
    driver: sqlite3.Database
  });
}