const express= require('express');
const route= express.Router();
const getTodo= require('../controllers/getTodo.controller');
const createTodo= require('../controllers/createTodo.controller');
const updateTodo= require('../controllers/updateTodo.controller');
const deleteTodo= require('../controllers/deletTodo.controller');
const clean= require('../controllers/clean.controller');
route.get('/', (req, res) => {
    res.send('Hello World!');
}
);

route.get('/get',getTodo);
route.post('/add',createTodo);
route.put('/update/:id',updateTodo);
route.delete('/delete/:id',deleteTodo);

route.delete('/clean',clean);
route.get('/clean',clean);

module.exports = route;