const tasks = [];

const form = document.querySelector("form");
const input = document.querySelector("#input");
const taskList = document.querySelector("#list");

function renderTasks() {
    taskList.innerHTML = "";

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

    taskToUpdate.completed = checkbox.checked;

    renderTasks();
});
deleteButton.addEventListener("click", function() {
    const index = tasks.findIndex(function(item) {
        return item.id === task.id;
    });

    tasks.splice(index, 1);

    renderTasks();
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

    console.log(tasks);

    renderTasks();

    input.value = "";
});