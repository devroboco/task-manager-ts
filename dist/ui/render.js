import { addEvents } from "./events.js";
export function createTaskElement(task) {
    var ul = document.querySelector("ul");
    var li = document.createElement("li");
    var completed = document.createElement("button");
    var remove = document.createElement("button");
    var name = document.createElement("span");
    completed.classList.add("completed-btn");
    remove.classList.add("remove-btn");
    name.textContent = task.name;
    li.appendChild(completed);
    li.appendChild(name);
    li.appendChild(remove);
    if (task.isCompleted) {
        li.classList.add("completed");
    }
    ul.prepend(li);
    return [li, completed, remove];
}
export function renderList(tasks, manager) {
    var ul = document.querySelector("ul");
    ul.innerHTML = "";
    tasks.forEach(function (task) {
        var elements = createTaskElement(task);
        addEvents(elements, task.id, manager);
    });
}
//# sourceMappingURL=render.js.map