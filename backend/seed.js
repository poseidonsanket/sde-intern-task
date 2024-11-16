require('dotenv').config();
const { Pool } = require('pg');

// Create a temporary connection pool for seeding
const tempPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function runSeed() {
  try {
    // Check if the table exists and has data
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contacts'
      ) AS table_exists;
    `;
    
    const { rows } = await tempPool.query(checkTableQuery);

    if (rows[0].table_exists) {
      const checkDataQuery = `SELECT COUNT(*) FROM contacts`;
      const dataResult = await tempPool.query(checkDataQuery);
      
      // If there is data in the table, skip seeding
      if (parseInt(dataResult.rows[0].count, 10) > 0) {
        console.log('Table already exists and contains data. Seeding skipped.');
        return;
      }
    }

    // Create the table if it does not exist
    await tempPool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(50),
        job_title VARCHAR(50)
      );
    `);

    // Insert seed data
    await tempPool.query(`
      INSERT INTO contacts (first_name, last_name, email, phone, company, job_title)
      VALUES ('John', 'Doe', 'john.doe@example.com', '123-456-7890', 'Company A', 'Developer')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    // Close the temporary pool after seeding
    await tempPool.end();
  }
}

// Run the seed function
runSeed();
