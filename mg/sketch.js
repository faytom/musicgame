var 
  STAGE_WAITING = 0,
  STAGE_PLAYING = 1,
  STAGE_OVER = 2;

function r(name) {
  return 'mg/data/' + name;
}
resource : {};
var game = {
  stage: STAGE_WAITING,
  stages: {
    0: {
      op: 255,
      opInc: 10

    },
    1: {
      startsAt: 0,
      pauseT: 4000,
      compensated: 0,
      combo: [],
      comboNum: 0

    },
    2: {
      finalScore: 0
    }
  },
  score: 0,
  movers : [],
  sn1movers : [],
  sn2movers : [],
  sn3movers : [],
  beatsTiming : [1.70, 2.79, 3.86, 4.96, 6.05, 7.12, 8.25, 9.35, 10.4, 11.56, 12.6, 13.73, 14.81],
  sn1Timing : [17.52, 18.62, 19.71, 20.81, 26.30, 27.4, 28.5, 29.60, 35.67, 36.17, 37.26,38.38, 43.89, 44.99, 46.08, 47.19, 52.64, 53.74, 54.84, 61.41, 62.51, 63.61],
  sn2Timing : [18.07, 19.15, 20.26, 21.35, 22.46, 23.56, 24.65, 25.76, 26.83, 27.95, 29.05, 30.14, 31.24, 32.34, 35.64, 36.73, 37.83, 38.93, 40.02, 41.12, 42.22, 43.32, 44.434, 45.53, 46.64, 47.73, 48.83, 49.92, 53.19, 54.29, 55.39, 57.57, 58.68, 59.73, 61.95, 63.07, 64.17, 66.36, 67.47, 68.56, 70.72, 71.84, 72.93, 75.15, 76.26, 77.35, 78.45],
  sn3Timing : [21.91, 23.01, 24.11, 25.20, 30.69, 31.77, 32.89, 39.48, 40.56, 41.67, 42.77, 48.28, 49.38, 50.47, 57, 58.13, 59.23, 65.82, 66.91, 68.02, 74.6, 75.73, 76.80, 77.89, 78.99],
  expandCircle : [],
  comboMiss : false,
  particleSys : []
}

var testRadius = 50;
var dicsLocation;


game.stageWaiting = function(){
  game.stage = STAGE_WAITING;
  displayLandingPage();

}
game.stagePlaying = function(){
  game.stage = STAGE_PLAYING;
  this.drawPlaying();
}

game.drawPlaying = function() {
    var ellipsed = millis()  - game.stages[STAGE_PLAYING].startsAt - game.stages[STAGE_PLAYING].compensated;
    if(ellipsed > game.stages[STAGE_PLAYING].pauseT){
      if(!resource.BGM.isPlaying()){
        resource.BGM.play();

        var ellipsedAfterPlay = millis()  - game.stages[STAGE_PLAYING].startsAt;
        var differ = ellipsedAfterPlay - ellipsed;
        if(differ > 300 && differ > game.stages[STAGE_PLAYING].compensated){
          game.stages[STAGE_PLAYING].compensated = differ;
          ellipsed = ellipsed - game.stages[STAGE_PLAYING].compensated;
        }
      }
    }

    

    fill(255,255,255);

    //text(nf(game.stages[STAGE_PLAYING].compensated,2,2), width/2, height*2/5);
    //display fraterate on canvas
    //text(nf(frameRate(), 2, 2), width/2, height/3);
    showScore();
    displayExpandCircle();
    drawMusicNotes(game.movers, resource.sn1, true, ellipsed/1000);
    drawMusicNotes(game.sn1movers, resource.sn1, false, ellipsed/1000);
    drawMusicNotes(game.sn2movers, resource.sn2, false, ellipsed/1000);
    drawMusicNotes(game.sn3movers, resource.sn3, false, ellipsed/1000);

    drawCombos();

    if(ellipsed >= 91000){
      game.stage = 2;
      game.stages[STAGE_OVER].finalScore = game.score;
    }

    
    //showTime();
}

game.draw = function(){
  if(this.stage === STAGE_WAITING){
    this.stageWaiting();
  }
  if(this.stage === STAGE_PLAYING){
    this.stagePlaying();
  }
  if(this.stage == STAGE_OVER){
    showResult();
  }
}

function drawParcitles() {
  for(var j = 0; j < game.particleSys.length; j++)
  {
    if(!game.particleSys[j].areAllDead()){
      game.particleSys[j].update();
      game.particleSys[j].display();  
    }
    else{
      game.particleSys.splice(j,1);
    }
  }
}

function drawCombos() {
  for( var k = 0; k < game.stages[STAGE_PLAYING].combo.length; k++ ){
    var c = game.stages[STAGE_PLAYING].combo[k];
    if(!c.isDead()){
      c.update();
      c.display();
    }
    else{
      game.stages[STAGE_PLAYING].combo.splice(k, 1);
    }  
  }
}

function drawBackground(){
  background("#255C69");

  push();
  noStroke();
  translate(dicsLocation.x, dicsLocation.y);
  if(game.stage === STAGE_PLAYING){
    rotate(map(millis()%1000, 0, 999, 0, 2*PI));
  }
  translate(-25, -25);
  rect(0, 0, 50, 50);
  pop();
}


var resource  = {};

function preload() {

  resource = {
    'BGM': loadSound(r('bgm.mp3')),
    'myFont': loadFont(r('Showcard_Gothic.ttf')),
    'img': loadImage(r('sprite.png')),
    'blackhole': loadImage(r('CD-pale.png')),
    'n1': loadSound(r('1.mp3')),
    'n2': loadSound(r('2.mp3')),
    'n3': loadSound(r('3.mp3')),
    'n4': loadSound(r('4.mp3')),
    'n5': loadSound(r('5.mp3')),
    'n6': loadSound(r('6.mp3')),
    'n7': loadSound(r('7.mp3')),
    'n8': loadSound(r('8.mp3')),
    'n9': loadSound(r('9.mp3')),
    'n10': loadSound(r('10.mp3')),
    'n11': loadSound(r('11.mp3')),
    'n12': loadSound(r('12.mp3')),
    'n13': loadSound(r('13.mp3')),
    'sn1': loadSound(r('sn1.mp3')),
    'sn2': loadSound(r('sn2.mp3')),
    'sn3': loadSound(r('sn3.mp3'))
  }
  resource.BGM.setVolume(0.5);
  resource.sn1.setVolume(1);
  resource.sn2.setVolume(1);
  resource.sn3.setVolume(1);
}

function setup() {
  var canvas = createCanvas(window.innerWidth/2, window.innerHeight/2);
  canvas.style("z-index", "-1");
  canvas.style("width", "100%");
  canvas.style("height", "100%");
  canvas.position(0,0);
  frameRate(30);
  textAlign(CENTER, CENTER);
  textFont(resource.myFont);
  dicsLocation = createVector(width/2, height/2);

}


function draw() {
  
  drawBackground();
  game.draw();
  
}


function showResult(){
  fill(255);
  textSize(70);
  textAlign(CENTER, CENTER);
  text("Final Score", width/2, height/3);
  textSize(90);
  text(str(game.stages[STAGE_OVER].finalScore), width/2, height/2);
}

function gameStart(){
  
  if(!resource.BGM.isPlaying()){
    
    calcEmitTime(game.movers, game.beatsTiming);
    calcEmitTime(game.sn1movers, game.sn1Timing);
    calcEmitTime(game.sn2movers, game.sn2Timing);
    calcEmitTime(game.sn3movers, game.sn3Timing);

    game.stages[STAGE_PLAYING].startsAt = millis();
    console.log("Game Started ran");
  }
}

function showSongLength(){
  fill(255);
  noStroke();
  rect(0, 0, map(time + game.stages[STAGE_PLAYING].pauseT/1000, 0, 95, width, 0), height/80, 4);
  
}

function calcEmitTime(mover, noteTiming){
  for(var i = 0; i < noteTiming.length; i++){
    mover.push(new Mover(createVector(random(1/3, 2/3)*width, height)));
    var m = mover[mover.length - 1];
    m.note = i + 1;
    m.calcArrivalTime();
    m.emitTime = noteTiming[i] + game.stages[STAGE_PLAYING].pauseT/1000 - m.arrivalTime;
  }
}

function drawMusicNotes(mover, music, flag, ellipsedTime){
  for(var i = 0; i < mover.length; i++){
    var m = mover[i];
    if(!m.deadFlag && ellipsedTime >= m.emitTime){
        m.update();
        m.display();
    }
      
    if(m.deadFlag){
      
      if(!m.fading){

        if(flag){
          m.playMusic(m.note);
        }
        else{
          music.play();
        }
      }
      mover.splice(i,1);
    }
  }
}

function displayExpandCircle(){
  for(var i = 0; i < game.expandCircle.length; i++){
    var c = game.expandCircle[i];
    if(!c.isDead()){
      c.update();
      c.display();
    }
    else{
      game.expandCircle.splice(i, 1);
    }
  }
}
function gripInput(){
  
  game.expandCircle.push(new ExCircle(dicsLocation, 50));
  
  testCapture(game.movers);
  testCapture(game.sn1movers);
  testCapture(game.sn2movers);
  testCapture(game.sn3movers);

  if(game.movers.length){
    testCombo(game.movers);
  }
  else{
    testCombo(game.sn1movers);
    testCombo(game.sn2movers);
    testCombo(game.sn3movers);
  }
  
}

function testCapture(mover) {
  for(var i = 0; i < mover.length; i++){
    var m = mover[i];
    m.testCapture();
  }
}





function testCombo(mvs) {
  for(var i = 0; i < mvs.length; i++){
    if(mvs[i].captureFlag && mvs[i].deadFlag){
      game.stages[STAGE_PLAYING].comboNum++;
      game.score += game.stages[STAGE_PLAYING].comboNum;
      game.stages[STAGE_PLAYING].combo.push(new Combo(dicsLocation, game.stages[STAGE_PLAYING].comboNum));
      game.comboMiss = false;
      break;
    }
    else{
      if(mvs[i].dis2center.mag() > testRadius && mvs[i].position.y > dicsLocation.y){}
      else if(mvs[i].dis2center.mag() > testRadius && mvs[i].position.y < dicsLocation.y){
        if(!mvs[i].comboDead){
          mvs[i].comboDead = true;
          game.stages[STAGE_PLAYING].comboNum = 0;
          break;
        }
      }
    }
  }
}

function showScore(){
  fill(255, 255, 255);
  textSize(50);
  text("SCORE", width*4/5, height/10);
  text(str(game.score), width*4/5, height/5);
}

function displayLandingPage(){
  var opacity = game.stages[STAGE_WAITING].op
  fill(255, 237, 255, opacity);
  if(opacity >= 255 || opacity <= 0){
    game.stages[STAGE_WAITING].opInc *= -1;
  }
  game.stages[STAGE_WAITING].op += game.stages[STAGE_WAITING].opInc;
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Grip to play", width/2, height*3/4);
}

function touchStarted() {
  if(game.stage === STAGE_WAITING){
    gameStart();
    game.stagePlaying();
  }

  if(game.stage === STAGE_OVER){
    game.score = 0;
    game.stages[STAGE_PLAYING].comboNum = 0;
    game.stages[STAGE_OVER].finalScore = 0;
    game.stageWaiting();
  }

  if(game.stage === STAGE_PLAYING){
    gripInput();
  }

}

function showTime(time) {
  textAlign(CENTER,CENTER);
  textSize(40);
  fill(255);
  text(str(nf(time-game.stages[STAGE_PLAYING].pauseT/1000, 3, 2)), width/2, height/5);
}
