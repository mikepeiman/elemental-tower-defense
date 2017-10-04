//defense towers
// base tower 
var towers=[];

function Tower(x,y) {
  this.x = x,
  this.y = y}

Tower.prototype.r = rectWidth; //radius
Tower.prototype.rateOfFire = 5; //smaller means more bullets per second
Tower.prototype.name = 'Water';
Tower.prototype.range = rectWidth*5;
Tower.prototype.hurt = Enemy.prototype.maxLife/20;;
Tower.prototype.color = 'blue';
Tower.prototype.cost = 50;

Tower.prototype.findTarget = function() {
  //if no enemies, no target
  if(enemies.length === 0) {
    this.target = null;
    return;
  }
  //if target dead, remove target reference
  if(this.target && this.target.life <= 0) {
    this.target = null;
  }
  //find first enemy withing range and select that as tower's target
  for (var i = 0, j = enemies.length; i < j; i ++) {
    var dist = (enemies[i].x-this.x)*(enemies[i].x-this.x+rectWidth)+(enemies[i].y-this.y)*(enemies[i].y-this.y+rectWidth); //rectWidth included to look at center of rectangle, not top left corner
    if (dist < (this.range*this.range)) { //sqaure of range. avoice Math.sqrt which is expensive
      this.target = enemies[i];
      return; //only need a single target
    }
  }
};

Tower.prototype.findUnitVector = function() {
  if (!this.target) return false; //if there is no target, dont bother calculating unit vector
  var xDist = this.target.x-this.x;
  var yDist = this.target.y-this.y;
  var dist = Math.sqrt(xDist*xDist+yDist*yDist); 
  this.xFire = this.x+this.r*xDist/dist; //where turret ends and bullets start
  this.yFire = this.y+this.r*yDist/dist;
};

Tower.prototype.draw= function() {
  //draw outter circle
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x,this.y,this.r,0,2*Math.PI);
  context.fill();
  context.stroke();
  //draw turret
  context.beginPath();
  context.moveTo(this.x,this.y);
  context.lineTo(this.xFire,this.yFire);
  context.lineWidth = 3;
  context.stroke();
  context.lineWidth = 1;
};

Tower.prototype.fire = function() {
  this.rateOfFire--;
  if(this.target && this.rateOfFire <=0) {
    bullets.push(new Bullet(this.xFire,this.yFire,this.target,this.hurt,this.color));
    //reset this objects rateOfFire to the prototypes
    this.rateOfFire = this.constructor.prototype.rateOfFire;
  };
};

//other types of towers
//long range tower:

var Tower2 = function(x,y) {
  Tower.call(this,x,y);
}
Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.constructor = Tower2;
Tower2.prototype.name = 'Wood';
Tower2.prototype.range = Tower.prototype.range*1.7;//looking to double area, not radius or range
Tower2.prototype.hurt = Tower.prototype.hurt*1.5;
Tower2.prototype.color = 'green';
Tower2.prototype.cost = Tower.prototype.cost * 1.5;
Tower2.prototype.rateOfFire = Tower.prototype.rateOfFire / .8;

//short range high damage tower
var Tower3 = function(x,y) {
  Tower.call(this,x,y);
}
Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.constructor = Tower3;
Tower3.prototype.name = 'Fire';
Tower3.prototype.range = Tower.prototype.range * 1.7; //0.7 rather than 0.5 because looking at area
Tower3.prototype.hurt = Tower.prototype.hurt*2;
Tower3.prototype.color = 'red';
Tower3.prototype.cost = Tower.prototype.cost * 1.5;
Tower3.prototype.rateOfFire = Tower.prototype.rateOfFire / .6;

var Tower4 = function(x,y) {
  Tower.call(this,x,y);
}
Tower4.prototype = Object.create(Tower.prototype);
Tower4.prototype.constructor = Tower4;
Tower4.prototype.name = 'Earth';
Tower4.prototype.range = Tower.prototype.range * 2.7; //0.7 rather than 0.5 because looking at area
Tower4.prototype.hurt = Tower.prototype.hurt*5;
Tower4.prototype.color = 'brown';
Tower4.prototype.cost = Tower.prototype.cost * 5.5;
Tower4.prototype.rateOfFire = Tower.prototype.rateOfFire / .4;

var Tower5 = function(x,y) {
  Tower.call(this,x,y);
}
Tower5.prototype = Object.create(Tower.prototype);
Tower5.prototype.constructor = Tower5;
Tower5.prototype.name = 'Metal';
Tower5.prototype.range = Tower.prototype.range * 3.7; //0.7 rather than 0.5 because looking at area
Tower5.prototype.hurt = Tower.prototype.hurt*5;
Tower5.prototype.color = 'white';
Tower5.prototype.cost = Tower.prototype.cost * 10.5;
Tower5.prototype.rateOfFire = Tower.prototype.rateOfFire / 0.2;

//populate array of towers
//this is used to figure out which 
//class of tower to add when mouse is clicked
var towerClasses = [Tower,Tower2,Tower3,Tower4,Tower5];
