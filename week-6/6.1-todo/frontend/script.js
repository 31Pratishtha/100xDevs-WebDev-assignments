const API_URL = 'http://localhost:3001/todos';

// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchTodos()
});

// Fetch todos from backend
async function fetchTodos() {
    
    const todos = await axios.get(API_URL)
    console.log(todos)
    const todoJson = todos.data
    todoJson.forEach(todo => {
        addTodoToDOM(todo)
    });
    
}

// Add a new todo to the DOM
function addTodoToDOM(todo) {
    const todoList = document.getElementById('todo-list')

    const todoItem = document.createElement('li')

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id)
    })

    const title = document.createElement('span')
    title.textContent = todo.task

    todoItem.setAttribute('todo-id', todo.id)

    todoItem.appendChild(title)
    todoItem.appendChild(deleteButton)

    todoList.appendChild(todoItem)
}

// Add a new todo
document.getElementById('add-todo-btn').addEventListener('click', async () => {
    const titleInput = document.getElementById('todo-input')

    if(!titleInput){
        console.error('Input not found')
        return
    }

    const newTodo = {task: titleInput.value}

    const response = await axios.post(API_URL, newTodo, {
        headers: {
            'Content-Type': 'application/json'
        }

    })

    addTodoToDOM(response.data)
    titleInput.value = ''
});

// Toggle todo completion
function toggleTodo(id, completed) {
//    write here
}

// Delete a todo
async function deleteTodo(id) {
    try {
        await axios.delete(`${API_URL}/${id}`)

        const deleteTodo = document.querySelector(`[todo-id='${id}']`)
        if(deleteTodo)
            deleteTodo.remove()
                

    } catch (error) {
        console.error('error deleting todo: ', error    )
    }
}