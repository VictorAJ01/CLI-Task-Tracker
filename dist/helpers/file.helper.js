import path from "path";
import fs from "fs/promises";
const FILE_PATH = path.resolve("./tasks.json");
export async function writeTasks(tasks) {
    try {
        await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
    }
    catch (_error) {
        const error = _error;
        console.error("Error writing tasks to file:", error.message);
        throw error;
    }
}
export async function readTasks() {
    try {
        const data = await fs.readFile(FILE_PATH, "utf-8");
        return JSON.parse(data);
    }
    catch (_error) {
        const error = _error;
        if (error.code === "ENOENT") {
            return [];
        }
        console.error("Error reading tasks from file:", error.message);
        return [];
    }
}
