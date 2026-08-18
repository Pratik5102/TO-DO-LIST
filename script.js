const form = document.querySelector("form");
const input = document.querySelector("#input");
const taskList = document.querySelector("#list");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = input.value.trim();

    if (task === "") {
        return;
    }

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
    });

    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    input.value = "";
});