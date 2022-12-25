let uniq=1;
function addMission(){
    const description=document.getElementById("description");
    const dueDate=document.getElementById("dueDate");
    const dueTime=document.getElementById("dueTime");
    const board=document.getElementById("tasks");
    const tasks=localStorage.getItem("task");
    let taskBoard;
    if(tasks===null){
        taskBoard=[];
    }
    else{
        taskBoard=JSON.parse(tasks);
    }
    const obj={id:uniq,
                description:description.value,
                dueDate:dueDate.value,
                dueTime:dueTime.value};
    taskBoard.push(obj);
    const newTask=JSON.stringify(taskBoard);
    localStorage.setItem("task",newTask);
    board.innerHTML="";
    for(const obj of taskBoard){
        board.innerHTML+=
        `<div>
        <button type="button" onclick="deleteItem(${obj.id})" class="btn-close" aria-label="Close"></button><br>
        ${obj.description}<br>
        ${obj.dueDate}<br>
        ${obj.dueTime}
        </div>`
    }
    uniq++;
}
function clearForm(){
    const description=document.getElementById("description");
    const dueDate=document.getElementById("dueDate");
    const dueTime=document.getElementById("dueTime");
    description.value="";
    dueDate.value="";
    dueTime.value="";
}
function deleteItem(id){
    const tasks = localStorage.getItem("task");
    if (tasks !== null) {
        const tasksArray = JSON.parse(tasks);
        const index=tasksArray.findIndex(function(item){
            return item.id===id;
        });
        if(index !== -1){
            // Delete from tasks array
            tasksArray.splice(index,1);
            // Save new tasks array in local storage
            localStorage.setItem("task",JSON.stringify(tasksArray));
        }
        const board=document.getElementById("tasks");
        board.innerHTML="";
        for(const obj of tasksArray){
            board.innerHTML+=
            `<div>
            <button type="button" onclick="deleteItem(${obj.id})" class="btn-close" aria-label="Close"></button><br>
            ${obj.description}<br>
            ${obj.dueDate}<br>
            ${obj.dueTime}
            </div>`
        }
    }
}