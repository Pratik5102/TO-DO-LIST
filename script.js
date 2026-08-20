const tasks = [];

const form = document.querySelector("form");
const input = document.querySelector("#input");
const taskList = document.querySelector("#list");

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

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    checkbox.addEventListener("change", function() {
        li.classList.toggle("completed", checkbox.checked);
        newTask.completed = checkbox.checked;
        console.log(tasks);
    });

    deleteButton.addEventListener("click", function() {
        li.remove();
        tasks.splice(tasks.indexOf(newTask), 1);
        console.log(tasks);
    });

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    input.value = "";
});