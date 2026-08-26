let tasks = [];

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

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    const activeTasks = tasks.filter(function(task) {
        return !task.completed;
    });

    taskCount.textContent = activeTasks.length + " tasks left";

    tasks.forEach(function(task) {
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

    console.log(tasks);

    renderTasks();

    input.value = "";
});

renderTasks();