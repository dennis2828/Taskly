// Modals
const createModal = document.querySelector("#create-todo-modal");
const createModalContent = document.querySelector("#create-modal-content");
const closeCreateModal = document.querySelector("#close-create-todo-modal");
const openModal = document.querySelector("#open-modal");

// Form Elements
const createTodoForm = document.querySelector("#create-todo-form");
const todoInput = document.querySelector("#todo-input");


// Event Listeners

openModal.addEventListener("click",()=>{
    createModal.classList.remove("hidden");
    createModal.classList.add("flex");

    setTimeout(()=>{
        createModal.classList.add("bg-black/50");
        createModalContent.classList.remove("hidden");
    }, 90);

    return () =>{
        openModal.removeEventListener();
    }
});

closeCreateModal.addEventListener("click",()=>{
    createModal.classList.remove("bg-black/50");

    setTimeout(()=>{
        createModal.classList.add("hidden");
        createModal.classList.remove("flex");
        createModalContent.classList.add("hidden");
    }, 90);

    return () =>{
        closeCreateModal.removeEventListener();
    }
});

createModal.addEventListener("submit",(e)=>{
    e.preventDefault();

    const todoName = todoInput.value;

    //todo validation
});