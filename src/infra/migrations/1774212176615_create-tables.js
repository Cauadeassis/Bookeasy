/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(
    `CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    username    TEXT NULL,
    photo_url   TEXT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE books (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    gender      TEXT NOT NULL,
    author      TEXT NOT NULL,
    cover_url   TEXT NULL,
    description TEXT NULL,
    user_id     INTEGER NOT NULL REFERENCES users(id),
    created_at  TIMESTAMP DEFAULT NOW()
  );`,
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
