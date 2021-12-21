let addbtn=document.querySelector(".add-btn");
let addflag=false;
let modelCont=document.querySelector(".model-cont");
let mainCont=document.querySelector(".main-cont");
let textareaCont=document.querySelector(".textarea-cont");
let colors=["green","red","blue","black"];
let activeColor=colors[colors.length-1];
let allpriorityColors=document.querySelectorAll(".priority-color");
let removebtn=document.querySelector(".remove-btn");
let removeFlag=false;

let lockClass="fa-lock";
let unlockClass="fa-lock-open";

let toolboxcolors=document.querySelectorAll(".color");

let allTickets=[];
let actulAllTickets=[];
let filteringFlag=false;

let displayingAllTickets=false;

let toolboxContainer=document.querySelector(".toolbox");

//single click case
for(let i=0;i<toolboxcolors.length;i++)
{
    toolboxcolors[i].addEventListener("click",function(e){
        console.log("clicked here");
        let currToolboxColor=toolboxcolors[i].classList[1];
        //1)filter the tickets

        let filteredtickets=allTickets.filter((ticketObj,idx)=>{
            
            return ticketObj.ticketColor===currToolboxColor;
        });
        
        //2)remove the existing tickets on the screen
         let allticketCont=document.querySelectorAll(".ticket-cont");
         for(let i=0;i<allticketCont.length;i++)
         {
             allticketCont[i].remove();
         }
         
         //remove from our box that we are storing before filtering
         for(let j=0;j<allTickets.length;j++)
         {
             allTickets[j].remove;
         }


        //3)create and display the filtered tickets
        for(let j=0;j<filteredtickets.length;j++)
        {   filteringFlag=true;
            console.log("i am at line 49");
            createTicket(filteredtickets[j].ticketColor,filteredtickets[j].ticketTask,filteredtickets[j].ticketID);
            filteringFlag=false;
        }
        filteredtickets=[];
        
    });

    
    //double click case
    // toolboxcolors[i].addEventListener("dblclick",function(e){

    //     //2)remove the existing tickets on the screen
    //      let allticketCont=document.querySelectorAll(".ticket-cont");
    //      for(let j=0;j<allticketCont.length;j++)
    //      {
    //          allticketCont[j].remove();
    //      }


    //      for(let j=0;j<actulAllTickets.length;j++)
    //      {   console.log("i am at line 71");
    //          createTicket(actulAllTickets[j].ticketColor,actulAllTickets[j].ticketTask,actulAllTickets[j].ticketID);
    //      }

    // });
}



//double click on main page

toolboxContainer.addEventListener("dblclick",function(e){
   
    console.log("double clicked");

    // 2)remove the existing tickets on the screen
         let allticketCont=document.querySelectorAll(".ticket-cont");
         for(let j=0;j<allticketCont.length;j++)
         {
             allticketCont[j].remove();
         }

         displayingAllTickets=true;
         for(let j=0;j<actulAllTickets.length;j++)
         {   console.log("i am at line 71");
             
             createTicket(actulAllTickets[j].ticketColor,actulAllTickets[j].ticketTask,actulAllTickets[j].ticketID);
         }
         
         displayingAllTickets=false;

});




//listener for models priority coloring 
allpriorityColors.forEach((colorElem,idx)=>{
    colorElem.addEventListener("click",function(e){
        //first we are making all the elemnts non active;
       for(let i=0;i<allpriorityColors.length;i++)
       {
           let currColor=allpriorityColors[i];
           currColor.classList.remove("active");
       }
       //now set the present color as active Color
       colorElem.classList.add("active");
       activeColor=colorElem.classList[1];
    });

});


addbtn.addEventListener("click",function(e){

    //if addflag is true then display the model-cont
    //else the model-cont should be not displayed
    addflag=!addflag;
    if(addflag==true){
     modelCont.style.display="flex";

    }
    else
    {
        modelCont.style.display="none";
    }

});

removebtn.addEventListener("click",function(e){

    //if addflag is true then remove must be activated 
    removeFlag=!removeFlag;
    

});

modelCont.addEventListener("keydown",function(e){
    let key=e.key;
    if(key==="Shift"){
        createTicket(activeColor,textareaCont.value,shortid());
        modelCont.style.display="none";
        addflag=false;
        textareaCont.value="";
        activeColor=colors[colors.length-1];//again setting back to default colour

    }

});

function createTicket(ticketColor, ticketTask, ticketID){
    //create a element and give the inner HTML
    //append it in the main container
    let ticketElement=document.createElement("div");
    ticketElement.setAttribute("class","ticket-cont");
    ticketElement.innerHTML=`
            <div class="ticket-color ${ticketColor}"></div>
            <div class="ticket-id">#${ticketID}</div>
            <div class="task">${ticketTask}
            </div>
            <div class="ticket-lock">
            <i class="fas fa-lock"></i>
            </div>
    `;
    mainCont.appendChild(ticketElement);
    removeFlag=false;//after creating the element we set remove as false 
    activeColor=colors[colors.length-1];//again setting back to default colour
    let ticketObj={ticketColor, ticketTask, ticketID};

    

    if(filteringFlag==false && displayingAllTickets==false) {
        actulAllTickets.push({ticketColor, ticketTask, ticketID});
        allTickets.push(ticketObj);
    }

    
    handleRemoval(ticketElement);
    handleLock(ticketElement);
    handlecolor(ticketElement);
    // handlechangecolourforfiltering(ticketElement);

}

function handleRemoval(presentTicket)
{
    presentTicket.addEventListener("click",function(e){
        if(removeFlag)
        {
            presentTicket.remove();
        }
    });
}

function handleLock(presentTicket)
{
    let lockElem=presentTicket.querySelector(".ticket-lock").children[0];
    let ticketTaskArea=presentTicket.querySelector(".task");

    lockElem.addEventListener("click",function(e){

        if(lockElem.classList.contains(lockClass))
        {
            lockElem.classList.remove(lockClass);
            lockElem.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable","true");
            ticketTaskArea.style.outline="none";
            ticketTaskArea.style.border="none";
            ticketTaskArea.setAttribute("spellcheck","false");
            

        }
        else{

            lockElem.classList.remove(unlockClass);
            lockElem.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable","false");
           
        }

    });
}

function handlecolor(presentTicket)
{
    console.log("entered here in");

    let ticketBarcolor=presentTicket.querySelector(".ticket-color");

    ticketBarcolor.addEventListener("click",function(e){
        console.log("entered in event listenee line 191");

    let presentColor=ticketBarcolor.classList[1];
    //get ticketcolor index
    let presentColorIndex;
    for(let i=0;i<colors.length;i++){
        if(presentColor==colors[i])
        {
              presentColorIndex=i;
              break;
        }
    }
    presentColorIndex++;
    let newticketColor=colors[presentColorIndex%colors.length];

    
    ticketBarcolor.classList.remove(presentColor);
    ticketBarcolor.classList.add(newticketColor);

    });

    
}

// function handleDBLclickOnColourToolBar(presentTicket)
// {
//     let colorToolBar=presentTicket.querySelector(".ticket-color");
// }

// function handlechangecolourforfiltering(presentTicket)
// {
//     let currticketID=presentTicket.querySelector(".ticket-color");
// }

