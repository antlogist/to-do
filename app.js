let tasks = [
    {
        id: 1597404663617,
        completed: false,
        title: "Title One",
        descr:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, enim. Possimus illo minus eum vitae? Rerum odio aperiam vel distinctio assumenda, dolorum esse facere. Pariatur nesciunt consectetur beatae, quam tempore"
    },
    {
        id: 1597404663618,
        completed: false,
        title: "Title Two",
        descr:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, enim. Possimus illo minus eum vitae? Rerum odio aperiam vel distinctio assumenda, dolorum esse facere. Pariatur nesciunt consectetur beatae, quam tempore"
    },
    {
        id: 1597404663619,
        completed: false,
        title: "Title Three",
        descr:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, enim. Possimus illo minus eum vitae? Rerum odio aperiam vel distinctio assumenda, dolorum esse facere. Pariatur nesciunt consectetur beatae, quam tempore"
    }
];

(function(tasksArr) {
    // DOM fragment element
    const fragment = document.createDocumentFragment();

    // List group element
    const listGroup = document.createElement("div");
    listGroup.classList.add("list-group");
    fragment.appendChild(listGroup);

    // Render tasks
    rednderTasks();

    // Append fragment
    document.getElementById("tasks").appendChild(fragment);

    // Render tasks
    function rednderTasks() {
        // Check the taskList
        if (!Array.isArray(tasksArr) || tasksArr.length == 0) {
            console.error("Tasks are not available");
            return;
        }

        // Tasks
        tasksArr.map(task => {
            const taskEl = createTaskTemplate(task);
            // append tasks
            listGroup.appendChild(taskEl);
        });
    }

    // Task template
    function createTaskTemplate(task) {
        // link
        const a = document.createElement("a");
        a.classList.add("list-group-item", "list-group-item-action");
        a.setAttribute("href", "#");

        // div
        const div = document.createElement("div");
        div.classList.add("d-flex", "w-100", "justify-content-between");
        a.appendChild(div);

        // title
        const title = document.createElement("h5");
        title.classList.add("mb-1");
        title.textContent = task.title;
        div.appendChild(title);

        // description
        const descr = document.createElement("p");
        descr.classList.add("mb-1");
        descr.textContent = task.descr;
        a.appendChild(descr);

        // delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-sm", "btn-danger", "mt-2");
        deleteBtn.textContent = "Delete";
        a.appendChild(deleteBtn);

        return a;
    }

    // Add-task form
    const addTaskForm = document.forms["addTaskForm"];
    const inputTitle = addTaskForm.elements["taskTitleInput"];
    const inputDescr = addTaskForm.elements["taskDescrInput"];

    addTaskForm.addEventListener("submit", formSubmit);

    // Form submit
    function formSubmit(e) {
        e.preventDefault();

        const title = inputTitle.value;
        const descr = inputDescr.value;

        if (!title) {
            alert("Enter title"); // Title required
            return;
        }

        const newTaskObj = createTaskObject(title, descr);
        const newTaskTemplate = createTaskTemplate(newTaskObj);
        listGroup.insertAdjacentElement("afterbegin", newTaskTemplate);
        addTaskForm.reset();
    }

    // New task object creation
    function createTaskObject(title, descr) {
        // New task object
        const newTaskObj = {
            id: new Date().valueOf(),
            completed: false,
            title: title,
            descr: descr
        };

        // Push to the common tasks array
        tasks.unshift({ ...newTaskObj });
        return { ...newTaskObj };
    }
})(tasks);
