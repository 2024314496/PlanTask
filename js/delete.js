function deleteProject(projectId) {
    let index = getProjectIndex(projectId);
    if (index === -1) return;

    projects.splice(index, 1);
    saveToLocalStorage();

    changeMain("#projects");
    let pageElement = document.querySelector(`#project-section-${projectId}`);
    if (pageElement) pageElement.remove();

    document.querySelector("#aside-projects").innerHTML = '';
    document.querySelector("#projects > ul").innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        asideShowSingleProject(document.querySelector("#aside-projects"), projects[i]);
        showSingleProjectPage(document.querySelector("#projects > ul"), projects[i]);
    }

    putProjectsOptions('#addTaskProject');
    putProjectsOptions('#addSectionProject');
}

function deleteSection(projectId, sectionId) {

    let project = getProject(projectId);
    let index = getSectionIndex(projectId, sectionId);

    project.sections.splice(index, 1);
    saveToLocalStorage();

    let sectionElement = document.querySelector(`#section-${sectionId}`);
    sectionElement.remove();

    putProjectsSectionsOptions('#addTaskProject', '#addTaskSection');
}

function deleteTask(projectId, sectionId, taskId) {
    let section = getSection(projectId, sectionId);
    if (!section) return;

    let index = getTaskIndex(projectId, sectionId, taskId);
    if (index == -1) return;

    section.tasks.splice(index, 1);
    saveToLocalStorage();

    let taskElement = document.querySelector(`#task-box-${taskId}`);
    if (taskElement) taskElement.remove();
}