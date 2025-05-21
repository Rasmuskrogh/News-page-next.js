const sqlite = require("better-sqlite3");
const { Pool } = require("pg");
require("dotenv").config();

// Connect to SQLite database
const sqliteDb = sqlite("data.db");

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrateData() {
  try {
    // Get all news from SQLite
    const news = sqliteDb.prepare("SELECT * FROM news").all();

    // Insert data into PostgreSQL
    for (const item of news) {
      await pool.query(
        "INSERT INTO news (slug, title, content, date, image) VALUES ($1, $2, $3, $4, $5)",
        [item.slug, item.title, item.content, item.date, item.image]
      );
      console.log(`Migrated news item: ${item.title}`);
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    // Close connections
    sqliteDb.close();
    await pool.end();
  }
}

migrateData();
