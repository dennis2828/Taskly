function todoInstance(name) {
    return {id: generateUniqueId(), name, isChecked: false ,createdAt: Date.now()};
}

function updateTodos(newTodos) {
    if(localStorage) {
        localStorage.setItem("taskly-todos",JSON.stringify(newTodos));
    }
}

function deleteTodo(id) {
    const newTodos = getTodos().filter(todo=>todo.id!==id) || [];

    if(localStorage){
        const deletedTodo = getTodos().filter(todo=>todo.id==id);
        console.log(deletedTodo[0]);
        

        if(localStorage.getItem("taskly-deletedTodos")) {
            const deletedTodos = JSON.parse(localStorage.getItem("taskly-deletedTodos"));

            localStorage.setItem("taskly-deletedTodos",JSON.stringify([deletedTodo[0],...deletedTodos]));
            
        } else {
            localStorage.setItem("taskly-deletedTodos",JSON.stringify([deletedTodo[0]]));
        }
    }

    updateTodos(newTodos);

}   

function checkTodo(id) {
    const todo = document.querySelector(`#${id}`);

    if(todo) {
        let updatedTodos = getTodos();

        if(todo.classList.contains("checkedTodo")){
            todo.classList.remove("checkedTodo");
            todo.classList.add("hover:bg-gray-100")

            updatedTodos = updatedTodos.map(todo=>{
                if(todo.id===id) return {...todo, isChecked: false};
                
                return todo;
            });

        }
        else {
            todo.classList.remove("hover:bg-gray-100")
            todo.classList.add("checkedTodo");

            updatedTodos = updatedTodos.map(todo=>{
                if(todo.id===id) return {...todo, isChecked: true};
                
                return todo;
            });   

        }
        updateTodos(updatedTodos);
    }
}

function getTodos() {
    if(localStorage){
        if(localStorage.getItem("taskly-todos")) {
            const todos = JSON.parse(localStorage.getItem("taskly-todos"));
            
            return todos.sort((a, b) => b.createdAt - a.createdAt);
        } else {
            localStorage.setItem("taskly-todos",JSON.stringify([]));

            return [];
        }
    }
    return [];
}

function getDeletedTodos() {
    if(localStorage){
        if(localStorage.getItem("taskly-deletedTodos")) {
            const todos = JSON.parse(localStorage.getItem("taskly-deletedTodos"));
            
            return todos.sort((a, b) => b.createdAt - a.createdAt);
        } else {
            localStorage.setItem("taskly-deletedTodos",JSON.stringify([]));

            return [];
        }
    }
    return [];
}

function generateUniqueId() {
    return 'taskly-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function getTimeAgo(createdAt) {
    const now = Date.now();
    const diff = now - createdAt;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) {
        return 'now';
    } else if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 7) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
}

export {
    todoInstance,
    updateTodos,
    deleteTodo,
    checkTodo,
    getTimeAgo,
    getTodos,
    getDeletedTodos,
}