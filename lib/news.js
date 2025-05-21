import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getAllNews() {
  const result = await pool.query(
    "SELECT id, slug, title, content, TO_CHAR(date, 'YYYY-MM-DD') as date, image FROM news"
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return result.rows;
}

export async function getNewsItem(slug) {
  const result = await pool.query(
    "SELECT id, slug, title, content, TO_CHAR(date, 'YYYY-MM-DD') as date, image FROM news WHERE slug = $1",
    [slug]
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return result.rows[0];
}

export async function getLatestNews() {
  const result = await pool.query(
    "SELECT id, slug, title, content, TO_CHAR(date, 'YYYY-MM-DD') as date, image FROM news ORDER BY date DESC LIMIT 3"
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return result.rows;
}

export async function getAvailableNewsYears() {
  const result = await pool.query(
    "SELECT DISTINCT EXTRACT(YEAR FROM date) as year FROM news"
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return result.rows.map((row) => row.year.toString());
}

export async function getAvailableNewsMonths(year) {
  const result = await pool.query(
    "SELECT DISTINCT EXTRACT(MONTH FROM date) as month FROM news WHERE EXTRACT(YEAR FROM date) = $1",
    [year]
  );
  return result.rows.map((row) => row.month.toString().padStart(2, "0"));
}

export async function getNewsForYear(year) {
  const result = await pool.query(
    "SELECT id, slug, title, content, TO_CHAR(date, 'YYYY-MM-DD') as date, image FROM news WHERE EXTRACT(YEAR FROM date) = $1 ORDER BY date DESC",
    [year]
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return result.rows;
}

export async function getNewsForYearAndMonth(year, month) {
  const result = await pool.query(
    "SELECT id, slug, title, content, TO_CHAR(date, 'YYYY-MM-DD') as date, image FROM news WHERE EXTRACT(YEAR FROM date) = $1 AND EXTRACT(MONTH FROM date) = $2 ORDER BY date DESC",
    [year, month]
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return result.rows;
}
