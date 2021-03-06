var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood , feed , fedTime , lastFed ;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed");
  feed.position(800,355);
  feed.mousePressed(feedDog);

  
  foodObj = new Food();
  

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
    fedTime = database.ref("FeedTime")
    fedTime.on("value",function(data){
      lastFed = data.val()
    })
    
  
    fill("black")
    stroke("white")
    strokeWeight(1)

    if(lastFed>12){
    
     text("last Fed : " + lastFed + "PM",350,50)
    
       
       }
       else if(lastFed===0){
         text("last Fed : 12PM",350,50)
       }
       else{
         text("last Fed : "+ lastFed +"AM",350,50)
       }
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS -= 1
  database.ref("/").update({
    Food:foodS

  })
    

    
    
    
    
 
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
