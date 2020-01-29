import { Todo } from "./todo";
import { Project } from "./project";

//this function to hold the projects objects
let projectsArray = [];

const RenderProject = () => {

    /**
     * this function adds object of Project
     * @param name is the project name that we pass and we get it from the avlue input from the user
     */
    const addProject = (name) => {
        let newProject = Project(name);
        projectsArray.push(newProject);
    }

    /**
     * this dunction deletes an entire object at a specific index in the array
     * @param {*} index we pass it through depends on the e.target index
     */
    const deleteProject = (index) => {
        projectsArray.splice(index, 1);
        clearProjectsListUi();
        renderProjects();
    }

    /**
     * this function renders the array of projects 
     */
    const renderProjects = () => {
        projectsArray.forEach(element => {
            let index = projectsArray.indexOf(element);
            const deleteProjIcon = document.createElement('i');
            deleteProjIcon.classList.add('material-icons');
            deleteProjIcon.innerHTML = "delete";
            deleteProjIcon.setAttribute('data-delete-index', index);
            const deleteTd = document.createElement('td');
            deleteTd.classList.add('delete-button');
            deleteTd.appendChild(deleteProjIcon);


            const projNameTd = document.createElement('td');
            projNameTd.classList.add('project-name');
            projNameTd.innerHTML = projectsArray[index].name;
            projNameTd.setAttribute('data-info-index', index);

            const bulbProjIcon = document.createElement('i');
            bulbProjIcon.classList.add('material-icons');
            bulbProjIcon.innerHTML = "lightbulb_outline";
            const bulbTd = document.createElement('td');
            bulbTd.classList.add('project-icon');
            bulbTd.appendChild(bulbProjIcon);

            const projItemTr = document.createElement('tr');
            projItemTr.classList.add('project-item');
            projItemTr.appendChild(bulbTd);
            projItemTr.appendChild(projNameTd);
            projItemTr.appendChild(deleteTd);

            const projectsBody = document.getElementById('projects-body');
            projectsBody.appendChild(projItemTr);

        });
    }


    /**
     * this function adds a todo object inside a specific object's todos array
     * @param {*} project the index of the project inside the projectsArray
     * it's getting projectsArray[i]
     */
    const addTodo = (index) => {
        let todoName = document.getElementById('todo-input-name').value;
        let todoDescription = document.getElementById('todo-input-description').value;
        let todoDue = document.getElementById('todo-date').value;
        let priority = document.getElementById('priority').options[priority.selectedIndex].text;
        let isDone = false;


        let newTodo = Todo(todoName, todoDescription, todoDue, priority, isDone);
        projectsArray[index].todos.push(newTodo);
    }


    /**
     * this function render the todos on the proect object
     * @param {*} index it gets the index of the object
     * and gets into the array of objects todo and itterate over it
     * it requires an array of todos to itterate on projectsArray[i].todos
     */
    const renderTodo = (index) => {
        let collapse = 0;
        let arrayLength = projectsArray[index].todos.length;
        for (let i = 0; i < arrayLength; i++) {
            //Done Icon and its div creation
            let doneIcon = document.createElement('i');
            doneIcon.classList.add('material-icons');
            doneIcon.innerHTML = "done_all";
            let doneIconDiv = document.createElement('div');
            doneIconDiv.classList.add('.col-auto');
            doneIconDiv.setAttribute('id', 'todo-done');
            doneIconDiv.appendChild(doneIcon);
            //Label icon and its div creation
            let labelIcon = document.createElement('i');
            labelIcon.classList.add('material-icons');
            labelIcon.innerHTML = "label_outline";
            let labelIconDiv = document.createElement('div');
            labelIconDiv.classList.add('.col-auto');
            labelIconDiv.setAttribute('id', 'todo-label');
            labelIconDiv.appendChild(labelIcon);
            //the div container for done and label icons
            let doneRow = document.createElement('div');
            doneRow.classList.add('row');
            doneRow.setAttribute('id', 'done-row');
            doneRow.appendChild(doneIconDiv);
            doneRow.appendChild(labelIconDiv);
            //
            let todoName = document.createElement('p');
            todoName.innerHTML = projectsArray[index].todos[i].name
            let todoNameLink = document.createElement('a');
            todoNameLink.classList.add('collapsed');
            todoNameLink.classList.add('card-link');
            todoNameLink.setAttribute('data-toggle', 'collapse');
            todoNameLink.setAttribute('href', `collapse${collapse}`);
            todoNameLink.appendChild(todoName);
            //Edit Icon and its div creation
            let editIcon = document.createElement('i');
            editIcon.classList.add('material-icons');
            editIcon.innerHTML = "edit";
            let editIconDiv = document.createElement('div');
            editIconDiv.classList.add('.col-auto');
            editIconDiv.setAttribute('id', 'todo-edit');
            editIconDiv.appendChild(editIcon);
            //Delete icon and its div creation
            let deleteIcon = document.createElement('i');
            deleteIcon.classList.add('material-icons');
            deleteIcon.innerHTML = "delete";
            let deleteIconDiv = document.createElement('div');
            deleteIconDiv.classList.add('.col-auto');
            deleteIconDiv.setAttribute('id', 'todo-delete');
            deleteIconDiv.appendChild(deleteIcon);
            //the div container for edit and delete icons
            let editRow = document.createElement('div');
            editRow.classList.add('row');
            editRow.setAttribute('id', 'edit-row');
            editRow.appendChild(editIconDiv);
            editRow.appendChild(deleteIconDiv);
            //card header div to contain all above
            let cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.appendChild(doneRow);
            cardHeader.appendChild(todoNameLink);
            cardHeader.appendChild(editRow);

            //the card body contains the descretion
            let cardBodyText = document.createElement('div');
            cardBodyText.classList.add('card-body');
            cardBodyText.innerHTML = projectsArray[index].todos[i].descrition;
            //div that contains the card body
            let cardBody = document.createElement('div');
            cardBody.classList.add('collapse');
            cardBody.setAttribute('id', `collapse${collapse}`);
            collapse++;
            cardBody.setAttribute('data-parent', '#accordion');
            cardBody.appendChild(cardBodyText);
            //the card div that contains the card header and card body
            let card = document.createElement('div');
            card.classList.add('card');
            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            //div contains all the cards
            let cardsContainer = document.getElementById('accordion');
            cardsContainer.appendChild(card);

        };
    }

    /**
     * this function to render the selected project name
     * @param {*} index the index of the selected project
     */
    const renderSelectedProjectName = (index) => {
        document.getElementById('selected-project-name').innerHTML = projectsArray[index].name;
    }


    /**
     * this function to clear the projects list UI
     */
    const clearProjectsListUi = () => {
        document.getElementById('projects-body').innerHTML = "";
    }
    /**
     * this function to clear the todos list UI
     */
    const clearTodosListUi = () => {
        document.getElementById('accordion').innerHTML = "";
    }

    console.log(projectsArray);


    return {
        addProject,
        deleteProject,
        renderProjects,
        clearProjectsListUi,
        clearTodosListUi,
        addTodo,
        renderTodo,
        renderSelectedProjectName
    }
}


const render = RenderProject();

render.addProject("Tutorial");

let tutotialTodo = Todo("tutorial1", "This is your tutorial that you will follow up with me", "20/8/5555", "Normal", false);
let tutotialTodo1 = Todo("tutorial2", "This is your tutorial2 that you will follow up with me", "20/8/6666", "Urgent", false);
projectsArray[0].todos.push(tutotialTodo);
projectsArray[0].todos.push(tutotialTodo1);

/*
const addTodo = () => {
    render.renderTodo(0)
}

addTodo()
*/

console.log(projectsArray[0]);
render.renderProjects();
render.renderTodo(0)


export { RenderProject }

