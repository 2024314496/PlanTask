let projects = [];

// ========== LOCALSTORAGE ==========
function recoverData() {
    if (!localStorage.projects) {
        localStorage.projects = JSON.stringify([]);
    } else {
        projects = JSON.parse(localStorage.projects);
    }
    
    document.querySelector("#aside-projects").innerHTML = '';
    document.querySelector("#projects").innerHTML = '<h2 class="title">Projetos <button class="bx bxs-plus-circle" onclick="popup(\'#addProject\', \'showModal\')"></button></h2>';

    let ul = document.createElement("ul");
    document.querySelector("#projects").appendChild(ul);

    for (let i = 0; i < projects.length; i++) {
        showSingleProjectPage(ul, projects[i]);
        asideShowSingleProject(document.querySelector("#aside-projects"), projects[i]);
        createProjectPage(projects[i]);
    }

    putProjectsOptions('#addTaskProject');
    putProjectsOptions('#addSectionProject');
}

function cleanData() {
    localStorage.clear();

}
