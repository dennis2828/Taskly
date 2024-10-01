import { initializeUI, todos } from "./index.js";

function todoInstance(name) {
    return {id: generateUniqueId(), name, createdAt: Date.now()};
}

function updateTodos(todos) {
    if(localStorage) {
        localStorage.setItem("taskly-todos",JSON.stringify(todos));
    }
}

function deleteTodo(id) {
    const newTodos = todos.filter(todo=>todo.id!==id) || [];

    updateTodos(newTodos);
    initializeUI();
}

function initializeTodos() {
    if(localStorage){
        if(localStorage.getItem("taskly-todos")) {
            const todos = JSON.parse(localStorage.getItem("taskly-todos"));
            
            return todos;
        } else {
            localStorage.setItem("taskly-todos",JSON.stringify([]));

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
    getTimeAgo,
    initializeTodos,
}