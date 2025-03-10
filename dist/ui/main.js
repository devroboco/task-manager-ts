import { TaskManager } from "../data/TaskManager.js";
import { renderList, createTaskElement } from "./render.js";
import { addEvents } from "./events.js";
var input = document.querySelector("input");
var addButton = document.querySelector(".btn_add");
var ul = document.querySelector("ul");
var manager = new TaskManager();
manager.loadTasks();
renderList(manager.listTask(), manager);
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", function () {
    if (input && input.value.trim()) {
        var taskName = input.value.trim();
        var newTaskID = manager.addTask(taskName);
        var newTask = {
            id: newTaskID,
            name: taskName,
            isCompleted: false,
        };
        var elements = createTaskElement(newTask);
        addEvents(elements, newTaskID, manager);
        input.value = "";
    }
    else {
        alert("Preencha o campo");
    }
});
//# sourceMappingURL=main.js.map