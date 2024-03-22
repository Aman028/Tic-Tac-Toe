let current=document.querySelector(".gameinfo");
let boxes=document.querySelectorAll(".box");
let button=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initgame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // ui par empty bhi toh karoge
    boxes.forEach(function(box,index){
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //remove green thing
        //green ko hatane k bajay hum saare property ko initialise kar denge
        box.classList=`box box${index+1}`;
    });
    button.classList.remove("active");
    current.innerText=`Current Player - ${currentPlayer}`;
}
initgame();

boxes.forEach(function(box,index){
    box.addEventListener("click",function(){
        handleclick(index);
    })
})

function handleclick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";
        gameGrid[index]=currentPlayer;
        swapTurn();
        checkgameover();
    }
}
function swapTurn(){
    if(currentPlayer==="X")
    {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //ui upadte
    current.innerText=`Current Player - ${currentPlayer}`;
}

function checkgameover(){
    // button.classList.add("active");
    let answer="";
    winningPositions.forEach(function(position){
        if((gameGrid[position[0]]!==""&&gameGrid[position[1]]!==""&&gameGrid[position[2]]!=="")
            &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]]))
        {
            //check if winner is X
            if(gameGrid[position[0]]==='X')
            {
                answer="X";
            }
            else
            {
                answer="O";
            }
            //disable pointer
            boxes.forEach(function(box){
                box.style.pointerEvents="none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!="")
    {
        current.innerText=`Winner Player - ${answer}`;
        button.classList.add("active");
        // return;
    }

    //let check for tie
    let fillcount=0;
    gameGrid.forEach(function(box){
        if(box!=="")
        {
            fillcount++;
        }
    });

    if(fillcount===9)
    {
        current.innerText=`Game Tied`;
        button.classList.add("active");
    }
}
button.addEventListener('click',function(){

    initgame();
})

