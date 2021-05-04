var monkey, monkeyImg, ground, invisibleGround,bgImg, grassImg, bananaImg, stoneImg, backgroundSound, goImg, go, restart, restartImg, count,score, stopped_monkey, failed_sound;

var bananaGroup, stonesGrouop, grassGroup;

var PLAY = 1;
var END = 0;
gameState = PLAY;

function preload(){
  monkeyImg = loadAnimation("download (1).png", "download (2).png", "3.png", "4.png", "5.png", "6.png","6.png");
  bgImg = loadImage("forest.jpg");
  bananaImg = loadImage("b.png");
  stoneImg = loadImage("s.png");
  grassImg = loadImage("grass.png");
  goImg = loadImage("go.png")
  restartImg = loadImage("re.png");
stopped_monkey = loadAnimation("3.png");
  
  backgroundSound = loadSound("Dub Drums_97bpm.wav");
  failed_sound = loadSound("failed.mp3");
}
function setup() {
  createCanvas(600, 200);
  
  bg = createSprite(300,22);
  bg.addImage(bgImg);
  bg.scale = 1;
  
  monkey = createSprite(30,154);
  monkey.addAnimation("walking", monkeyImg);
  monkey.addAnimation("collided", stopped_monkey);
  monkey.scale =  0.7;
  monkey.setCollider("circle", 0, 0, 40);

  ground = createSprite(300,194,600,5);
  //ground.velocityX = -14;
  ground.x = ground.width/2;
  invisibleGround = createSprite(300, 190, 600, 5)
  invisibleGround.visible = false;
  
  go = createSprite(300,80);
  go.addImage(goImg);
  go.scale = 0.3;
  go.visible = false;
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  
  bananaGroup = new Group();
  stonesGroup = new Group();
  grassGroup = new Group();
  
  textSize(40);
  textFont("Edwardian Script ITC");
  textStyle(BOLD);
  
  count = 0;
  score = 0;
  
  backgroundSound.loop();
}

function draw() {
  background(100);
  console.log(frameCount);
  
  if(gameState === PLAY){
     //ground.velocityX = -(4+3*count/1000);
     
     count++;
     
     }
     if(keyDown("space") && monkey.y >= 150){
  
     monkey.velocityY = -12;
     }

     if(monkey.isTouching(bananaGroup)){
       bananaGroup.destroyEach();
       score++; 
     }
     monkey.velocityY = monkey.velocityY + 0.8;
    Banana();
    Grass();
    stone();
    plus();

     if(monkey.isTouching(stonesGroup)){
       gameState = END;
     }
    if(gameState === END){

       monkey.changeAnimation("collided", stopped_monkey);
       ground.velocityX = 0;
       go.visible = true;
       restart.visible = true;
       monkey.y = 180;
       monkey.scale = 0.7;
       stonesGroup.destroyEach();
       bananaGroup.destroyEach();
       grassGroup.destroyEach();
       backgroundSound.stop();

       if(mousePressedOver(restart)){
         gameState = PLAY;
         monkey.scale = 0.15;
         go.visible = false;
         restart.visible = false;
         score = 0;
         count = 0;
         monkey.changeAnimation("walking", monkeyImg);
         monkey.scale = 0.7;
         backgroundSound.loop();
       }

     }
      
  monkey.collide(invisibleGround);
  fill("white");
  rect(0,0,30, 20);
  drawSprites();
  text("Score:"+ count, 10,30);
  text("Eating Score:"+ score, 380,30);

}

function stone(){
  if(frameCount % 300===0){
    var stones;
    stones = createSprite(620,180);
    stones.velocityX = -5;
    stones.addImage(stoneImg);
    stones.scale = 0.4;
    stonesGroup.add(stones);
    stones.lifetime = 180;
  }
}


function Grass(){
  if(frameCount % 31===0){
    var grass;
    grass = createSprite(620, 180);
    grass.velocityX = -4;
    grass.addImage(grassImg);
    grass.scale = 0.5;
    grass.lifetime = 180;
    grassGroup.add(grass);
  }
}

function Banana(){
  if(frameCount % 60===0){
    var banana, rand;
    rand = Math.round(random(50,100))
    banana = createSprite(620, rand);
    banana.velocityX = -7;
    banana.addImage(bananaImg);
    banana.scale = 0.7;
    banana.lifetime = 180;
    banana.setCollider("circle");
    
    bananaGroup.add(banana);
  }
}

function plus(){
  switch(score){
        case 4: monkey.scale = 0.8;
          break;
        case 8: monkey.scale = 0.9;
          break;
        case 12: monkey.scale = 1;
          break;
        case 14: monkey.scale = 1.1;
          break;
        default: break;
      
        
    }
}