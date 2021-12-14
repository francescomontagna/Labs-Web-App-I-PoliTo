'use strict';

// const dayjs = require('dayjs'); // TODO: Remove when running in the browser
// const isBetween = require('dayjs/plugin/isBetween') // TODO: Remove when running in the browser
const dayjsFormat = 'MMMM DD, YYYY h:mmA'

/* ---- TASKS CONSTRUCTOR ---- */
function Task(id, description, isImportant = false, isPrivate = false, deadline = '', format=dayjsFormat) {
    /**
     * deadline (string): optional attribute
     */

    this.id = id;
    this.description = description;
    this.isImportant = isImportant;
    this.isPrivate = isPrivate;
    this.deadline = dayjs(deadline);
    this.format = format;

    this.hasDeadline = Boolean(deadline && dayjs(deadline)); // Condition to format
    this.formatDate = () => {
        return this.hasDeadline ? dayjs(deadline).format(this.format) : '<not defined>';
    }

    this.toString = () => {
        return `Id: ${this.id}, Description: ${this.description}, Important: ${this.isImportant}, `
         + `Private: ${this.isPrivate}, Deadline: ${this.formatDate(format)}`;
    };
}


/* ---- TASKS-LIST CONSTRUCTOR ---- */
function TaskList(tasks) {
    /**
     * tasks (array): array of strings representing the task fields
     */ 

    this.allTasks = [];
    this.addTask = (newTask) => {
        if (!this.allTasks.map(task => task.id).includes(newTask.id)) // Add Task if not present
            this.allTasks.push(newTask);
    };

    tasks.forEach((task) => this.addTask(new Task(...task)));

    // Filtering functions
    const all = () => {
        return this.allTasks;
    }; 
    
    const important = () => {
        return this.allTasks.filter(task => task.isImportant);
    };
    
    const today = () => {
        return this.allTasks.filter(task => {
            const now = dayjs();
            return task.hasDeadline ? task.deadline.date() === now.date() && task.deadline.month() === now.month() && task.deadline.year() === now.year() : false
        });
    };
    
    const nextSevenDays = () => {
        return this.allTasks.filter(task => task.hasDeadline ? dayjs(task.deadline).isBetween(dayjs(), dayjs().add(7, 'day')) : false);
    };
    
    const privateTasks = () => {
        return this.allTasks.filter(task => task.isPrivate);
    };

    this.filters = {
        'all': all,
        'important': important,
        'today': today,
        'nextSevenDays': nextSevenDays,
        'private': privateTasks
    };

    // TODO: Keep track of the active filter!

}



/* ---- POPULATE LIST in HTML ---- */

/**
 * This code is still synchronous, it is the module to populate a list
 * Function to populate HTML with a list of task. Used in pair with filters in the main
 * Default: populate with All, and define class "active" in All. Nothing in others
 * When a class is selected, simply toggle the value of the current active class, and of the newly selected
 */

function listElement(task) {
    /**
     * Generate a new list element according to this template
     * task (Task): new task element
     */

    // External wrapper
    const newTodo = document.createElement('li');
    newTodo.className = "task list-group-item d-flex w-100 justify-content-between row";

    // div: checkbox + description
    const div = document.createElement('div');
    div.className = "checkbox col-lg-6";

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', task.id);

    const checkboxLabel = document.createElement('label')
    checkboxLabel.textContent = task.description;
    checkboxLabel.setAttribute('for', task.id);
    checkboxLabel.className = "ml-1 mb-1";
    if (task.isPrivate)
        checkboxLabel.classList.add('private');
    else
        checkboxLabel.classList.add('public');

    if (task.isImportant) 
        checkboxLabel.classList.add('important-task');
    

    // private icon
    const privateIcon = document.createElement('span');
    privateIcon.className = "text-center col-lg-1";
    if (task.isPrivate)
        privateIcon.classList.add("fas", "fa-user");

    // deadline date
    const deadline = document.createElement('span');
    deadline.className = "date col-lg-5";
    if (task.hasDeadline)
        deadline.textContent = task.formatDate();


    // Add nodes to the DOM
    newTodo.appendChild(div);
    newTodo.appendChild(privateIcon);
    newTodo.appendChild(deadline);

    div.appendChild(checkbox);
    div.appendChild(checkboxLabel);

    console.log(newTodo);

    return newTodo
}

function addFilteredTasks(filter, taskList) {
    /**
     * Populate with tasks of the active section
     */

    // Filter tasks: 'all', 'important', 'private', 'nextSevenDays', 'today' 
    // TODO: check here if correct + add check on filter value
    const tasksWithFilter = taskList.filters[filter]();

    // Create new nodes of <ul>
    const nodes = [];
    for (let i = 0; i < tasksWithFilter.length; i++){
        nodes.push(listElement(tasksWithFilter[i]));
    }
    // const nodes = tasksWithFilter.forEach(task => listElement(task));

    /**
     * Add new nodes
     * Switch to active / non-active the classes
     */
    const ul = document.querySelector('.tasks-list');
    ul.innerHTML = ""; // Remove existing nodes
    nodes.forEach((node) => ul.appendChild(node)); // Add new nodes
}

// Main
// Include functions above in event listeners
// Make design responsive

const tasks = new TaskList(TASKS);
addFilteredTasks('all', tasks);
