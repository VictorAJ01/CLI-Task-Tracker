#!/usr/bin/env node
import { getNextId, readTasks, writeTasks } from "./helpers/index.js";
// Add Task
async function addTask(description) {
    if (!description) {
        console.log("Error: Please provide a description");
        return;
    }
    const tasks = await readTasks();
    // Check if task with the description already exists
    const task = tasks.find((t) => t.description === description);
    if (task) {
        console.error("Error: Task already exists with this description.");
        return;
    }
    const newTask = {
        id: getNextId(tasks),
        description: description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    console.log("Tasks added successfully");
}
//  Update Task
async function updateTask(id, description) {
    if (!id || !description) {
        console.log("Error: Please provide both ID and description");
        return;
    }
    const tasks = await readTasks();
    // Check if task exists
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
        console.log(`Error: Cannot find task with ID: ${id}`);
        return;
    }
    task.description = description;
    task.updatedAt = new Date().toISOString();
    await writeTasks(tasks);
    console.log("Task updated successfully");
}
// Update Task Status
async function updateTaskStatus(id, status) {
    if (!id) {
        console.log("Error: Please provide a task ID.");
        return;
    }
    const tasks = await readTasks();
    // Check if task exists
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
        console.log(`Error: Cannot find task with ID: ${id}`);
        return;
    }
    task.status = status;
    task.updatedAt = new Date().toISOString();
    await writeTasks(tasks);
    console.log(`Task ${id} marked as ${status}.`);
}
// Delete Task
async function deleteTask(id) {
    const tasks = await readTasks();
    const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));
    if (filteredTasks.length === tasks.length) {
        console.log(`Error: Cannot find task with ID: ${id}`);
        return;
    }
    await writeTasks(filteredTasks);
    console.log(`Task ${id} deleted successfully.`);
}
// List Tasks
async function listTasks(filterStatus) {
    const tasks = await readTasks();
    const filteredTasks = filterStatus
        ? tasks.filter((task) => task.status === filterStatus)
        : tasks;
    if (filteredTasks.length === 0) {
        console.log("No tasks found.");
        return;
    }
    console.log("Tasks:");
    filteredTasks.forEach((task) => {
        console.log(`- [${task.status}] ${task.description} (ID: ${task.id})`);
    });
}
// Main function
async function main() {
    const [, , command, arg1, arg2] = process.argv;
    switch (command) {
        case "add":
            await addTask(arg1);
            break;
        case "update":
            await updateTask(arg1, arg2);
            break;
        case "mark-in-progress":
            await updateTaskStatus(arg1, "in-progress");
            break;
        case "mark-done":
            await updateTaskStatus(arg1, "done");
            break;
        case "delete":
            await deleteTask(arg1);
            break;
        case "list":
            await listTasks(arg1);
            break;
        default:
            console.log("Usage instructions:");
            console.log('task-cli add "task description" <- Note: Use single quotes if using "!"');
            console.log('task-cli update [id] "new description" <- Note: Use single quotes if using "!"');
            console.log("task-cli delete [id]");
            console.log("task-cli mark-in-progress [id]");
            console.log("task-cli mark-done [id]");
            console.log("task-cli list [status]");
            break;
    }
}
main();
