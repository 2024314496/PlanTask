class Project {
    constructor(name, color) {
        this.id = generateId(10);
        this.name = name;
        this.color = color;
        this.sections = [];
    }
}

class Section {
    constructor(project, name) {
        this.id = generateId(7);
        this.project = project;
        this.name = name;
        this.tasks = [];
    }
}

class Task {
    constructor(project, section, name, description, dueDate, responsability, priority, local) {
        this.id = generateId(5);
        this.project = project;
        this.section = section;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.responsability = responsability;
        this.priority = priority;
        this.local = local;
        this.done = false;
    }
}

function changeMain(page) { //string
    //pegar a page ativa
    document.querySelector(".page-active").classList.remove("page-active");
    //display na page do parametro
    document.querySelector(page).classList.add("page-active");
}

function generateId(length) {
    let string = Date.now().toString(36) + Math.random().toString(36).substring(2);
    let random = Math.trunc(Math.random()*string.length);
    return string.substring(random, random+length);
}


