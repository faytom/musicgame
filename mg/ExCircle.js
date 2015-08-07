var ExCircle = function(position, raduis){
  this.raduis = raduis;
  this.position = createVector(position.x, position.y);
  this.lifespan = 100;
  this.expandspeed = 5;
  this.fadingspeed = 8;
}

ExCircle.prototype.update = function(){
  this.raduis += this.expandspeed;
  this.lifespan -= this.fadingspeed;
}

ExCircle.prototype.isDead = function() {
  if(this.lifespan < 0){
    return true;
  }
  else {
    return false;
  }
}

ExCircle.prototype.display = function(){
  fill(170, 80, 170, this.lifespan);
  noStroke();
  ellipse(this.position.x, this.position.y, this.raduis, this.raduis);
}