// ========== HELPER FUNCTIONS ==========
function getProject(projectId) {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectId) {
            return projects[i];
        }
    }
    return null;
}

function getProjectIndex(projectId) {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectId) {
            return i;
        }
    }
    return -1;
}

function getSection(projectId, sectionId) {
    let project = getProject(projectId);
    if (!project) return null;

    for (let i = 0; i < project.sections.length; i++) {
        if (project.sections[i].id === sectionId) {
            return project.sections[i];
        }
    }
    return null;
}

function getSectionIndex(projectId, sectionId) {
    let project = getProject(projectId);
    if (!project) return -1;

    for (let i = 0; i < project.sections.length; i++) {
        if (project.sections[i].id === sectionId) {
            return i;
        }
    }
    return -1;
}

function getTask(projectId, sectionId, taskId) {
    let section = getSection(projectId, sectionId);
    if (!section) return null;

    for (let i = 0; i < section.tasks.length; i++) {
        if (section.tasks[i].id === taskId) {
            return section.tasks[i];
        }
    }
    return null;
}

function getTaskIndex(projectId, sectionId, taskId) {
    let section = getSection(projectId, sectionId);
    if (!section) return -1;

    for (let i = 0; i < section.tasks.length; i++) {
        if (section.tasks[i].id === taskId) {
            return i;
        }
    }
    return -1;
}

// ========== RENDER FUNCTIONS ==========
function showProjectsPage() {
    let htmlProjects = document.querySelector("#projects");
    let ul = document.createElement("ul");

    for (let i = 0; i < projects.length; i++) {
        showSingleProjectPage(ul, projects[i]);
    }

    htmlProjects.appendChild(ul);
}

function showSingleProjectPage(father, project) {
    let li = document.createElement("li");
    li.classList.add("row");
    li.classList.add("project-page");
    li.onclick = function () {
        changeMain(`#project-section-${project.id}`);
    }

    let icon = document.createElement("span");
    icon.innerText = "#";
    icon.style.color = project.color;
    icon.classList.add("icon");

    let name = document.createElement("span");
    name.innerText = project.name;

    li.appendChild(icon);
    li.appendChild(name);
    father.appendChild(li);
}

showProjectsPage();

function asideShowProjects() {
    let ul = document.querySelector("#aside-projects");

    for (let i = 0; i < projects.length; i++) {
        asideShowSingleProject(ul, projects[i]);
    }
}

asideShowProjects();

function asideShowSingleProject(father, project) {
    let li = document.createElement("li");
    li.classList.add("row");
    li.onclick = function () {
        changeMain(`#project-section-${project.id}`);
    }

    let icon = document.createElement("span");
    icon.innerText = "#";
    icon.style.color = project.color;
    icon.classList.add("icon");

    let name = document.createElement("span");
    name.innerHTML = project.name;

    li.appendChild(icon);
    li.appendChild(name);
    father.appendChild(li);
}

// ========== CREATE PROJECT PAGES ==========
function createProjectsPages() {
    for (let i = 0; i < projects.length; i++) {
        createProjectPage(projects[i]);
    }
}

createProjectsPages();

function createProjectPage(project) {
    let htmlMain = document.querySelector("main");

    let title = document.createElement("div");
    title.style.borderBottom = `2px solid ${project.color}`;
    title.classList.add("project-title");
    
    let titleName = document.createElement("h2");
    titleName.innerText = project.name;
    titleName.classList.add("title");
    
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("bx");
    deleteButton.classList.add("bx-trash");
    deleteButton.onclick = function(){
        deleteProject(project.id)
    }

    title.appendChild(titleName);
    title.appendChild(deleteButton);

    let page = document.createElement("div");
    page.classList.add("column");
    page.classList.add("project-box");
    page.classList.add("container2");
    page.id = `project-section-${project.id}`;

    let allSections = document.createElement("div");
    allSections.classList.add("project-sections");

    for (let i = 0; i < project.sections.length; i++) {
        createProjectSection(allSections, project.id, project.sections[i]);
    }

    page.appendChild(title);
    page.appendChild(allSections);
    htmlMain.appendChild(page);
}

function createProjectSection(father, projectId, section) {
    let sectionDiv = document.createElement("div");
    sectionDiv.classList.add("project-section");
    sectionDiv.id = `section-${section.id}`;

    let sectionTitle = document.createElement("h3");
    sectionTitle.classList.add("section-title");
    
    let sectionName = document.createElement("h3");
    sectionName.classList.add("subtitle");
    sectionName.innerText = section.name;

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("bx");
    deleteButton.classList.add("bx-trash");
    deleteButton.onclick = function () {
        deleteSection(projectId, section.id);
    }

    sectionTitle.appendChild(sectionName);
    sectionTitle.appendChild(deleteButton);
    
    let divTasks = document.createElement("ul");
    divTasks.classList.add("column");
    divTasks.id = `tasks-section-${section.id}`;

    sortTasksDone(father, section.tasks, (a, b) => { return a.done - b.done });
    for (let j = 0; j < section.tasks.length; j++) {
        createTaskDiv(divTasks, projectId, section.id, section.tasks[j]);
    }

    sectionDiv.appendChild(sectionTitle);
    sectionDiv.appendChild(divTasks);
    father.appendChild(sectionDiv);
}

function createTaskDiv(father, projectId, sectionId, task) {
    let li = document.createElement("li");
    li.classList.add("task-box");
    if (task.done) li.classList.add("task-done");
    li.id = `task-box-${task.id}`;

    let checkbox = document.createElement("button");
    checkbox.classList.add("task-checkbox");
    checkbox.id = `task-checkbox-${task.id}`;

    let color = [(task.priority == 1) * 200, (task.priority == 2) * 200, (task.priority == 3) * 200]
    checkbox.style.borderColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    checkbox.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, .3)`;
    checkbox.style.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    checkbox.onclick = function (event) {
        let taskId = event.target.id.replace('task-checkbox-', '');
        let task = getTask(projectId, sectionId, taskId);
        task.done = !task.done;
        if (task.done) {
            newTaskDone(`#task-box-${task.id}`);
        } else {
            newTaskNotDone(`#task-box-${task.id}`);
        }
        sortTasksDone(father, getSection(projectId, sectionId).tasks, (a, b) => { return a.done - b.done });
        saveToLocalStorage();
    }
    let deleteBox = document.createElement("div");

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("task-delete");
    deleteButton.classList.add("bx");
    deleteButton.classList.add("bx-trash");

    deleteButton.onclick = function () {
        deleteTask(projectId, sectionId, task.id);
    }
    deleteBox.appendChild(deleteButton);

    let infos = document.createElement("ul");
    infos.classList.add("flex2");
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    let name = document.createElement("li");
    let strong = document.createElement("strong");
    strong.innerText = task.name;
    name.appendChild(strong);

    let description = document.createElement("li");
    description.classList.add("task-description");
    description.innerText = task.description;

    let resp_dueDate = document.createElement("li");
    resp_dueDate.classList.add("task-dueDate-resp");
    let responsability = document.createElement("span");
    responsability.innerText = task.responsability;
    resp_dueDate.appendChild(responsability);

    if (task.dueDate) {
        let dueDate = document.createElement("span");
        dueDate.classList.add("task-dueDate");
        dueDate.innerText = dateExtend(task.dueDate);
        resp_dueDate.appendChild(dueDate);
    }

    infos.appendChild(name);
    infos.appendChild(description);
    infos.appendChild(resp_dueDate);

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(infos);
    taskContainer.appendChild(deleteBox);
    li.appendChild(taskContainer);
    father.appendChild(li);
}

// ========== SORT & POPUP ==========
function sortTasksDone(ulElement, tasksArray, sortFunction) {
    tasksArray.sort(sortFunction);

    for (let i = 0; i < tasksArray.length; i++) {
        let taskElement = ulElement.querySelector(`#task-box-${tasksArray[i].id}`);
        if (taskElement) {
            ulElement.appendChild(taskElement);
        }
    }
}

function popup(where, func) {
    document.querySelector(where)[func]();
}

// ========== PUT OPTIONS ==========
function putProjectsOptions(where) {
    let htmlWhere = document.querySelector(where);
    htmlWhere.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        let newProject = document.createElement("option");
        newProject.innerText = projects[i].name;
        newProject.value = projects[i].id;
        htmlWhere.appendChild(newProject);
    }
}

putProjectsOptions('#addTaskProject');
putProjectsOptions('#addSectionProject');

function putProjectsSectionsOptions(call, where) {
    let projectId = document.querySelector(call).value;

    if (projectId != "") {
        let select = document.querySelector(where);
        select.innerHTML = '';

        let project = getProject(projectId);

        for (let i = 0; i < project.sections.length; i++) {
            let newSection = document.createElement("option");
            newSection.innerText = project.sections[i].name;
            newSection.value = project.sections[i].id;
            select.appendChild(newSection);
        }
    }
}

putProjectsSectionsOptions('#addTaskProject', '#addTaskSection');

// ========== ADD FUNCTIONS ==========
function addProject(event) {
    event.preventDefault();

    let inputs = document.querySelectorAll("input[id*='addProject']");

    let project = new Project(inputs[0].value, inputs[1].value);
    projects.push(project);

    asideShowSingleProject(document.querySelector("#aside-projects"), project);
    showSingleProjectPage(document.querySelector("#projects > ul"), project);
    createProjectPage(project);

    putProjectsOptions('#addTaskProject');
    putProjectsOptions('#addSectionProject');

    saveToLocalStorage();

    event.target.reset();

    popup('#addProject', 'close');
}

function addSection(event) {
    event.preventDefault();

    let inputs = document.querySelectorAll("input[id*='addSection']");
    let selects = document.querySelectorAll("select[id*='addSection']");

    let config = {
        name: inputs[0].value,
        projectId: selects[0].value
    }

    let section = new Section(config.projectId, config.name);

    let project = getProject(config.projectId);
    project.sections.push(section);

    createProjectSection(document.querySelector(`#project-section-${config.projectId} > .project-sections`), config.projectId, section);

    putProjectsSectionsOptions('#addTaskProject', '#addTaskSection');
    saveToLocalStorage();

    event.target.reset();
    popup('#addSection', 'close');
}

function addTask(event) {
    event.preventDefault();

    let inputs = document.querySelectorAll('input[id*="addTask"]');
    let selects = document.querySelectorAll('select[id*="addTask"]');

    let config = {
        projectId: selects[1].value,
        sectionId: selects[2].value,
        name: inputs[0].value,
        description: inputs[1].value,
        dueDate: inputs[2].value,
        responsability: inputs[3].value,
        priority: selects[0].value,
        local: inputs[4].value
    }

    let task = new Task(
        config.projectId,
        config.sectionId,
        config.name,
        config.description,
        config.dueDate,
        config.responsability,
        config.priority,
        config.local
    );

    let section = getSection(config.projectId, config.sectionId);
    section.tasks.push(task);
    let father = document.querySelector(`#tasks-section-${config.sectionId}`);
    createTaskDiv(father, config.projectId, config.sectionId, task);
    sortTasksDone(father, section.tasks, (a, b) => { return a.done - b.done });
    saveToLocalStorage();

    event.target.reset();
    popup('#addTask', 'close');
}

// ========== TASK COMPLETION ==========

function newTaskDone(taskId) {
    let taskBox = document.querySelector(taskId);
    taskBox.classList.add("task-done");
}

function newTaskNotDone(taskId) {
    let taskBox = document.querySelector(taskId);
    taskBox.classList.remove("task-done");
}

// ========== LOCALSTORAGE ==========
function saveToLocalStorage() {
    localStorage.projects = JSON.stringify(projects);
}

// ========== UTILITIES ==========
function dateExtend(dataStr) {
    let data = new Date(dataStr + "T00:00:00");
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    if (dataStr.substring(0, dataStr.indexOf("-")) == new Date().getFullYear()) {
        delete options.year;
    }

    let formated = data.toLocaleDateString('pt-BR', options);
    return formated;
}