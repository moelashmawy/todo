import { Project } from './project';
import { RenderProject } from './controller'



let addButton = document.getElementById('add-project-button');



/**
 * listen to the event when click on the delte icon on the project
 */
document.getElementById('projects-body').addEventListener('click', function (e) {
    const render = RenderProject();
    if (e.target && e.target.dataset.deleteIndex != undefined) {
        let index = e.target.dataset.deleteIndex;
        render.deleteProject(index);
    }
})


/**
 * this function renders the todos inside any project depends on the click target
 */
document.getElementById('projects-body').addEventListener('click', function (e) {
    const render = RenderProject();
    if (e.target && e.target.dataset.infoIndex != undefined) {
        let index = e.target.dataset.infoIndex;
        render.renderSelectedProjectName(index);
        render.clearTodosListUi();
        render.renderTodo(index);
        console.log(e.target.dataset.infoIndex);
    }
})


/**
 * this function render the projects from the objects array
 * once the user add new project and click add button
 */
function renderCurrentProjects() {

    const render = RenderProject();
    render.clearProjectsListUi();

    let projName = document.getElementById('project-input-name').value;
    //const projOne = Project(projName);

    render.addProject(projName);

    render.renderProjects();

    document.getElementById('project-input-name').value = null;
    console.log("hi8");

}


addButton.addEventListener('click', renderCurrentProjects);

function add() {

}


//document.getElementById('add-todo-button').addEventListener('click', addTodo)