
var Mover = function(position){
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(random(-2,2), random(-2,2));
  this.acceleration = createVector(0, 0);
  this.lifespan = 150.0;
  this.center = dicsLocation;
  this.topspeed = 7.0;
  this.arrivalTime = 0.0;
  this.emitTime = 0.0;
  this.initLocation = createVector(position.x, position.y);
  this.maxDistance = new p5.Vector.sub(this.center, this.initLocation).mag();
  this.dis2original = createVector(width,height);
  this.dis2center = new p5.Vector.sub(this.center, this.initLocation);
  this.fading = false;
  this.deadFlag = false;
  //this.rotation = random(TWO_PI);
  this.note = 0;
  this.captureFlag = false;
  this.comboDead = false;

};

Mover.prototype.update = function(){
  this.dis2original = new p5.Vector.sub(this.position, this.initLocation);
  this.dis2center = new p5.Vector.sub(this.center, this.position);
  
  if(this.dis2original.mag() >= this.maxDistance + testRadius){
    this.fading = true;
  }
  if(!this.fading){
    this.acceleration = new p5.Vector.sub(this.center, this.position);
    this.acceleration.setMag(0.25);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
  }
  else{
    this.lifespan -= 3;
  }
  
  if(this.lifespan <= 0){
    this.deadFlag = true;
  }
  
  this.position.add(this.velocity);
  
};

Mover.prototype.display = function(){
  noStroke();
  //imageMode(CENTER);
  //push();
  //translate(this.position.x, this.position.y);
  //tint(255, 255, 255, this.lifespan);
  fill(255, 255, 255, this.lifespan);
  ellipse(this.position.x,this.position.y,30, 30);
  //image(resource.img, 0, 0, 30, 30);
  //pop();
};

Mover.prototype.isDead = function(){
  
  if (this.dis2center.mag() <= testRadius) {
    return true;
  } else {
    return false;
  }
};

Mover.prototype.calcArrivalTime = function(){
  var acceleration = createVector(0,0);
  var velocity = createVector(this.velocity.x, this.velocity.y);
  var position = createVector(this.position.x, this.position.y);
  var topspeed = 6.0;
  var iteration = 0.0;
  for(var i = 0; i < 150; i++){
    acceleration = new p5.Vector.sub(this.center, position);
    acceleration.setMag(0.25);
    velocity.add(acceleration);
    velocity.limit(topspeed);
    position.add(velocity);
    if(p5.Vector.dist(this.center, position) <= testRadius){
      iteration = i;
      //textSize(30);
      //fill(255);
      //text(p5.Vector.dist(this.center, position), width/4, height/4);
      break;
    }
  }
  this.arrivalTime = (iteration/30);
}

Mover.prototype.testCapture = function(){
  this.deadFlag = this.isDead();
  this.captureFlag = this.isDead();
}

Mover.prototype.playMusic = function(note){
  
  switch(note){
    case 1:
      resource.n1.play();
      break;
    case 2:
      resource.n2.play();
      break;
    case 3:
      resource.n3.play();
      break;
    case 4:
      resource.n4.play();
      break;
    case 5:
      resource.n5.play();
      break;
    case 6:
      resource.n6.play();
      break;
    case 7:
      resource.n7.play();
      break;
    case 8:
      resource.n8.play();
      break;
    case 9:
      resource.n9.play();
      break;
    case 10:
      resource.n10.play();
      break;
    case 11:
      resource.n11.play();
      break;
    case 12:
      resource.n12.play();
      break;
    case 13:
      resource.n13.play();
    default:
      break;
    
  }
}