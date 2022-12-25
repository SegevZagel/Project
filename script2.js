// Main data declaration
let tasks=[];
let num=1;

// Saving given task to the localStorage
function saveTask(){
    if(localStorage.getItem('tasks')){
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    let task={
            num:num,
            desc:document.getElementById("desc").value,
            due:document.getElementById("due").value,
            isDone: false
        };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    printTask();
    num++;
    updateNum();

}

// Print tasks for localStorage to document
function printTask(){
    let arr = JSON.parse(localStorage.getItem('tasks'));
    let board=document.getElementById("board");
    board.innerHTML='';
    for(let task of arr){
            let isDone='';
            if(task.isDone){
                isDone='isDone';
            }
        const row=`
        <tr class="${isDone}">
        <td>${task.num}</td>
        <td>${task.desc}</td>
        <td>${task.due}</td>
        <td>
            <button class="btn delete" data=${task.num} onclick="deleteTask(this)">Delete</button>
            <button class="done" data=${task.num} onclick="isDone()">Done</button>
            <button class="restore" data=${task.num}>Restore</button>
            <button class="edit" data=${task.num} onclick="editTask(this)">Edit</button>
        </td>
        </tr>
        `;
        board.innerHTML+=row;
    }
}

// Updating task numerical order in case of delete
function updateNum(){
    let arr = JSON.parse(localStorage.getItem('tasks'));
    for(let i=0;i<arr.length;i++){
        arr[i].num=i+1;
    }
    localStorage.setItem('tasks',JSON.stringify(arr));
}

// Delete task from localStorage and printing new array to document
function deleteTask(task){
    let arr = JSON.parse(localStorage.getItem('tasks'));
    let index=task.getAttribute("data")-1;
    arr.splice(index,1);
    localStorage.setItem('tasks',JSON.stringify(arr));
    updateNum();
    num--;
    printTask();
}

function isDone(){
    let arr = JSON.parse(localStorage.getItem('tasks'));
    document.getElementById("board").addEventListener('click',function(event){
        if(event.target.classList.contains('done')){
            const taskId= event.target.getAttribute('data')-1;
            arr[taskId].isDone=true;
            localStorage.setItem('tasks', JSON.stringify(arr));
            printTask();
        }
        else{
            (event.target.classList.contains('restore'))
            const taskId= event.target.getAttribute('data')-1;
            arr[taskId].isDone=false;
            localStorage.setItem('tasks', JSON.stringify(arr));
            printTask();
        }
    });
}

function editTask(task){
    let arr = JSON.parse(localStorage.getItem('tasks'));
    let index=task.getAttribute("data")-1;
    document.getElementById("desc").value=arr[index].desc;
    document.getElementById("due").value=arr[index].due;
    document.addEventListener('click',function(event){
        if(event.target.classList.contains('add')){
            arr[index].desc=document.getElementById("desc").value;
            arr[index].due=document.getElementById("due").value;
            localStorage.setItem('tasks',JSON.stringify(arr));
            printTask();
        }
        return;
    });
}

function resetForm(){
    document.getElementById("desc").value="";
    document.getElementById("due").value="";
}

