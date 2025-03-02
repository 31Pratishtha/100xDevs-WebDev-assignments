let todos = []; // in memory space

// todo = [
//     {
//         id: 1,
//         task: "abcd"
//     },
//     {
//         id: 2,
//         task: "qwerty"
//     },
// ]

export async function getAllTodo(req, res, next) {
    try {
        res.json(todos)
    } catch (error) {
        res.status(500).send({error: "Error fetching todos"})
    }
}

export async function createTodo(req, res, next) {
    try {
        const task = req.body.task
        
        if (!task) return res.status(400).json({error: "Task is required"})


        const newTodo = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            task: task
        }
        
        todos.push(newTodo)

        res.status(201).json(newTodo)
    } catch (error) {
        res.status(500).json({error: "Error creating todos " + error.message})

    }
}

export async function updateTodo(req, res, next) {
    const { id } = req.params
    const { task } = req.body

    if (!task) return res.status(400).json(error, "Task is required")

    const todoIndex = todos.findIndex((t) => t.id === id)

    if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], task }
        res.json(todos[todoIndex])
    }
    else {
        res.status(404).json(error, "Todo not found")
    }
}

export async function deleteTodo(req, res, next) {
    const { id } = req.params

    console.log('id:  ', id);
    

    const todoIndex = todos.find((t) => t.id === id)

    if (todoIndex === -1)
        return res.status(404).json({ message: "Todo Not Found" })

    todos.splice(todoIndex, 1)
    res.status(204).json({ message: "Todo Deleted" })

}

export async function searchTodo(req, res, next) {
    //  write here
}