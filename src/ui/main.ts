import { TaskManager } from "../data/TaskManager.js";
import { renderList, createTaskElement, TaskElements } from "./render.js";
import { addEvents } from "./events.js";
import { Tarefa } from "../data/Tarefa.js";

const input = document.querySelector("input") as HTMLInputElement | null;
const addButton = document.querySelector(
  ".btn_add"
) as HTMLButtonElement | null;
const ul = document.querySelector("ul") as HTMLUListElement | null;

const manager = new TaskManager();
manager.loadTasks();
renderList(manager.listTask(), manager);

addButton?.addEventListener("click", () => {
  if (input && input.value.trim()) {
    const taskName = input.value.trim();
    const newTaskID = manager.addTask(taskName);
    const newTask: Tarefa = {
      id: newTaskID,
      name: taskName,
      isCompleted: false,
    };
    const elements: TaskElements = createTaskElement(newTask);
    addEvents(elements, newTaskID, manager);
    input.value = "";
  } else {
    alert("Preencha o campo");
  }
});
