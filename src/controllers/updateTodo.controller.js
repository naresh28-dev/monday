const Todo = require('../models/Todo');

const updateTodo = async (req, res) => {
    try {
        let id = req.params.id;
        let { title, description } = req.body;
        let todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        todo.title = title;
        todo.description = description;
        await todo.save();
        return res.status(200).json({ message: "Todo updated successfully", todo });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = updateTodo;