#!/usr/bin/env node

import { Task } from "./types/index.js";
import { getNextId, readTasks, writeTasks } from "./helpers/index.js";

async function addTask(description: Task["description"]) {
  if (!description) {
    console.log("Please provide a description");
    return;
  }

  const tasks = await readTasks();

  // Check if task with the description already exists
  const task = tasks.find((t) => t.description === description);

  if (task) {
    console.error("Task already exists with this description.");
    return;
  }

  const newTask: Task = {
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

async function updateTask(id: string, description: Task["description"]) {
  if (!id || !description) {
    console.log("Please provide both ID and description");
    return;
  }

  let tasks = await readTasks();

  // Check if task exists
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    console.log(`Cannot find task with ID: ${id}`);
    return;
  }

  task.description = description;
  task.updatedAt = new Date().toISOString();

  await writeTasks(tasks);
  console.log("Task updated successfully");
}

async function updateTaskStatus(id: string, status: Task["status"]) {
  if (!id || !status) {
    console.log("Please provide both ID and status");
    return;
  }
}

async function deleteTask(id: string) {
  console.log(`Delete task with ID: ${id}`);
}

async function listTasks(filterStatus: string) {
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
      console.log(
        'task-cli add "task description" <- Note: Use single quotes if using "!"',
      );
      console.log(
        'task-cli update [id] "new description" <- Note: Use single quotes if using "!"',
      );
      console.log("task-cli delete [id]");
      console.log("task-cli mark-in-progress [id]");
      console.log("task-cli mark-done [id]");
      console.log("task-cli list [status]");
      break;
  }
}

main();
