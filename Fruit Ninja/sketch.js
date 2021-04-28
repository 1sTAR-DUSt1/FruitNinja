var sword, swordImg, swordSound;
var orangeImg, appleImg, pearImg, bananaImg, monsterImg, gameOverImage;

var fruitGroup, enemyGroup;

var touchedSnd, gameOverSnd;

var score = 0;

var PLAY = 0;
var END = 1;
var gameState = PLAY;


function preload(){
  swordImg = loadImage("sword.png");
  orangeImg = loadImage("fruit1.png");
  appleImg = loadImage("fruit2.png");
  pearImg = loadImage("fruit3.png");
  bananaImg = loadImage("fruit4.png");
  monsterAn = loadAnimation("alien2.png","alien1.png");
  gameOverImage=loadImage("gameover.png");
  
  touchedSnd = loadSound("knifeSwooshSound.mp3");
  gameOverSnd = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  sword = createSprite(200,200);
  sword.addImage("sword", swordImg);
  sword.scale=0.5;
  
fruitGroup=new Group();
enemyGroup=new Group();
}

function draw(){
background("lightblue");
  
  
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
if(gameState === PLAY){
  fruits();
  enemy();
}
  
  if(gameState === END){
    sword.addImage("sword", gameOverImage);
    sword.x = windowWidth/2;
    sword.y = windowHeight/2;
  }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score = score+2;
    touchedSnd.play();
  } else if(enemyGroup.isTouching(sword)){
    gameState = END;
    gameOverSnd.play();
  }
  
  
  
  text("score = " + score, windowWidth/2 - 20, windowHeight - 380);

  
  drawSprites();
}

function fruits(){
if(World.frameCount%80===0){
fruit=createSprite(400,200,20,20);
fruit.scale=0.2;
r=Math.round(random(1,4));
if(r === 1) {
fruit.addImage(orangeImg);
} else if(r === 2) {
fruit.addImage(appleImg)
} else if(r ===3){
fruit.addImage(pearImg)
} else if(r === 4){
fruit.addImage(bananaImg)
fruit.scale=0.01;
}
  
var rand = Math.round(random(1,2));
  if(rand === 1){
    fruit.x = 400;
    fruit.velocityX = -(score/10 + 9);
  } else if(rand === 2){
    fruit.x = 0;
    fruit.velocityX = (score/10 + 9);
  }

fruit.y = Math.round(random(50,340));
fruit.setLifetime=100;
  
  fruit.scale=0.2;

fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.y=Math.round(random(100,300));
    monster.setLifetime=50;
    enemyGroup.add(monster);
    
var rand = Math.round(random(1,2));
  if(rand === 1){
    monster.x = 400;
    monster.velocityX = -(score/10 + 9);
  } else if(rand === 2){
    monster.x = 0;
    monster.velocityX = (score/10 + 9);
  }
    
    monster.addAnimation("alienMonster", monsterAn);
  }


}