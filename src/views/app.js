const titleInput = document.querySelector('.title-input');
const descriptionInput = document.querySelector('.description-input');
const submitButton = document.querySelector('.submit-button');
const getButton = document.querySelector('#get');
const output = document.querySelector('.output');

// 📌 CREATE: Add a new todo
submitButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
        alert("Both fields are required!");
        return;
    }

    fetch('http://localhost:4040/api/v1/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        titleInput.value = "";
        descriptionInput.value = "";
        fetchTodos(); // Refresh list
    })
    .catch(error => console.error("Error:", error));
});

// 📌 READ: Fetch all todos
function fetchTodos() {
    fetch('http://localhost:4040/api/v1/get')
        .then(response => response.json())
        .then(data => {
            output.innerHTML = "";
            // Access the 'todos' array from the response
            data.todos.forEach(todo => {
                const div = document.createElement('div');
                div.classList.add('todo-item');
                div.innerHTML = `
                <div class="contentcontainer">
                    <h3>${todo.title}</h3>
                    <p>${todo.description}</p>
                    </div>
                    <div class="buttonscontainer">
                    <button onclick="updateTodo('${todo._id}')">Update</button>
                    <button onclick="deleteTodo('${todo._id}')">Delete</button>
                    </div
                `;
                output.appendChild(div);
            });
        })
        .catch(error => console.error("Error:", error));
}

// 📌 UPDATE: Modify a todo
function updateTodo(id) {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");

    if (!newTitle || !newDescription) return;

    fetch(`http://localhost:4040/api/v1/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchTodos();
    })
    .catch(error => console.error("Error:", error));
}

// 📌 DELETE: Remove a todo
function deleteTodo(id) {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    fetch(`http://localhost:4040/api/v1/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);  // Show success message
            fetchTodos();  // Refresh the todo list
        } else {
            alert("Failed to delete the todo.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while deleting the todo.");
    });
}

// 📌 Load todos on "Get Todos" button click
getButton.addEventListener('click', fetchTodos);
