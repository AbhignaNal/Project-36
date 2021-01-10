var dog, happyDog, dogImg;
var database; 
var foodS, foodStock;
var addFood, feed;
var feedingTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(1000, 500);

  database = firebase.database();
  
  dog = createSprite(270, 420, 100, 100);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton('Feed The Dog');
  feed.position(700, 95);
  feed.mousePressed(feedDog);
  addFood = createButton('Add Food');
  addFood.position(800, 95)
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);

  //foodObj.display();

  drawSprites();

  textFont("Times New Roman");
  fill("white");


  text("Food Remaining:" + " " + foodS, 220, 300);
  //text("Note: Press UP_ARROW Key To Feed Drago Milk.", 140, 30);
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    Food: x
  })
}

function feedDog(){
  foodS--;
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}