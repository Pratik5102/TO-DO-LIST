let tasks = [];
let currentFilter = "all";

// Load saved tasks from localStorage
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
const emptyMessage = document.querySelector("#empty-message");
const inputMessage = document.querySelector("#input-message");

// Save current tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks according to the selected filter
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

    // Show message when the selected list is empty
    if (tasksToShow.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
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

        // Update completed status when checkbox changes
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

        // Delete the selected task
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

// Add a new task
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = input.value.trim();

    // Show message if input is empty
    if (task === "") {
        inputMessage.textContent = "Please enter a task.";
        input.focus();
        return;
    }

    inputMessage.textContent = "";

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

// Hide the empty input message when the user starts typing
input.addEventListener("input", function() {
    if (input.value.trim() !== "") {
        inputMessage.textContent = "";
    }
});

// Remove all completed tasks
clearCompletedButton.addEventListener("click", function() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();
    renderTasks();
});

// Change the current task filter
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

// Display saved tasks when the page opens
renderTasks();