/**
 * @fileoverview
 * Test suite for the HMCTS API backend.
 * 
 * Dependencies:
 * - supertest: For HTTP assertions on the Express app.
 * 
 * Test Cases:
 * - Should create a new task.
 * - Should retrieve all tasks (empty array initially).
 * - Should retrieve a task by ID.
 * - Should update the status of a task by ID.
 * - Should delete a task by ID.
 * - Should return 404 for unknown routes.
 */
import request from 'supertest';
import app from './app';

describe('Task API', () => {
    let createdTaskId: string;

    it('should create a new task', async () => {
        const newTask = {
            title: 'Test Task 2',
            description: "Test task using jest",
            status: 'pending',
            dueDateTime: new Date()
        };
        const response = await request(app).post('/tasks').send(newTask);

        console.log("New Task Title: ", response.body.title);
        console.log("Response Status: ", response.status)

        // Assert
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTask.title);
        createdTaskId = response.body.id;
    });

    it('should retrieve all tasks (empty array initially)', async () => {
        const response = await request(app).get('/tasks');
        // console.log("Response Status: ", response.status)

        // Assert
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a task by ID', async () => {
        const response = await request(app).get(`/tasks/${createdTaskId}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdTaskId);
        expect(response.body).toHaveProperty('title', 'Test Task 2');
    });

    it('should update the status of a task by ID', async () => {
        const updatedStatus = 'completed';
        const response = await request(app)
            .patch(`/tasks/${createdTaskId}/status`)
            .send({ status: updatedStatus });

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', updatedStatus);
    });

    it('should delete a task by ID', async () => {
        const response = await request(app).delete(`/tasks/${createdTaskId}`);

        // Assert
        expect(response.status).toBe(204);

        // Confirm deletion
        const getResponse = await request(app).get(`/tasks/${createdTaskId}`);
        expect(getResponse.status).toBe(404);
    });

    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/unknown');
        expect(response.status).toBe(404);
    });
});