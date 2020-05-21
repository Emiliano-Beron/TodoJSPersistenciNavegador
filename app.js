document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(event){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    
    const task = {
        title,
        description
    };
    if (localStorage.getItem('tasks') === null){
        // no existen tareas
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
        // existen tareas
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    getTask()
    document.getElementById('formTask').reset();
    event.preventDefault();
}

function getTask(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i = 0 ; i < tasks.length; i++){
        let title = tasks[i].title;
        let description = tasks[i].description


        tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">BORRAR</a>
            </div>
        
        </div>`
    }
}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let index = 0; index < tasks.length; index++) {
        if(tasks[index].title == title){
            tasks.splice(index, 1);
        }      
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask()
}

getTask();