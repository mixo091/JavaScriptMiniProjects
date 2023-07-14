const list = document.getElementById('list');
const form = document.getElementById('form');
const todo = document.getElementById('todo');

let todos = [];

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos(todos);
}


function doneTodo(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            todo.done = !todo.done;
        }
        return todo;
    })
    displayTodos(todos);
}


function displayTodos(todos) {
    list.innerHTML = "";
    todos.forEach((todo) => {

        let todoElement = document.createElement("div");
        todoElement.classList.add("todo");
        if (todo.done) {
            todoElement.classList.toggle("done");
        }

        todoElement.innerHTML = ` ${todo.todo}<div class="buttons" >
        <button class="delete-btn" onclick="removeTodo(${todo.id})">x</button>  
        <button class="done-btn" onclick="doneTodo(${todo.id})">o</button></div>`

        list.appendChild(todoElement)
    })

}

function addTodo(e) {
    e.preventDefault();

    //Create new todo.
    const new_todo = {
        id: generateID(),
        todo: todo.value,
        done: false,
    }

    todos.push(new_todo);
    displayTodos(todos);
    console.log(todos)


}



form.addEventListener('submit', addTodo);