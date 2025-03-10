import { Tarefa } from "./Tarefa";

export class TaskManager {
  private tasks: Tarefa[];
  private currentId: number;

  constructor() {
    this.tasks = [];
    const storedId = localStorage.getItem("id");
    this.currentId = storedId ? JSON.parse(storedId) : 0;
  }

  private getNextId(): number {
    this.currentId++;
    return this.currentId;
  }

  addTask(taskName: string): number {
    const newTask: Tarefa = {
      id: this.getNextId(),
      name: taskName,
      isCompleted: false,
    };
    this.tasks = [newTask, ...this.tasks];
    this.saveTasks();
    return newTask.id;
  }

  removeTask(taskID: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskID);
    this.saveTasks();
  }

  completeTask(taskID: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === taskID ? { ...task, isCompleted: !task.isCompleted } : task
    );
    this.saveTasks();
  }

  listTask(): Tarefa[] {
    return this.tasks;
  }

  saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadTasks(): void {
    const data = localStorage.getItem("tasks");
    if (data) {
      try {
        this.tasks = JSON.parse(data);
        const maxId = this.tasks.reduce(
          (max, task) => Math.max(max, task.id),
          0
        );
        this.currentId = maxId;
      } catch (error) {
        console.error("Error on load tasks:", error);
        this.tasks = [];
      }
    }
  }
}
