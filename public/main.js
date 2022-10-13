const socket = io();

const form = document.querySelector("form");
const input = document.querySelector("input");
const messages = document.querySelector(".messages");
const username = prompt("Please enter a username: ", "") || 'Unknown';

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (input.value) {
        addMessage(username + ": " + input.value);
        
        socket.emit("message", {
            message: input.value
        })
    }

    input.value = "";
});

addMessage("You have joined the chat as '" + username  + "'.");

function addMessage(message) {
    const li = document.createElement("li");
    li.innerHTML = message;
    messages.appendChild(li);
}

socket.emit("join", username);

socket.on("message", function(data) {
    addMessage(data.username + ": " + data.message);
});

socket.on("join", function(data) {
    addMessage(data + " joined the chat!");
});

socket.on("left", function(data) {
    addMessage(data + " left the chat.");
});
