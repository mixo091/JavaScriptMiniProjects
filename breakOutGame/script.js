//Rules functionality.

//Getting rules div  and rules-btn/close-rules buttons.
const rulesBtn = document.getElementById('rules_btn')
const CloseBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

//Rules and close event hand/rules btn is going to listen for a 'click'.
//when this tthappens we are going to creta function which 
//will add at the rule div a class.
rulesBtn.addEventListener('click',() => rules.classList.add('show'));
//now for the closing button.
CloseBtn.addEventListener('click',() => rules.classList.remove('show'));

//Then we will use canvas API.
//Following these steps.
//see MDN canvas.
/*1.create Canvas context
  2.create and draw ball
  3.create and draw paddle
  4.create bricks.
  6.add update()-animate -requestAnimationFrame(cd)
  7.move paddle
  8.keybord events from paddle
  9.move ball
  10. add wall boundaries
  11. increase score with brick breaking.
  12. lose -redraw,reset score.
  */
//---------------------------------------------------

  const Canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const ball = {
      x:canvas.width /2,
      y:canvas.height/2,
      size:8,
      speed:7,
      dx:4,
      dy:-4
  }


  //Create paddle properties
  const paddle = {
      x: canvas.width / 2 - 40,
      y:canvas.height - 20, 
      w:130,
      h: 5 ,
      speed:12, 
      dx :0
  }


 const brickRows=9;
 const brickColumns=5;

  const brickInfo = {
    w:70,
    h:20,
    padding: 10,
    offsetX:45,
    offsetY:60,
    visible: true
  }


  let score=0;
 
  //draw ball on canvas 
  function drawBall(){
      ctx.beginPath();
      ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2);
      ctx.fillStyle='#a7cacb';
      ctx.fill();
      ctx.closePath();
  }

  //draw paddel on canvas 
  function drawPaddle(){
      ctx.beginPath();
      ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h);
      ctx.fillStyle='#a7cacb';
      ctx.fill();
      ctx.closePath();
  }

  function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`,Canvas.width-100,30);
  }


  const bricks=[];
  for(let i =0; i<brickRows;i++){
    bricks[i]=[];
    for(let j=0;j<brickColumns;j++){
      //the x value for this particular brick 
      const x= i* (brickInfo.w +brickInfo.padding)+brickInfo.offsetX;
      //the y value for this particular brick
      const y= j* (brickInfo.h +brickInfo.padding)+brickInfo.offsetY;
      bricks[i][j]={x,y, ... brickInfo}
    }
  }

  //Draw bricks on Canvas
  function drawBricks(){
    bricks.forEach(column => {
      column.forEach( brick => {
        ctx.beginPath();
        ctx.rect(brick.x,brick.y,brick.w,brick.h);
        ctx.fillStyle=brick.visible ? '#ffc0cb' : 'transparent';
        ctx.fill();
        ctx.closePath();
      })
    })

  }


  function Draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
  }


  Draw();



  function movePaddle(){
    paddle.x += paddle.dx;
    //detect walls
    if (paddle.x + paddle.w > canvas.width){
      paddle.x= canvas.width - paddle.w ;
    }
    if(paddle.x<0){
      paddle.x=0;
    }
  }

  
  function  moveBall(){
    ball.x +=ball.dx;
    ball.y +=ball.dy;
    //Detect (side)walls for the ball
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
      ball.dx*=-1;
    }
    //wall collision top/bottom.
    if(ball.y + ball.size >canvas.height ||
      ball.y - ball.size <0){
        ball.dy *= -1;
      }
    
    //Ball collision with the paddle
    if( 
      ball.x - ball.size > paddle.x && 
      ball.x + ball.size < paddle.x + paddle.w &&
      ball.y + ball.size > paddle.y){
        ball.dy=-ball.speed;
      }
      //Brick collision
      bricks.forEach(column => {
        column.forEach(brick=> {
          if(brick.visible) {
            if(
               ball.x - ball.size > brick.x && 
               ball.x + ball.size < brick.x + brick.w &&
               //check
               ball.y + ball.size > brick.y &&
               ball.y - ball.size < brick.y + brick.h  
               ){

                ball.dy *= -1;
                brick.visible=false;
                IncreaseScore();
            }
          }
        });
      }) ;

      //hitt bottom wall - lose
      if(ball.y + ball.size > canvas.height){
         showAllBricks();
         score = 0;
      } 

  }

  
  function IncreaseScore(){
    score++;
    if(score % (brickRows * brickRows) === 0){
      showAllBricks();
    }
  }
  

  //rectreate bricks 
  function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => brick.visible=true)
    })

  }

//Update canvas drawing and animation.
  function update(){
    movePaddle();
    moveBall();
    Draw();
    requestAnimationFrame(update);
  }
  //keyboard events ..
  //Keydown event .. 
  function keyDown(e){
    if(e.key === 'Right'  ||  e.key=== 'ArrowRight'){
        paddle.dx=paddle.speed;
    }else if (e.key === 'Left'  ||  e.key=== 'ArrowLeft'){
        paddle.dx=-paddle.speed;
    }

  }


  //keyup event ..
  function keyUp(e){
    console.log('up');
    if(e.key ==='Right' || e.key ==='ArrowRight' || e.key ==='Left' ||
     e.key === 'ArrowLeft') {
       paddle.dx=0;
    }

  }

  //keyboard event handlers
  document.addEventListener('keydown',keyDown);
  document.addEventListener('keyup' ,keyUp);


  update();