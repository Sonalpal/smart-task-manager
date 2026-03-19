let createBtn= document.querySelector("#createbtn");
let input = document.querySelector("#input");
let parent = document.querySelector("#list");
let total = document.getElementById("totalcount")
let completed= document.getElementById("completedcount");
let pending = document.getElementById("pendingcount");

let currentFilter = "all";


 //Date and Time
   let dateonly=new Date();
   let date = dateonly.toISOString().split('T')[0];;
    let time = dateonly.toLocaleTimeString();
   document.getElementById("forDateAndTime").textContent="Date: "+date+ "  Time: "+time;


    

let tasks = [];
//save tasks to localeStorage
function saveTasks(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
}
//render Tasks

function renderTasks(){
   parent.innerHTML="";

   let filteredTasks=tasks;
  
  if(currentFilter === "completed"){
      filteredTasks = tasks.filter(task  => task.isCompleted);
    }else if(currentFilter === "pending"){
      filteredTasks = tasks.filter(task => !task.isCompleted);
    }
  
       

   filteredTasks.forEach(function(task,index){
     
    let btnGroup = document.createElement("div"); 
      
    let child=document.createElement("li");
    
    //separating list's text and button
    let spantext = document.createElement("span");
    spantext.textContent=task.text +"(" +task.priority+ ")" ;

   // edit btn
   let editBtn = document.createElement("button");
   editBtn.textContent= "Edit";
   editBtn.style.background="#ef44a2";

   editBtn.addEventListener("click",function(event){
      event.stopPropagation();
      let newText = prompt("Edit your task",task.text);
      if(newText !==null && newText.trim()!==""){
        task.text=newText.trim();
           saveTasks();
      renderTasks();
      }
      
   })

    //completed check
    
        if(task.isCompleted){
          spantext.style.textDecoration="line-through";
           spantext.textContent+="✓" ;
        } 

      //click event  
      child.addEventListener("click",function(){
          task.isCompleted=!task.isCompleted;
          saveTasks();
          renderTasks();
        });


        


    // color
     if(task.priority==="High"){
       spantext.style.color="Red";
     }else if(task.priority==="Medium"){
      spantext.style.color="green";
     }else{
      spantext.style.color="blue";
     }
   
    
   
     //Delete Button
        let deleteBtn = document.createElement("button");
         deleteBtn.textContent="Delete";
         
         deleteBtn.addEventListener("click",function(event){
          event.stopPropagation();
          let realndex = tasks.findIndex(t => t.id ===task.id);
          tasks.splice(realndex,1);
          saveTasks();
          renderTasks();
         });
      

      //  child.appendChild(editBtn);
        // child.appendChild(spantext);
        // child.appendChild(deleteBtn);
        
btnGroup.appendChild(editBtn);
btnGroup.appendChild(deleteBtn);

child.appendChild(spantext);
child.appendChild(btnGroup);
       parent.appendChild(child);

          




     }
   );
 

  
       // count  

total.textContent="Total tasks:"+tasks.length;
completed.textContent="Completed tasks:"+tasks.filter(task=> task.isCompleted).length;
pending.textContent="pending tasks:"+ tasks.filter(task=>!task.isCompleted).length;

}

function addTask(){
    //content
   
    let content1= input.value.trim();
    if(content1==="") return ;
    

    
    let select = document.getElementById("Priority").value;

    tasks.push({
      id: Date.now(),
      text:content1,
      priority: select,
      isCompleted : false
    });
    
    saveTasks();
    renderTasks();

    
  input.value="";
  input.focus();

}

createBtn.addEventListener('click',addTask);

let saved = localStorage.getItem("tasks");
if(saved){
  tasks = JSON.parse(saved);
  renderTasks();
}


  


//search tasks

let search = document.querySelector("#search");


search.addEventListener("input",function(){
  let value=search.value.toLowerCase();
  let items=document.querySelectorAll("li");

  items.forEach(element => {
    let item= element.textContent.toLowerCase();
    if(item.includes(value)){
      element.style.display="block";
    }else{
      element.style.display="none";
    }
  });
});

let clrBtn = document.querySelector("#clrBtn");
clrBtn.addEventListener("click",function(){
  
   if(confirm("Are you sure you want to delete all tasks")){
     tasks=[];
     saveTasks();
     renderTasks();
   }
})

 document.getElementById("all").addEventListener("click",function(){
  currentFilter = "all";
  renderTasks();
 });
 document.getElementById("completed").addEventListener("click",function(){
  currentFilter="completed";
  renderTasks();
 });
 document.getElementById("pending").addEventListener("click",function(){
  currentFilter="pending";
  renderTasks();
 })

let toggleBtn =document.getElementById("themeToggle");

let savedtheme = localStorage.getItem("theme");

if(savedtheme ==="dark"){
  document.body.classList.add("dark");
toggleBtn.textContent="☀";
}

toggleBtn.addEventListener("click",function(){

  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    localStorage.setItem("theme","dark");
    toggleBtn.textContent="☀";
  }else{
    localStorage.setItem("theme","light");
    toggleBtn.textContent="🌙";
  }

});




















