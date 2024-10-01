import { todoInstance, updateTodos, getTodos, deleteTodo, getTimeAgo } from "./todo.js";

// Modals
const createModal = document.querySelector("#create-todo-modal");
const createModalContent = document.querySelector("#create-modal-content");
const closeCreateModalButton = document.querySelector("#close-create-todo-modal");
const openModalButton = document.querySelector("#open-modal");

// Todo
const createTodoForm = document.querySelector("#create-todo-form");
const todoInput = document.querySelector("#todo-input");
const searchTodoInput = document.querySelector("#search-todo-input");
const todoArea = document.querySelector("#todo-area");

// Initial todos
window.deleteTodo = deleteTodo;
window.initializeUI = initializeUI;
window.getTodos = getTodos;

export let todos = getTodos();
initializeUI(todos);


// Event Listeners
openModalButton.addEventListener("click",()=>{
    createModal.classList.remove("hidden");
    createModal.classList.add("flex");

    setTimeout(()=>{
        createModal.classList.add("bg-black/50");
        createModalContent.classList.remove("hidden");
    }, 90);

});

closeCreateModalButton.addEventListener("click",()=>{
    createModal.classList.remove("bg-black/50");

    setTimeout(()=>{
        createModal.classList.add("hidden");
        createModal.classList.remove("flex");
        createModalContent.classList.add("hidden");
    }, 90);
    
});

createTodoForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const todoName = todoInput.value;
    //todo validation

    todoInput.value = "";

    const todo = todoInstance(todoName);
    todos = getTodos();
    const newTodos = [todo, ...todos];

    updateTodos(newTodos);
    initializeUI(newTodos);
    
});

searchTodoInput.addEventListener("input", (e)=>{
    const searchedName = e.currentTarget.value.trim();

    setTimeout(()=>{
        const results = getTodos().filter(todo=>todo.name.includes(searchedName));
        initializeUI(results || []);
    },500);
})


export function initializeUI(todos) {
    //update UI

    if(todos.length > 0) {
        todoArea.innerHTML = "";
        todos.map(todo=>{
            return (todoArea.innerHTML +=
                `
               <div id=${todo.id} class="p-2 w-full flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-md duration-100">
                    <div>
                        <div class="flex items-center gap-3">
                            <div class="w-[10px] h-[10px] rounded-full bg-darkBlue"></div>
                            <p class="tracking-wide font-medium">${todo.name}</p>
                        </div>
                        <p class="text-sm text-gray-500 ml-6">${getTimeAgo(todo.createdAt)}</p>
                    </div>
                    <div class="flex items-center gap-2">
                    <input type="checkbox" class="cursor-pointer" />
                      <svg onclick="deleteTodo('${todo.id}'); initializeUI(getTodos());" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash text-gray-500 hover:text-red-500"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </div>
                </div>
                `
            )
        });
    } else {
        todoArea.innerHTML = `<p class="text-gray-500 text-center text-sm mt-2">Todo list is empty</p>`;
    }
    
}