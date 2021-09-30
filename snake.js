function init(){
    canvas = document.getElementById("mycanvas");
    W=canvas.width=500;
    H=canvas.height=500;
    // W=H=canvas.width = canvas.height = 600;
    pen = canvas.getContext('2d');
    cs = 33.33333333333333333333333333333333333333333333333333333333333333333333333333333333333333;
    score=0;
    // create food image 
    food_img = new Image();
    food_img.src = "./assets/apple.png";

    //create trophy image 
    trophy_img = new Image();
    trophy_img.src="./assets/trophy.png";

    food = getRandomFood();
    game_over= false;
    snake = {
        init_len : 5,
        color : "blue",
        cells:[],
        direction:"right",

        createSnake :function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
                
            }
            
        },
        updateSnake: function(){
            // console.log("updating snake according to the direction property");
            //when snake eaten the food then genrate new food.
            // and increase  the length of snake. 

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX==food.x && headY == food.y){
                console.log("food eaten");
                score+=5;
                food=getRandomFood();
                
            }
            else{
                this.cells.pop();   // pop only if food not eaten otherwise not pop().
            }


            
            var nextX, nextY;
            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }
            else{
                nextX=headX;
                nextY=headY-1;
            }
            
            this.cells.unshift({x:nextX,y:nextY});

            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);
            if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x >= last_x || this.cells[0].y >= last_y){
                game_over=true;
            }
        }
    };
    snake.createSnake();

    // add event listener to document or connect our key board with this game ;
    function keypressed(e){
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else{
            snake.direction="up";
        }
        console.log(snake.direction);
    }

    document.addEventListener('keydown',keypressed);

}
function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}
function draw(){
    
    pen.clearRect(0,0,W,H);   // erase old frame

    snake.drawSnake();  // call draw snake function to draw cells 
    // pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy_img,20,20,80,80);

    pen.fillStyle="blue";
    pen.font = "30px Roboto";
    
    pen.fillText(score,48,58);
   

}
function update(){
    snake.updateSnake();

}
function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("Game over");
    }
    draw();
    update();
}
init();
let f;
// gameloop();
start=document.getElementById('start');
start.onclick=function(){
   f = setInterval(gameloop,150);
   start.style.display='none';
}

Restart=document.getElementById('Restart');
Restart.addEventListener("click",gameRestart);
function gameRestart(){
    init();
    f = setInterval(gameloop,150);
}
