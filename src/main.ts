interface Tarefa {
  id: number;
  name: string;
  isCompleted: boolean;
}

type TaskElements = [HTMLLIElement, HTMLButtonElement, HTMLButtonElement];

class TaskManager {
  tasks: Tarefa[];
  constructor() {
    this.tasks = [];
  }

  addTask(task: Tarefa): void {
    this.tasks = [task, ...this.tasks];
  }

  removeTask(taskID: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskID);
  }

  completeTask(taskID: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === taskID ? { ...task, isCompleted: true } : task
    );
  }

  listTask(): Tarefa[] {
    return this.tasks;
  }
}

const input = document.querySelector("input") as HTMLInputElement | null;
const button = document.querySelector("button") as HTMLButtonElement | null;
const ul = document.querySelector("ul") as HTMLUListElement | null;

const manager = new TaskManager();

let id = 1;

button?.addEventListener("click", handleClick);

function createTask(name: string): number {
  manager.addTask({
    id,
    name,
    isCompleted: false,
  });
  return id;
}

function completeTaskHandler(taskID: number, li: HTMLLIElement): void {
  manager.completeTask(taskID);
  li.classList.toggle("completed");
}

function removeTaskHandler(taskID: number, li: HTMLLIElement): void {
  manager.removeTask(taskID);
  li.remove();
}

function createElement(text: string): TaskElements {
  const li = document.createElement("li");
  const completed = document.createElement("button");
  const remove = document.createElement("button");
  const name = document.createElement("span");

  completed.classList.add("completed-btn");
  remove.classList.add("remove-btn");

  name.textContent = text;

  li.append(completed);
  li.append(name);
  li.append(remove);

  ul?.prepend(li);

  return [li, completed, remove];
}

function addEvents(elements: TaskElements, taskID: number): void {
  elements[1].addEventListener("click", () =>
    completeTaskHandler(taskID, elements[0])
  );
  elements[2].addEventListener("click", () =>
    removeTaskHandler(taskID, elements[0])
  );
}

function handleClick(): void {
  if (input) {
    if (input.value) {
      const currentId = createTask(input.value);
      addEvents(createElement(input.value), currentId);
      id = id + 1;
      input.value = "";
    } else {
      alert("Preencha o campo");
    }
  }
}
