import { Tarefa } from "../data/Tarefa";
import { TaskManager } from "../data/TaskManager";
import { addEvents } from "./events.js";

export type TaskElements = [
  HTMLLIElement,
  HTMLButtonElement,
  HTMLButtonElement
];

export function createTaskElement(task: Tarefa): TaskElements {
  const ul = document.querySelector("ul") as HTMLUListElement;
  const li = document.createElement("li");
  const completed = document.createElement("button");
  const remove = document.createElement("button");
  const name = document.createElement("span");

  completed.classList.add("completed-btn");
  remove.classList.add("remove-btn");

  name.textContent = task.name;

  li.appendChild(completed);
  li.appendChild(name);
  li.appendChild(remove);

  ul.prepend(li);

  return [li, completed, remove];
}

export function renderList(tasks: Tarefa[], manager: TaskManager): void {
  const ul = document.querySelector("ul") as HTMLUListElement;
  ul.innerHTML = "";
  tasks.forEach((task) => {
    const elements: TaskElements = createTaskElement(task);
    addEvents(elements, task.id, manager);
  });
}
