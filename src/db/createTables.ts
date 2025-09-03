import pool from "./connection";

export default async function createTables() {
  try {
    // Create ENUM type for status if not exists
    await pool.query(`
        DO $$ BEGIN
          CREATE TYPE status AS ENUM ('pending', 'in-progress', 'completed');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

    console.log("Enum 'Status' created (if not exists)");

    // Create Tasks Table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          title VARCHAR(100) NOT NULL,
          description TEXT,
          status status DEFAULT 'pending',
          dueDateTime TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NULL
        );
      `);

    console.log("Tasks table created (if not exists)");

  } catch (error) {
    console.error("Error creating tables: ", error);
  }
}