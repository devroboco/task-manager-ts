export function addEvents(elements, taskID, manager) {
    elements[1].addEventListener("click", function () {
        manager.completeTask(taskID);
        elements[0].classList.toggle("completed");
    });
    elements[2].addEventListener("click", function () {
        manager.removeTask(taskID);
        elements[0].remove();
    });
}
//# sourceMappingURL=events.js.map