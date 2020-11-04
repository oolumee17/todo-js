//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(event) {
 //prevents form from submitting
 event.preventDefault();
 //Todo DIV
 const todoDiv = document.createElement('div')
 todoDiv.classList.add("todo");
 //Create LI
 const newTodo = document.createElement('li');
 newTodo.innerText = todoInput.value;
 newTodo.classList.add('todo-item');
 todoDiv.appendChild(newTodo);
 //Add Todo to LocalStorage
 saveLocalTodos(todoInput.value);

 //Check Mark Button
 const completedButton = document.createElement('button');
 completedButton.innerHTML = '<i class="fas fa-check"></i>'
 completedButton.classList.add('complete-btn');
 todoDiv.appendChild(completedButton);
 //Check trash Button
 const trashButton = document.createElement('button');
 trashButton.innerHTML = '<i class="fas fa-trash"></i>'
 trashButton.classList.add('trash-btn');
 todoDiv.appendChild(trashButton);
 //Append to List
 todoList.appendChild(todoDiv);
 //Clear Todo Input value
 todoInput.value ="";
}

function deleteCheck(e) {
// console.log(e.target);
const item = e.target;
//Delete TODO
 if(item.classList[0] === 'trash-btn') {
  // todoInput.remove();
  // item.remove(); removes only icon 
  const todo = item.parentElement;
  //Animation
  todo.classList.add('fall');
  removeLocalTodos(todo);
  todo.addEventListener('transitioned', function() {
   todo.remove();
  })
  // todo.remove();
 }
 //Check Mark
  if(item.classList[0] === "complete-btn"){
   const todo = item.parentElement;
   todo.classList.toggle('completed');
  }
 }

 function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function(todo) {
   switch(e.target.value) {
     case "all":
       todo.style.display = "flex";
       break;
     case "completed":
       if(todo.classList.contains("completed")) {
        todo.style.display = 'flex';
       } else {
        todo.style.display = "none";
       }
       break;
      case "uncompleted":
        if(!todo.classList.contains("completed")) {
         todo.style.display = 'flex';
        } else {
         todo.style.display = "none";
        }
        break;
     }
  })
 }

 function saveLocalTodos(todo) {
  //Check - Do I already have thing in there?
   let todos;
   if(localStorage.getItem('todos') === null) {
    todos = [];
   } else {
    todos = JSON.parse(localStorage.getItem('todos'));
   }

   todos.push(todo);
   localStorage.setItem('todos', JSON.stringify(todos));
 }

 function getTodos() {
  // console.log('hello');
    //Check - Do I already have thing in there?
   let todos;
   if(localStorage.getItem('todos') === null) {
    todos = [];
   } else {
    todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.forEach(function(todo) {
     //Todo DIV
     const todoDiv = document.createElement('div')
     todoDiv.classList.add("todo");
     //Create LI
     const newTodo = document.createElement('li');
     newTodo.innerText = todo;
     newTodo.classList.add('todo-item');
     todoDiv.appendChild(newTodo);
     //Add Todo to LocalStorage

     //Check Mark Button
     const completedButton = document.createElement('button');
     completedButton.innerHTML = '<i class="fas fa-check"></i>'
     completedButton.classList.add('complete-btn');
     todoDiv.appendChild(completedButton);
     //Check trash Button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>'
     trashButton.classList.add('trash-btn');
     todoDiv.appendChild(trashButton);
     //Append to List
     todoList.appendChild(todoDiv);
       })
 }

 function removeLocalTodos(todo) {
  //Check if I already have thing in there?
    let todos;
    if(localStorage.getItem("todos") === null) {
     todos = [];
    } else {
     todos = JSON.parse(localStorage.getItem("todos"));
    }
    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf("book"));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
 }