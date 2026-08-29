let tasks = [];
let currentFilter = "all";

try {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
            tasks = parsedTasks;
        }
    }
} catch (error) {
    tasks = [];
}

const form = document.querySelector("form");
const input = document.querySelector("#input");
const taskList = document.querySelector("#list");
const taskCount = document.querySelector("#task-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    const activeTasks = tasks.filter(function(task) {
        return !task.completed;
    });

    taskCount.textContent = activeTasks.length + " tasks left";

    let tasksToShow = tasks;

    if (currentFilter === "active") {
        tasksToShow = tasks.filter(function(task) {
            return !task.completed;
        });
    }

    if (currentFilter === "completed") {
        tasksToShow = tasks.filter(function(task) {
            return task.completed;
        });
    }

    tasksToShow.forEach(function(task) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed;

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.type = "button";

        if (task.completed) {
            li.classList.add("completed");
        }

        checkbox.addEventListener("change", function() {
            const taskToUpdate = tasks.find(function(item) {
                return item.id === task.id;
            });

            if (taskToUpdate) {
                taskToUpdate.completed = checkbox.checked;

                saveTasks();
                renderTasks();
            }
        });

        deleteButton.addEventListener("click", function() {
            const index = tasks.findIndex(function(item) {
                return item.id === task.id;
            });

            if (index !== -1) {
                tasks.splice(index, 1);

                saveTasks();
                renderTasks();
            }
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = input.value.trim();

    if (task === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: task,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    input.value = "";
    input.focus();
});

clearCompletedButton.addEventListener("click", function() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();
    renderTasks();
});

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTasks();
    });
});

renderTasks();