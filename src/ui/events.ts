import { TaskElements } from "./render";
import { TaskManager } from "../data/TaskManager";

export function addEvents(
  elements: TaskElements,
  taskID: number,
  manager: TaskManager
): void {
  elements[1].addEventListener("click", () => {
    manager.completeTask(taskID);
    elements[0].classList.toggle("completed");
  });
  elements[2].addEventListener("click", () => {
    manager.removeTask(taskID);
    elements[0].remove();
  });
}
