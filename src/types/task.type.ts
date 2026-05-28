export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
};
