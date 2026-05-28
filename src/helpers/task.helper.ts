import { Task } from "../types/task.type.js";

export function getNextId(tasks: Task[]): number {
  return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
}
