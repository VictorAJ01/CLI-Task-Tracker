#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve("./tasks.json");

type TaskStatus = "todo" | "in-progress" | "done";

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
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
      return [];
    }

    console.error("Error reading tasks from file:", error.message);
    return [];
  }
}

async function addTask(taskTitle: Task["title"]) {
  const tasks = await readTasks();

  // Check if task with the title already exists
  const task = tasks.find((t) => t.title === taskTitle);

  if (task) {
    console.error("Task already exists with this title.");
    return;
  }

  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const newTask: Task = {
    id: nextId,
    title: taskTitle,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  console.log("Tasks added successfully");
}

async function updateTask(taskId: string, taskTitle: Task["title"]) {
  console.log(`Update ${taskId} with this title: ${taskTitle}`);
}

async function updateTaskStatus(taskId: string, status: Task["status"]) {
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
