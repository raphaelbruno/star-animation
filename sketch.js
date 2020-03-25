var amount = 500;
var velocity = 5;
var stars = new Array();

function mouseClicked() {
  velocity += 5;
  if(velocity > 20) velocity = 5;
}

function setup() {
  createCanvas(600, 400);
  
  for(let i = 0; i < amount; i++)
    stars.push(new Star(random(-width/2, width), random(-height/2, height), 6));
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  for(let i = 0; i < amount; i++)
    stars[i].render();
  
}

class Star{
  constructor(x, y, maxRadius){
    this.x = 0;
    this.y = 0;
    this.z = random(width);
    
    this.firstX = x;
    this.firstY = y;
    this.maxRadius = maxRadius ? maxRadius : 5;
  }
  
  recalculate(){
    this.lastX = this.x;
    this.lastY = this.y;
    this.z -= velocity;
    
    if(this.z <= 1){
      this.z = width;
      this.lastX = 0;
      this.lastY = 0;
    }
    
    this.x = map(this.firstX / this.z, 0, 1, 0, width);
    this.y = map(this.firstY / this.z, 0, 1, 0, height);
    this.radius = map(this.z, 0, width, this.maxRadius, 0);
  }
  
  render(){
    this.recalculate();
    
    if(this.lastX != 0 && this.lastY != 0){
      strokeWeight(2);
      stroke(255, 100);
      line(this.lastX, this.lastY, this.x, this.y);
    }
    
    noStroke();
    fill(255);
    circle(this.x, this.y, this.radius);
  }
}