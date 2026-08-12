const form = document.querySelector("form");
const input = document.querySelector("#input");
const taskList = document.querySelector("#list");

console.log(form);
console.log(input);
console.log(taskList);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const task = input.value.trim();
     if (task === "") {
        return;
    }
    console.log(task);
});