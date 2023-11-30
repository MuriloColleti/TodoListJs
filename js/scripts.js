// Seleção De Elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList= document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const filter = document.querySelector("#filter")

let oldInputValue;

let todoListValues = []

let todoFilters = []

function renderTodos(todosArray) {
    todoList.innerHTML = "";

    todosArray.forEach((todo) => createTodoElement(todo.text))
}

function createTodoElement(todoText) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = todoText;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

window.onload = (event) => {

    const todosInLocalStorage = localStorage.getItem('todos')

    if(!todosInLocalStorage) {
       return renderTodos(todoListValues)
    }

    const todosData = JSON.parse(todosInLocalStorage)

    todoListValues = todosData

    return renderTodos(todoListValues)

}


// Funçoes 
const saveTodo = (text) => {

    todoListValues.push({text, status: "todo"})

    localStorage.setItem('todos', JSON.stringify(todoListValues))

    renderTodos(todoListValues)
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

function updateTodo (text) {

    console.log(todoListValues);

    const todoIndex = todoListValues.findIndex((todo) => todo.text === oldInputValue)

    console.log(todoIndex, todoListValues[todoIndex], text);

    todoListValues[todoIndex].text = text

    console.log(todoListValues[todoIndex]);

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });

    localStorage.setItem('todos', JSON.stringify(todoListValues))

}

function todoFilters(text) {

    

    if(!text.trim()){
        return renderTodos(todoListValues);
    }
}





// Eventos

todoForm.addEventListener("submit", (e) => {
    
    e.preventDefault();

    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e) =>{

    const targetEl = e.target;
    const parenteEl = targetEl.closest("div");
    let todoTitle;

    if(parenteEl && parenteEl.querySelector("h3")){
        todoTitle = parenteEl.querySelector("h3").innerText || "";
    }

    if(targetEl.classList.contains("finish-todo")) {

        parenteEl.classList.toggle("done");
    
    }

    if (targetEl.classList.contains("remove-todo")) {
        parenteEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    localStorage.setItem('todos', JSON.stringify(todoListValues))

});

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms();

});







