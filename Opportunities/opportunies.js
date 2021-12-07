// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');

// array which stores every todos
let oppo_list = [];

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
    // prevent the page from reloading when submitting the form
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function with input box current value
});

// function to add todo
function addTodo(item) {
    console.log(item);
    // if item is not empty
    if (item !== '') {
        // make a todo object, which has id, name, and completed properties
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        // then add it to todos array
        oppo_list.push(todo);
        addToLocalStorage(oppo_list); // then store it in localStorage

        // finally clear the input box value
        todoInput.value = '';
    }
}

// function to render given todos to screen
function renderTodos(oppo_list) {
    // clear everything inside <ul> with class=todo-items
    todoItemsList.innerHTML = '';

    // run through each item inside todos
    oppo_list.forEach(function(item) {

        // check if the item is completed
        const checked = item.completed ? 'checked' : null;

        // make a <li> element and fill it
        // <li> </li>
        const li = document.createElement('li');
        // <li class="item"> </li>
        li.setAttribute('class', 'item');
        // <li class="item" data-key="20200708"> </li>
        li.setAttribute('data-key', item.id);
        /* <li class="item" data-key="20200708"> 
              <input type="checkbox" class="checkbox">
              Go to Gym
              <button class="delete-button">X</button>
            </li> */
        // if item is completed, then add a class to <li> called 'checked', which will add line-through style
        // if (item.completed === true) {
        //     li.classList.add('checked');
        // }

        li.innerHTML = `
      
      ${item.name}
      <button class="delete-button">X</button>
    `;
        // finally add the <li> to the <ul>
        todoItemsList.append(li);
    });

}

// function to add todos to local storage
function addToLocalStorage(oppo_list) {
    // conver the array to string then store it.
    localStorage.setItem('Opportunies List', JSON.stringify(oppo_list));
    // render them to screen
    renderTodos(oppo_list);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('Opportunies List');
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        oppo_list = JSON.parse(reference);
        renderTodos(oppo_list);
    }
}

// toggle the value to completed and not completed
function toggle(id) {
    oppo_list.forEach(function(item) {
        // use == not ===, because here types are different. One is number and other is string
        if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(oppo_list);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
    // filters out the <li> with the id and updates the todos array
    oppo_list = oppo_list.filter(function(item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    });

    // update the localStorage
    addToLocalStorage(oppo_list);
}

// initially get everything from localStorage
getFromLocalStorage();
console.log(todoItemsList);
// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    // check if that is a delete-button
    if (event.target.classList.contains('delete-button')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});