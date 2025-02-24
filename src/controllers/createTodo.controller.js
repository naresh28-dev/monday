const Todo = require('../models/Todo');

let createTodo =async  (req, res) => {
    try{
        let {title,description}=req.body;
        if(!title || !description){
            return res.status(400).json({error:"All fields are required"});
        }
        let todo = new Todo({
            title,
            description
        });
        await todo.save();
        return res.status(201).json({message:"Todo created successfully",todo});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:"Internal server error"});
    }
}

module.exports = createTodo;