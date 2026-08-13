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

    taskList.appendChild(li);

    input.value = "";
});