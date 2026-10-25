const taskInput=document.getElementById("taskInput");
const dropDown=document.getElementById("priorityInput");
const addBtn=document.getElementById("addButton");
const taskList=document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const totalCount=document.getElementById("totalCount");
const completedCount=document.getElementById("completedCount");

const tasks=[];

let id=1;
addBtn.addEventListener("click",()=>{
    const task=taskInput.value.trim();
    const opt=dropDown.value;

    if(task===""){
        alert("Enter the valid task");
        return;
    }

    let obj={
        "id":id,
        "title":task,
        "priority":opt,
        "completed":false
    }

    tasks.push(obj);
    updateSummary();
    renderTasks();
    id++;
    taskInput.value="";
    dropDown.value="Medium";
})

function renderTasks(){
    taskList.textContent="";
    const searchText=searchInput.value.trim().toLowerCase();
    for(let task of tasks){
        if(!task.title.toLowerCase().includes(searchText)){
            continue;
        }
        const list=document.createElement("li");
        const div=document.createElement("div");
        const p1=document.createElement("p");
        const p2=document.createElement("p");
        const actionGroup=document.createElement("div");
        const btn=document.createElement("button");
        const delBtn=document.createElement("button");

        div.classList.add("task-info");
        p1.classList.add("task-title");
        p2.classList.add("priority");
        actionGroup.classList.add("task-actions");
        btn.classList.add("complete-btn");
        delBtn.classList.add("delete-btn");

        delBtn.textContent="Delete";

        if(task.completed){
            btn.textContent="Undo";
        }else{
            btn.textContent="Complete";
        }

        p1.textContent=task.title;
        p2.textContent=task.priority;

        if(task.completed){
            p1.classList.add("completed");
        }
        div.append(p1);
        div.append(p2);

        actionGroup.append(btn);
        actionGroup.append(delBtn);
        list.append(div);
        list.append(actionGroup);
        taskList.append(list);

        btn.addEventListener("click",()=>{
            task.completed=!task.completed;
            updateSummary();
            renderTasks();
        })

        delBtn.addEventListener("click",()=>{
            const index=tasks.findIndex((item)=> item.id===task.id);
            if(index!==-1){
                tasks.splice(index,1);
            }
            updateSummary();
            renderTasks();
        })
    }
}

searchInput.addEventListener("input",()=>{
    renderTasks();
})
function updateSummary(){
    totalCount.textContent=tasks.length;
    let count=0;
    for(let task of tasks){
        if(task.completed){
            count++;
        }
    }
    completedCount.textContent=count;
}