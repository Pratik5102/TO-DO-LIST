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
    li.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    input.value = "";
});