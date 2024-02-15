let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList =[];
let mode="all";
let filterList =[];
let underLine = document.getElementById("under-line");

//*
tabs.forEach((menu) => 
menu.addEventListener("click",(e) =>indicator(e))
);

function indicator(e){
    underLine.style.left = e.currentTarget.offsetLeft +"px";
    underLine.style.width = e.currentTarget.offsetWidth +"px";
    underLine.style.top = e.currentTarget.offsetTop 
                            + e.currentTarget.offsetHeight + "px";
}
//* tabs (모두,진행중,끝남) 클릭시 언더라인 이동*//

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
}); //*Enter키로 텍스트 입력하기*//

addButton.addEventListener("click",addTask);


for(let i =1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}


function addTask(){
    let taskContent = taskInput.value.trim();

    if(taskContent === ""){
        alert("내용을 입력해주세요.");
        return;
    } 
    //* 빈칸 입력시 경고창 띄워주기*//

    let task = {
        id: randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    taskInput.value = "";  //*텍스트 입력 후 입력내용 지워주기*//
    render();
    
}


function render(){
    let list=[];
    if(mode === "all"){
        list= taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }





    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class = "task task-done">${list[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fi fi-rr-refresh"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fi fi-rr-trash"></i></button>
            </div>
        </div>`


    }else {
        resultHTML += `<div class="task">
            <div class = "task-check">${list[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fi fi-rr-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fi fi-rr-trash"></i></button>
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
//* delete 버튼 클릭시 클릭한 리스트(i) 1줄(1) 삭제 (splice(i,1))


function filter(event){
    mode = event.target.id
    filterList =[];
    if(mode ==="all"){
        render()
    }else if(mode ==="ongoing"){
        for(let i = 0; i <taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
        console.log("진행중",filterList)
    }else if(mode === "done"){
        for(let i = 0; i <taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}




function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
