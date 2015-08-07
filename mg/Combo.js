//----------------Mover Class-----------------------
var Combo = function(position, combo){
  this.position = createVector(position.x, position.y - height/10);
  this.velocity = createVector(0, -4);
  this.lifespan = 255.0;
  this.combo = combo;
};

Combo.prototype.update = function(){
  this.position.add(this.velocity);
  this.lifespan -= 10;
  
};

Combo.prototype.display = function(){
  fill(255, 255, 255, this.lifespan);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("combo " + " " + str(this.combo), this.position.x, this.position.y);
};

Combo.prototype.isDead = function(){
  
  if (this.lifespan <= 0) {
    return true;
  } else {
    return false;
  }
};
//-----------------------------------------------------