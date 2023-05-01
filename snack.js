let inputDir = {x: 0, y: 0};
const foodsound = new Audio('food.mp3');
const gameOversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
let speed = 2;
let score = 0;
let lastPrintTime = 0;
let snakeArr = [
    {x: 17, y: 15}
];
let u=0;
let u_=0;

food = {x: 6, y: 7};

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPrintTime)/1000 < 1/speed){
        return;
    }
    lastPrintTime = ctime;
    gameEngine();
    console.log("arrow down bool");
    console.log(u);
    console.log("arrow up bool")
    console.log(u_);
}


function isCollide(sarr){
    let j=0;

    for(let p=1;p<snakeArr.length;p++){
        if(snakeArr[0].x==snakeArr[p].x && snakeArr[0].y==snakeArr[p].y){
            j=1;
            break;
        }
    }

    if(snakeArr[0].x<=-1 || snakeArr[0].y<=-1)
    {
        return true;    
    }
    else if(snakeArr[0].x>=19 || snakeArr[0].y>=19)
    {
        return true;
    }

    else if(j==1){
        return true;
    }
    else{
        return false;
    }

    
}



function gameEngine(){
    
    if(isCollide(snakeArr)){
        gameOversound.play()
        inputDir = {x: 0, y: 1};
        alert("GAME OVER. PRESS ANY KEY TO PALY AGAIN!");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
        console.log(score);
    }


    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        score+=1;
        console.log(score);
    }


    for (let i = snakeArr.length -2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};  
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement); 
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}   

    movesound.play();
    switch (e.key) {
        case "ArrowUp":
           console.log("ArrowUp")
           if(snakeArr.length>1){
                if(u_== 0){
                    inputDir.x = 0;
                    inputDir.y = -1;
                    u=1;
                }
           }
           else{
            inputDir.x = 0;
            inputDir.y = -1;        
           }
           break;

        case "ArrowDown":
            console.log("ArrowDown")
            if(snakeArr.length>1){
                if(u==0){
                    inputDir.x = 0;
                    inputDir.y = 1;
                    u_=1;
                }
            }

            else{
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            u=0;
            u_=0;
            if(snakeArr.length>1){

                inputDir.x = -1;
                inputDir.y = 0;
            }

            else{
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            u=0;
            u_=0;
            if(snakeArr.length>1){   
    
                inputDir.x = 1;
                inputDir.y = 0;
            }

            else{
                inputDir.x = 1;
                inputDir.y = 0;
            }

            break;
            
        default:
            break;
    }
})
