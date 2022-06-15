var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 10;

var gameState = "fight"
var zombies = 5


function preload() {

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bullet.png")
  youdiedImg = loadImage("assets/youdied.png")
  otf = loadImage("assets/OutOfAmmo.png")
  uwon = loadImage("assets/youwon.png")
  reset = loadImage("assets/reset.png")
}

function setup() {


  createCanvas(windowWidth, windowHeight);


  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1



  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)



  bulletGroup = new Group()
  zombieGroup = new Group()



}

function draw() {
  background(0);
  drawSprites();
  if (gameState === "fight") {

    
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30
    }


    if (keyWentDown("space") || touches.length > 0 ) {
      bullet = createSprite(displayWidth - 1150, player.y - 30, 20, 10)
      bullet.addImage(bulletImg)
      bullet.scale=0.05
      
      bullet.velocityX = 20

      bulletGroup.add(bullet)
      
      player.depth = bullet.depth + 2     
      player.addImage(shooter_shooting)

      bullets = bullets - 1
    } 
    else if (keyWentUp("space")) {
      player.addImage(shooterImg)
    }

    if (bullets == 0) {
      gameState = "bullet"
      resetbutton = createSprite(width-200 , 100)
      resetbutton.addImage(reset)
    }


    if (zombieGroup.isTouching(bulletGroup)) {
      for (var i = 0; i < zombieGroup.length; i++) {

        if (zombieGroup[i].isTouching(bulletGroup)) {
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
          zombies -= 1
        }

      }
    }
    if(zombies <= 0 ){
      gameState = "won"
    }

    enemy();
  }


  if (gameState == "won") {
    bg.addImage(uwon)
    bg.scale = 5
    zombieGroup.destroyEach();
    player.destroy();
    resetbutton = createSprite(width-200 , 100)
    resetbutton.addImage(reset)
    if(mousePressedOver(resetbutton)){
      location.reload()
    }

  } else if (gameState == "bullet") {

    bg.addImage(otf)
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
    if(mousePressedOver(resetbutton)){
      location.reload()
    }

  }

}



function enemy() {
  if (frameCount % 50 === 0) {


    zombie = createSprite(random(500, 1100), random(100, 500), 40, 40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug = true
    zombie.setCollider("rectangle", 0, 0, 400, 830)

    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }

}