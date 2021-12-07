// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
const todoInputq = document.querySelector('.todo-input-q');
const todoInputs = document.querySelector('.todo-input-s');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');

// array which stores every todos
let todos = [];

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
    // prevent the page from reloading when submitting the form
    event.preventDefault();
    addTodo(todoInput.value, todoInputq.value, todoInputs.value); // call addTodo function with input box current value
});


// function to add todo
function addTodo(item, item2, item3) {
    // console.log(item, item2, item3);
    // if item is not empty
    if (item !== '' && item2 !== '' && item3 !== '') {
        // make a todo object, which has id, name, and completed properties
        const todo = {
            id: Date.now(),
            name: item,
            ques: item2,
            site: item3,
            completed: false
        };

        // then add it to todos array
        todos.push(todo);
        addToLocalStorage(todos); // then store it in localStorage


    }
    // finally clear the input box value
    todoInput.value = '';
    todoInputq.value = '';
    todoInputs.value = '';
}

// function to render given todos to screen
function renderTodos(todos) {
    // clear everything inside <ul> with class=todo-items
    todoItemsList.innerHTML = '';

    // run through each item inside todos
    todos.forEach(function(item) {

        // check if the item is completed
        const checked = item.completed ? 'checked' : null;

        // make a <li> element and fill it

        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const a = document.createElement('a');
        // <li class="item"> </li>
        tr.setAttribute('class', 'item');
        // <li class="item" data-key="20200708"> </li>
        td1.setAttribute('data-key', item.id);
        td1.innerText = item.name;
        td2.setAttribute('data-key', item.id);

        a.setAttribute('href', item.site);
        a.innerText = item.ques;
        td3.setAttribute('data-key', item.id);
        const input = document.createElement('input');

        // if item is completed, then add a class 'checked'
        td3.innerHTML = ' <button class="delete-button">X</button>'
        input.type = 'checkbox';
        if (item.completed === true) {
            input.checked = true;
        }
        // finally add the <li> to the <ul>
        todoItemsList.appendChild(tr);
        tr.appendChild(td1)
        tr.appendChild(td2)
        td2.appendChild(a)
        tr.appendChild(td3);
        td3.appendChild(input);

    });

}

// function to add todos to local storage
function addToLocalStorage(todos) {
    // conver the array to string then store it.
    localStorage.setItem('Questions', JSON.stringify(todos));
    // render them to screen
    renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('Questions');
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// toggle the value to completed and not completed
function toggle2(id) {
    todos.forEach(function(item) {
        // use == not ===, because here types are different. One is number and other is string
        if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
    // filters out the <li> with the id and updates the todos array
    todos = todos.filter(function(item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    });

    // update the localStorage
    addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();
// console.log(todoItemsList);
// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the state
        toggle2(event.target.parentElement.getAttribute('data-key'));
    }

    // check if that is a delete-button
    if (event.target.classList.contains('delete-button')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});




// var checklist = [448];





// function myFunction(x) {
//     // Get the checkbox
//     var checkBox = document.getElementsByClassName("myCheck");
//     // console.log("Row index is: " + x.rowIndex);

//     console.log(x);

//     // If the checkbox is checked, display the output text
//     if (checkBox.checked == true) {
//         // console.log("Row index is: " + checkBox.rowIndex);
//         // addcheck(true, );
//     }
// }

// function addTolist(item, cellid) {
//     // if item is not empty
//     if (item !== 'false') {
//         // make a todo object, which has id, name, and completed properties
//         const todo = {
//             date: Date.now(),
//             id: cellid,
//             ischecked: item
//         };

//         // then add it to todos array
//         checklist[id] = todo;
//         LocalStorage(checklist); // then store it in localStorage

//     }
// }
// // function to add todos to local storage
// function LocalStorage(checklist) {
//     // conver the array to string then store it.
//     localStorage.setItem('checklist', JSON.stringify(checklist));
//     // render them to screen
//     renderlist(checklist);
// }
// var mybody = document.getElementById("mytable").querySelectorAll('tr');
// mybody.forEach(function(el) {
//     var child =
// })
// var i = 1;
// var j = 1
// const tableRow = document.getElementById("mytable").querySelectorAll('tr');
// tableRow.forEach(function(el) {
//     // tableRow.onclick = function() { myFunction(this) };
//     const td = document.createElement('td');
//     // td.innerHTML = '<input type="checkbox" class="myCheck" ></td>';
//     // td.onclick = myFunction(this);
//     td.id = `${i++}`;
//     const input = document.createElement('input');
//     input.type = 'checkbox';
//     input.className = 'myCheck';
//     input.onclick = function() {
//         myFunction(td.id);
//     };
//     td.appendChild(input);
//     el.appendChild(td);

//     const td2 = document.createElement('td');
//     // td2.innerHTML = `(row #${i++})`;
//     td2.className = 'count';
//     td2.innerHTML = `${j++}`;


//     el.appendChild(td2);

// })


// var table = document.getElementsByClassName('tableizer-table');
// var x = window.matchMedia("(max-width: 892px)")
// for (var i = 0; i < table.rows.length(); i++) {
//     var firstCol = table.rows[i].cells[0]; //first column
//     if (x.matches) {
//         firstCol.style.display = ('none');
//     }

//     // firstCol.style.color = 'red'; // or anything you want to do with first col
// }

// function savefunction() {
//     var checkboxes = document.querySelectorAll("#myCheck");

//     for (var i = 0; i < checkboxes.length; i += 1) {
//         if (checkboxes[i].checked) {
//             checked[checkbox[i].name] = checkbox[i].value;
//         }
//         // <-- no need for else, because we simply override
//     }
//     localStorage.setItem('checked_boxes', JSON.stringify(checked)); // <-- localStorage can only store `
//     String ` values
// }   String ` values
// }


// function myFunction(x) {
//     // Get the checkbox
//     var checkBox = document.getElementsByClassName("myCheck");
//     // console.log("Row index is: " + x.rowIndex);

//     console.log(x);

//     // If the checkbox is checked, display the output text
//     if (checkBox.checked == true) {
//         // console.log("Row index is: " + checkBox.rowIndex);
//         // addcheck(true, );
//     }
// }
// Instead of getting the table bodies, I get only the table 
// rows inside the tbody elements.
// var c = document.querySelectorAll('tbody tr');
var j = document.querySelectorAll('tbody');
var c = j[1].querySelectorAll('tr');
// console.log(j);
// console.log(c);

// Here I check if definitely the above query found any values.
if (c) {
    // Then I do the itteration to the found tr elements
    for (i = 0; i < c.length; i++) {
        // And here I set the ID the same way you did in your example
        c[i].setAttribute('id', 'tr' + i);
    }
}



















// var i = 1;
// var j = 1
// const tableRow = document.getElementById("mytable").querySelectorAll('tr');
// tableRow.forEach(function(el) {
//     // tableRow.onclick = function() { myFunction(this) };
//     const td = document.createElement('td');
//     // td.innerHTML = '<input type="checkbox" class="myCheck" ></td>';
//     // td.onclick = myFunction(this);
//     td.id = `${i++}`;
//     const input = document.createElement('input');
//     input.type = 'checkbox';
//     input.className = 'myCheck';
//     input.onclick = function() {
//         myFunction(td.id);
//         addTolist(true, td.id);
//     };
//     td.appendChild(input);
//     el.appendChild(td);

//     // const td2 = document.createElement('td');
//     // // td2.innerHTML = `(row #${i++})`;
//     // td2.className = 'count';
//     // td2.innerHTML = `${j++}`;


//     // el.appendChild(td2);

// })
// let checklist = [];

// // function addTolist(value, rowindex) {
// //     // if item is not empty
// //     if (value !== 'false') {
// //         // make a todo object, which has id, name, and completed properties
// //         const todo = {
// //             date: Date.now(),
// //             id: rowindex,
// //             ischecked: value
// //         };

// //         // then add it to todos array
// //         checklist[rowindex - 1] = todo;
// //         addToLocalStorage(checklist); // then store it in localStorage

// //     }
// // }

// // // function to add todos to local storage
// function addToLocalStorage(checklist) {
//     // conver the array to string then store it.
//     localStorage.setItem('checklist', JSON.stringify(checklist));
//     // render them to screen
//     renderTodos(checklist);
// }

// // // function to render given todos to screen
// // // function renderTodos(checklist) {
// // //     checklist.forEach(function(item) {
// // //         const box = document.getElementsByClassName('myCheck');
// // //         // tableRow.onclick = function() { myFunction(this) };

// // //         if (item.ischecked == true) {
// // //             input.add('checked');
// // //         }
// // //         input.onclick = function() {
// // //             myFunction(td.id);
// // //             addTolist(true, td.id);
// // //         };



// // //     })

// // // }
// // // function helps to get everything from local storage
// // function getFromLocalStorage() {
// //     const reference = localStorage.getItem('checklist');
// //     // if reference exists
// //     if (reference) {
// //         // converts back to array and store it in todos array
// //         checklist = JSON.parse(reference);
// //         renderTodos(checklist);
// //     }
// // }
// // getFromLocalStorage();

// // function renderTodos(checklist) {

// //     checklist.forEach(function(item) {

// //     })




// // }


// // // let boxes = document.getElementById("mytable").getElementsByTagName('tr').length;
// // // console.log(boxes)

// // // function save() {
// // //     for (let i = 1; i <= boxes; i++) {
// // //         var checkbox = document.getElementById(String(i));
// // //         localStorage.setItem("checkbox" + String(i), checkbox.checked);
// // //     }
// // // }


let checklist = [];
// var boxes = document.getElementsByClassName('myCheck');

// function myFunction(x) {
//     // console.log("hello");

//     // var boxes = document.getElementsByClassName('myCheck');
//     // console.log(boxes);
//     // addToList(item, id);

// }
// addToList();

// function addToList() {
//     // if item is not empty

//     // make a todo object, which has id, name, and completed properties
//     const todo = {
//         id: Date.now(),
//         ischecked: false
//     };
//     const tableRow = document.getElementById("mytable").querySelectorAll('tr');
//     console.log(tableRow.length);
//     tableRow.forEach(function() {
//             checklist.push(todo);

//         } // then store it in localStorage

//     )
//     addToLocalStorage(checklist);
// }
LocalStorage();



// function to add todos to local storage
function addLocalStorage(checklist) {
    // conver the array to string then store it.
    localStorage.setItem('checklist', JSON.stringify(checklist));

}

function render(checklist) {

    checklist.forEach(list => {
        const td = document.createElement('td');
        td.id = 'td' + `${list.id}`;
        td.className = 'mylist'
        const input = document.createElement('input');
        if (checklist[list.id - 1].ischecked == true) {
            // document.getElementById(list.id).checked = true;
            // console.log(document.getElementsByClassName('myCheck'))
            input.checked = true;
        }
        input.type = 'checkbox';
        input.className = 'myCheck';
        input.id = list.id;
        // input.checked = true;
        // console.log(input.checked);
        // console.log(checklist[list.id - 1])
        // console.log(list.id)
        var myid = 'tr' + `${list.id -1}`;
        var rows = document.getElementById(`${myid}`);
        rows.appendChild(td);
        td.appendChild(input);


    })



    // console.log(document.getElementById('td' + `${1}`).childNodes[0]);
    // var ab = document.getElementById('td' + `${1}`).childNodes[0]
    // var k = 1;
    // const tableRow = document.getElementById("mytable").querySelectorAll('tr');
    // tableRow.forEach(box => {
    //     var myid = 'td' + `${k++}`;
    //     console.log(document.getElementById(`${myid}`).getElementsByClassName('myCheck')[0]);

    // })
    // for (let i = 1; i <= tableRow.length; i++) {
    //     var myid = 'td' + `${k++}`;
    //     console.log(document.getElementById(`${myid}`).getElementsByClassName('myCheck')[0]);
    // }

    // console.log(document.getElementsByClassName('mylist'))
    const list_items = document.getElementsByClassName('mylist')
        // console.log(list_items.length)
    for (let i = 0; i < list_items.length; i++) {
        list_items[i].addEventListener('click', function(event) {
            if (event.target.type === 'checkbox') {
                // toggle the state
                // toggle(event.target.parentElement.getAttribute('data-key'));
                // console.log(event.target.checked)
                // console.log(event.target.getAttribute('id'))
                toggle(event.target.getAttribute('id'));
            }
        });
    }








    // const tableRow = document.getElementById("mytable").querySelectorAll('tr');
    // tableRow.forEach(function(el) {
    //         const td = document.createElement('td');
    //         const input = document.createElement('input');
    //         input.type = 'checkbox';
    //         input.className = 'myCheck';

    //         const box = document.getElementsByClassName('myCheck')
    //         if (box.ischecked === true) {
    //             input.add('checked');
    //         }


    //         el.appendChild(td);
    //         td.appendChild(input);
    //     })
    // console.log(checklist);
    // checklist.forEach(function(item) {
    //     if (ischecked === true) {

    //         // input.add('checked');
    //     }

    // })
}

function LocalStorage() {
    const reference = localStorage.getItem('checklist');
    // console.log(reference);
    // if reference exists
    if (reference != null) {
        // converts back to array and store it in todos array
        checklist = JSON.parse(reference);
        // console.log(checklist);
        render(checklist);
    } else {
        // if item is not empty

        var i = 1;
        // console.log(document.getElementById("mytable"));
        var j = document.querySelectorAll('tbody');
        var tableRow = j[1].querySelectorAll('tr');
        // console.log(tableRow.length);
        tableRow.forEach(function() {
                // make a todo object, which has id, name, and completed properties
                const todo = {
                    id: `${i++}`,
                    ischecked: false
                };
                checklist.push(todo);

            } // then store it in localStorage

        );
        addLocalStorage(checklist);
        render(checklist);
    }

}

// initially get everything from localStorage


function toggle(id) {
    checklist.forEach(list => {
        // use == not ===, because here types are different. One is number and other is string
        if (list.id == id) {
            // toggle the value
            list.ischecked = !list.ischecked;
        }
    });

    addLocalStorage(checklist);

}
// var box = document.getElementsByClassName('myCheck')
// box.addEventListener('click', function(event) {
//     // check if the event is on checkbox
//     if (event.target.type === 'checkbox') {
//         // toggle the state
//         console.log(event);
//     }


// });




// function to render given todos to screen
// function renderTodos(checklist) {
//     // clear everything inside <ul> with class=todo-items
//     // todoItemsList.innerHTML = '';

//     // run through each item inside todos
//     checklist.forEach(function(item) {
//         // check if the item is completed
//         const checked = item.completed ? 'checked' : null;

//         // make a <li> element and fill it
//         // <li> </li>
//         const li = document.createElement('li');
//         // <li class="item"> </li>
//         li.setAttribute('class', 'item');
//         // <li class="item" data-key="20200708"> </li>
//         li.setAttribute('data-key', item.id);
//         /* <li class="item" data-key="20200708"> 
//               <input type="checkbox" class="checkbox">
//               Go to Gym
//               <button class="delete-button">X</button>
//             </li> */
//         // if item is completed, then add a class to <li> called 'checked', which will add line-through style
//         if (item.completed === true) {
//             li.classList.add('checked');
//         }

//         li.innerHTML = `
//   <input type="checkbox" class="checkbox" ${checked}>
//   ${item.name}
//   <button class="delete-button">X</button>
// `;
//         // finally add the <li> to the <ul>
//         todoItemsList.append(li);
//     });