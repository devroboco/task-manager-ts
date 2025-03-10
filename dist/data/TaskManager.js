var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
        var storedId = localStorage.getItem("id");
        this.currentId = storedId ? JSON.parse(storedId) : 0;
    }
    TaskManager.prototype.getNextId = function () {
        this.currentId++;
        return this.currentId;
    };
    TaskManager.prototype.addTask = function (taskName) {
        var newTask = {
            id: this.getNextId(),
            name: taskName,
            isCompleted: false,
        };
        this.tasks = __spreadArray([newTask], this.tasks, true);
        this.saveTasks();
        return newTask.id;
    };
    TaskManager.prototype.removeTask = function (taskID) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== taskID; });
        this.saveTasks();
    };
    TaskManager.prototype.completeTask = function (taskID) {
        this.tasks = this.tasks.map(function (task) {
            return task.id === taskID ? __assign(__assign({}, task), { isCompleted: !task.isCompleted }) : task;
        });
        this.saveTasks();
    };
    TaskManager.prototype.listTask = function () {
        return this.tasks;
    };
    TaskManager.prototype.saveTasks = function () {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    };
    TaskManager.prototype.loadTasks = function () {
        var data = localStorage.getItem("tasks");
        if (data) {
            try {
                this.tasks = JSON.parse(data);
                var maxId = this.tasks.reduce(function (max, task) { return Math.max(max, task.id); }, 0);
                this.currentId = maxId;
            }
            catch (error) {
                console.error("Error on load tasks:", error);
                this.tasks = [];
            }
        }
    };
    return TaskManager;
}());
export { TaskManager };
//# sourceMappingURL=TaskManager.js.map