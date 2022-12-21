var PLAY = 1;
var END = 0;
var gameState = PLAY;

var aether, aether_running;
var mondstad, invisibleGround, mondstadImage;

var hillichurlg, hillichurl1, hillichurl2, hillichurl3;

var restartImg;
var score;
var jumpSound , checkPointSound, dieSound

function preload(){
  aether_running = loadImage("aether.png");
  
  mondstadImage = loadImage("mondstad.webp");
  
  hillichurl1 = loadImage("hillichurl1.webp");
  hillichurl2 = loadImage("hillichurl2.webp");
  hillichurl3 = loadImage("hillichurl3.webp");

  restartImg = loadImage("restart.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 400);

  
  mondstad = createSprite(200,180,400,20);
  mondstad.addImage(mondstadImage);
  mondstad.x = mondstad.width /2;

  aether = createSprite(100,400);
  aether.addImage(aether_running);
  aether.scale = 0.2;
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;

  invisibleGround = createSprite(200,400,400,10);
  invisibleGround.visible = false;

  hillichurlg = createGroup();
 

  
  aether.setCollider("rectangle",0,0,aether.width,aether.height);
  aether.debug = false
  
  score = 0;
  
}

function draw() {
  
  background("white");

  text("Pontuação: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    restart.visible = false;
    
    mondstad.velocityX = -(4 + score/200)
  
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%200 === 0){
       checkPointSound.play() 
    }
    
    if (mondstad.x < 0){
        mondstad.x = mondstad.width/2;
    }
    

    if(keyDown("space")&& aether.y >= 155) {
        aether.velocityY = -12;
        jumpSound.play();
    }
    

    aether.velocityY = aether.velocityY + 0.8

    spawnHillichurl()
    
    if(hillichurlg.isTouching(aether)){
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
    
    restart.visible = true;
     
      mondstad.velocityX = 0;
      aether.velocityY = 0
      
     
      //definir tempo de vida aos objetos do jogo para que nunca sejam destruídos
      hillichurlg.setLifetimeEach(-1);

      hillichurlg.setVelocityXEach(0);
  
   }
  
 
  //impedir que o trex caia
  aether.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
    reset();
  }


  drawSprites();
}

function reset(){
  gameState = PLAY
  hillichurlg.destroyEach();
  score = 0;
}


function spawnHillichurl(){
 if (frameCount % 60 === 0){
   var hillichurl = createSprite(600,350,10,40);
   hillichurl.velocityX = -(4 + score/200);
   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: hillichurl.addImage(hillichurl1);
              break;
      case 2: hillichurl.addImage(hillichurl2);
              break;
      case 3: hillichurl.addImage(hillichurl3);
              break;
      default: break;
    }
             
    hillichurl.scale = 0.1;
    hillichurl.lifetime = 300;
   
    hillichurlg.add(hillichurl);
 }
}


