let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList =[];
addButton.addEventListener("click",addTask);



function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    taskInput.value = "";
    render();
    
}


function render(){
    let resultHTML = "";
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class = "task task-done">${taskList[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${taskList[i].id}')"><i class="fi fi-br-rotate-right"></i></button>
                <button onclick="deleteTask('${taskList[i].id}')"><i class="fi fi-rr-trash"></i></button>
            </div>
        </div>`
    ///////체크 버튼 클래스 바꾸려고 이것저것 다해봐도 아래꺼랑 달라지면 버튼 자체가 없어져요 ㅠㅠㅠ
    ///////호환이 안되는건지 뭔지 ㅜㅜㅠㅠ
    }else {
        resultHTML += `<div class="task">
            <div class = "task-check">${taskList[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${taskList[i].id}')"><i class="fi fi-rr-checkbox"></i></button>
                <button onclick="deleteTask('${taskList[i].id}')"><i class="fi fi-rr-trash"></i></button>
            </div>
            </div>`;
    } 
    
}
    document.getElementById("task-board").innerHTML = resultHTML;
}


function toggleComplete(id){
    for(let i =0; i<taskList.length; i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete;  ////! ==not 여기에선 온오프 스위치같은기능으로 쓰고있음
            break;
        }
    }
    render();  /////함수 만들고 부르는거 잊지뫄!
    console.log(taskList);
}

function  deleteTask(id){
    for(let i=0;i<taskList.length; i++) {
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}