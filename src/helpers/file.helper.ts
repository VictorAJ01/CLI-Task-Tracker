import path from "path";
import fs from "fs/promises";

import { Task } from "../types/index.js";

const FILE_PATH = path.resolve("./tasks.json");

export async function writeTasks(tasks: Task[]) {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
  } catch (_error) {
    const error = _error as NodeJS.ErrnoException;
    console.error("Error writing tasks to file:", error.message);
  }
}

export async function readTasks(): Promise<Task[]> {
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
