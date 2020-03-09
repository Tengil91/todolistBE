let express = require('express');
let app = express();
let cors = require('cors');
bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.send({todos});
});

app.post('/todos', (req, res) => {
    if(req.body.remove){
        if(req.body.id || req.body.id === 0){
            let index = todos.findIndex(todo => (todo.id === req.body.id));
            todos.splice(index, 1);
        } else {
            todos = [];
        }
    }
    else if(req.body.completed){
        if(req.body.id || req.body.id === 0){
            let index = todos.findIndex(todo => (todo.id === req.body.id));
            todos[index].completed = true;
        } else {
            todos.forEach(todo => todo.completed = true);
        }
    }
    else if(req.body.task){
        let todo = {
            completed: false,
            id: todos.length,
            task: req.body.task
        }
        todos.push(todo);
    }
    res.send({todos});
});

app.listen(4201);