import pool from "../db/connection";

export async function createTask(task: Task): Promise<Task> {
    const result = await pool.query(
        "INSERT INTO tasks (title, description, status, dueDateTime) VALUES ($1, $2, $3, $4) RETURNING *",
        [task.title, task.description, task.status, task.dueDateTime]
    );
    return result.rows[0];
}

export async function getTaskById(id: string): Promise<Task> {
    const result = await pool.query("SELECT * FROM tasks where id = $1", [id]);
    return result.rows[0];
}

export async function getAllTasks() {
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
}

export async function updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
    const result = await pool.query(
        "UPDATE tasks SET status=$1, updated_at=NOW() WHERE id = $2 RETURNING *",
        [status, id]
    );
    return result.rows[0];
}

export async function deleteTask(id: string): Promise<any> {
    const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
}
