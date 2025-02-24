const Todo = require('../models/Todo');

let deleteTodo = async (req, res) => {
    try {
        let id = req.params.id;
        let todo = await Todo.findByIdAndDelete(id); // Use findByIdAndDelete instead of remove
        
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        
        return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = deleteTodo;
