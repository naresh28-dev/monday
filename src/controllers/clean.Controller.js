
const Todo = require('../models/Todo');

const clean = async (req, res) => {
    try {
        await Todo.deleteMany({});
        return res.status(200).json({ message: "All todos deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = clean;