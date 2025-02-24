const Todo = require('../models/Todo');
const getTodo = async (req, res) => {
    try {
        let todos = await Todo.find();
        return res.status(200).json({ todos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getTodo;