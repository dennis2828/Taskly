import { todoInstance, updateTodos, getTodos, deleteTodo, checkTodo, getTimeAgo, getDeletedTodos } from "./todo.js";

// Modals
const createModal = document.querySelector("#create-todo-modal");
const createModalContent = document.querySelector("#create-modal-content");
const closeCreateModalButton = document.querySelector("#close-create-todo-modal");
const openModalButton = document.querySelector("#open-modal");

const historyTodoModal = document.querySelector("#history-todo-modal");
const openHistoryModal = document.querySelector("#open-history-modal");
const historyModalContent = document.querySelector("#history-modal-content");
const closeHistoryModalButton = document.querySelector("#close-history-todo-modal");


// Todo
const createTodoForm = document.querySelector("#create-todo-form");
const todoInput = document.querySelector("#todo-input");
const searchTodoInput = document.querySelector("#search-todo-input");
const todoArea = document.querySelector("#todo-area");
const todosLeft = document.querySelector("#todosLeft");
const html = document.documentElement;

// Other Buttons
const sortAlphabetical = document.querySelector("#sortAlphabetical");
const lightMode = document.querySelector(".lightMode");
const nightMode = document.querySelector(".nightMode");

// Initial todos
window.deleteTodo = deleteTodo;
window.checkTodo = checkTodo;
window.initializeUI = initializeUI;
window.getTodos = getTodos;

export let todos = getTodos();
initializeUI(todos);


// Event Listeners

sortAlphabetical.addEventListener('click',()=>{
    if(getTodos().length>0){

    const sortedTodos = getTodos().sort((a, b) => a.name.localeCompare(b.name));

    console.log(sortedTodos);
    
    todoArea.innerHTML = "";
        sortedTodos.map(todo=>{
            return (todoArea.innerHTML +=
                `
               <div id=${todo.id} class="p-2 w-full flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-darkGray rounded-md duration-100 ${todo.isChecked ? "checkedTodo":null}">
                    <div>
                        <div class="flex items-center gap-3">
                            <div class="w-[10px] h-[10px] rounded-full bg-darkBlue"></div>
                            <p class="tracking-wide font-medium dark:text-white">${todo.name}</p>
                        </div>
                        <p class="text-sm text-gray-500 ml-6">${getTimeAgo(todo.createdAt)}</p>
                    </div>
                    <div class="flex items-center gap-2">
                    <input onclick="checkTodo('${todo.id}');" type="checkbox" ${todo.isChecked && "checked"} class="cursor-pointer" />
                      <svg onclick="deleteTodo('${todo.id}'); initializeUI(getTodos());" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash text-gray-500 hover:text-red-500"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </div>
                </div>
                `
            )
        });
    }
});
if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
    lightMode.classList.add("hidden");
    nightMode.classList.remove("hidden");
} else {
    html.classList.remove("dark");
    lightMode.classList.remove("hidden");
    nightMode.classList.add("hidden");
}

// Event Listeners
lightMode.addEventListener("click", () => {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    lightMode.classList.add("hidden");
    nightMode.classList.remove("hidden");
});

nightMode.addEventListener("click", () => {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    nightMode.classList.add("hidden");
    lightMode.classList.remove("hidden");
});


//create modal
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
    if(todoName.trim()==="") {
        todoInput.classList.add("border-red-500 hidden ");
        return;
    }

    todoInput.value = "";

    const todo = todoInstance(todoName);
    todos = getTodos();
    const newTodos = [todo, ...todos];

    updateTodos(newTodos);
    initializeUI(newTodos);
    
});


//history modal

openHistoryModal.addEventListener("click",()=>{
    historyTodoModal.classList.remove("hidden");
    historyTodoModal.classList.add("flex");

    const historyTodoContent = document.querySelector("#history-todo-deleted");
    const deletedTodos = getDeletedTodos();


    if(deletedTodos.length > 0) {
        historyTodoContent.innerHTML = "";
        deletedTodos.map(todo=>{
            return (historyTodoContent.innerHTML +=
                `
               <div id=${todo.id} class="p-2 w-full flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-md duration-100 ${todo.isChecked ? "checkedTodo":null}">
                    <div>
                        <div class="flex items-center gap-3">
                            <div class="w-[10px] h-[10px] rounded-full bg-red-500"></div>
                            <p class="tracking-wide font-medium dark:text-white">${todo.name}</p>
                        </div>
                        <p class="text-sm text-gray-500 ml-6">${getTimeAgo(todo.createdAt)}</p>
                    </div>
                </div>
                `
            )
        });
    } else {
        historyTodoContent.innerHTML = `<p class="text-gray-500 text-center text-sm mt-2">No history</p>`;
    }

    setTimeout(()=>{
        historyTodoModal.classList.add("bg-black/50");
        historyModalContent.classList.remove("hidden");
    }, 90);

});

closeHistoryModalButton.addEventListener("click",()=>{
    historyTodoModal.classList.remove("bg-black/50");

    setTimeout(()=>{
        historyTodoModal.classList.add("hidden");
        historyTodoModal.classList.remove("flex");
        historyModalContent.classList.add("hidden");
    }, 90);
    
});




searchTodoInput.addEventListener("input", (e)=>{
    console.log(e.currentTarget.value);
    
    const searchedName = e.currentTarget.value.trim();

    setTimeout(()=>{
        const results = getTodos().filter(todo=>todo.name.includes(searchedName));
        initializeUI(results || []);
    },500);
})


function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long' };
    const day = new Intl.DateTimeFormat('en-US', options).format(now);
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    console.log(hours, minutes);
    
    document.getElementById('currentDay').textContent = `${day}, `;
    document.getElementById('currentHour').textContent=`${hours}:${minutes}`;
}



export function remainingTodos(){
    const remaining = getTodos().filter(todo=>!todo.isChecked).length || 0;
    todosLeft.textContent=`${remaining} todos left`;
}

export function initializeUI(todos) {
    //update UI
    remainingTodos();
    updateDateTime(); // Initial call
    setInterval(updateDateTime, 1000 * 60);


    if(todos.length > 0) {
        todoArea.innerHTML = "";
        todos.map(todo=>{
            return (todoArea.innerHTML +=
                `
               <div id=${todo.id} class="p-2 w-full flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-darkGray rounded-md duration-100 ${todo.isChecked ? "checkedTodo":null}">
                    <div>
                        <div class="flex items-center gap-3">
                            <div class="w-[10px] h-[10px] rounded-full bg-darkBlue"></div>
                            <p class="tracking-wide font-medium dark:text-white">${todo.name}</p>
                        </div>
                        <p class="text-sm text-gray-500 ml-6">${getTimeAgo(todo.createdAt)}</p>
                    </div>
                    <div class="flex items-center gap-2">
                    <input onclick="checkTodo('${todo.id}');" type="checkbox" ${todo.isChecked && "checked"} class="cursor-pointer" />
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