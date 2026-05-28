#!/usr/bin/env node
import path from "path";
const FILE_PATH = path.resolve("./tasks.json");
async function addTask(taskDescription) {
    console.log(`Add task with this description: ${taskDescription}`);
}
async function updateTask(taskId, taskDescription) {
    console.log(`Update ${taskId} with this description: ${taskDescription}`);
}
async function updateTaskStatus(taskId, status) {
    console.log(`Update ${taskId} status to: ${status}`);
}
async function deleteTask(taskId) {
    console.log(`Delete task with ID: ${taskId}`);
}
async function listTasks(filterStatus) {
    console.log(`List tasks with status: ${filterStatus}`);
}
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
            console.log('task-cli add "task description"');
            console.log('task-cli update [id] "new description"');
            console.log("task-cli delete [id]");
            console.log("task-cli mark-in-progress [id]");
            console.log("task-cli mark-done [id]");
            console.log("task-cli list [status]");
            break;
    }
}
main();
