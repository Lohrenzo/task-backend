import { NextFunction, Request, Response } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTaskStatus } from "../models/task";

/**
 * Controller to create a new task
 * 
 * @param req HTTP request
 * @param res HTTP Response
 * @param next Next function in middleware chain
 * @returns Created task or error response
 */
export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, status, dueDateTime, } =
            req.body;

        // validate input
        if (!title || !status || !dueDateTime) {
            res.status(400).json({ error: "Title, status, and due date/time are required." });
        }

        const task: Task = {
            id: Math.random() * 1000000 + "", // Simple ID generation for demo purposes
            title,
            description,
            status,
            dueDateTime
        };

        // create new task
        const newTask = await createTask(task);
        res.status(201).json(newTask);
    } catch (error: any) {
        console.error("Error creating task: ", error.message);
        res.status(400).json({ error: "Error creating task!!" });
        next(error);
    }
};

/** 
 * Controller to retrieve all tasks
 * 
 * @param req HTTP request
 * @param res Response
 * @param next Next function in middleware chain
 * @returns All tasks or error response
 */
export const getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(400).json({ error: "Error fetching all tasks!!" });
        console.error(`Error fetching all tasks: `, error.message);
        next(error);
    }
}


/**
 * Controller to retrieve a task bt its ID
 * 
 * @param req HTTP request
 * @param res Response
 * @param next Next function in middleware chain
 * @returns Fetched task or error response
 */
export const getTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await getTaskById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Tasks not found.' });
        res.json(task);
    } catch (error: any) {
        console.error(`Error getting task with Id "${req.params.id}": `, error.message);
        res.status(400).json({ error: `Error getting task with Id: "${req.params.id}!!` });
        next(error);
    }
}

/**
 * Controller to update the status of a task
 * 
 * @param req HTTP request
 * @param res Response
 * @param next Next function in middleware chain
 * @returns Updated task or error response
 */
export const updateTaskStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ error: 'Status is required.' });
        const task = await updateTaskStatus(req.params.id, status);
        if (!task) return res.status(404).json({ error: 'Task not found.' });
        res.json(task);
    } catch (error: any) {
        console.error(`Error updating task status: `, error.message);
        res.status(400).json({ error: `Error updating task status` });
        next(error);
    }
}

/**
 * Controller to delete a task
 * 
 * @param req HTTP request
 * @param res Response
 * @param next Next function in middleware chain
 * @returns Null or error response
 */
export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const success = deleteTask(req.params.id);
        if (!success) return res.status(404).json({ error: 'Task not found.' });
        res.status(204).send();
    } catch (error: any) {
        console.error(`Error deleting task: `, error.message);
        res.status(400).json({ error: "Error deleting task" });
        next(error);
    }
}