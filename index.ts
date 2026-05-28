#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve("./tasks.json");

type Task = {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

async function writeTasks(tasks: Task[]) {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
  } catch (_error) {
    const error = _error as NodeJS.ErrnoException;
    console.error("Error writing tasks to file:", error.message);
  }
}

async function readTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (_error) {
    const error = _error as NodeJS.ErrnoException;

    if (error.code === "ENOENT") {
      console.error("Tasks file not found, starting with an empty task list.");
      return [];
    }

    console.error("Error reading tasks from file:", error.message);
    return [];
  }
}

async function addTask(taskDescription: string) {
  console.log(`Add task with this description: ${taskDescription}`);
}

async function updateTask(taskId: string, taskDescription: string) {
  console.log(`Update ${taskId} with this description: ${taskDescription}`);
}

async function updateTaskStatus(taskId: string, status: string) {
  console.log(`Update ${taskId} status to: ${status}`);
}

async function deleteTask(taskId: string) {
  console.log(`Delete task with ID: ${taskId}`);
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
