let keys = {a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,j:74,m:77,n:78,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90}
let controls = {i:73,o:79,p:80,k:75,l:76}
let change = {1:49,2:50,3:51,4:52,5:53}
let ctx;
let lead;
let blocks;
let dir;
let flag  = false;
let recordF = false;
let recordTrack = new Array();
let color=(255,255,255);
let initSound = "acoustic_grand_piano"
let x =  y = 400;
let dx = 0;
let dy = 0;
let c = d = z = 0;
let markov;
let midi = new Array;
let feedback;
let lengthMidi = 10;
let autoMidi;
let nIntervId;

function preload(){
  ctx = getAudioContext();
  lead = Soundfont.instrument(ctx, initSound); 
  pg = createGraphics(100,100);
}

function setup() {
  createCanvas(750,600);
  noStroke();
  background(20);

  fill(0, 12);
  rect(0, 0, width, height);
  noStroke();

  recordTrack[0]=""
}

function draw() {

  fill(0, 12);
  rect(0, 0, width, height);
  noStroke();
  
/*  fill(255,0,0);
  rect(mouseX-30, mouseY-30, 60, 60,10);*/

  if (flag){
    fill(color);
    blocks = rect(x, y, 60, 60,10);
    x += dx;
    y += dy;
    if (x>width||x<-100||y>height||y<-100) flag = false;
  }
  

  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      fill(255,255,255,200);
      rect(85+85*j, 200+85*i, 60, 60, 10);
    }
  }
  image(pg, 150, 75);
}


function keyPressed() {
    if (keys[key]) {
        x = 400
        color = [random(0, 255), random(0,255), random(0,255)];
        note = keys[key] 
        play(note) 
        if (random(0,1)>=0.5) {
          dx = random(-1,1) * 40;
          dy = 0;
        } else {
          dx = 0;
          dy = random(-1,1) * 40;
        }
        switch(keys[key]){
          case 65:
            x = 85;
            y = 285;
            break;
          case 66:
            x = 425;
            y = 370;
            break;
          case 67:
            x = 255;
            y = 370;
            break;
          case 68:
            x = 255;
            y = 285;
            break;
          case 69:
            x = 255;
            y = 200;
            break;
          case 70:
            x = 340;
            y = 285;
            break;
          case 71:
            x = 425;
            y = 285;
            break;
          case 72:
            x = 510;
            y = 285;
            break;
          case 74:
            x = 595;
            y = 285;
            break;
          case 77:
            x = 595;
            y = 370;
            break;
          case 78:
            x = 510;
            y = 370;
            break;
          case 81:
            x = 85;
            y = 200;
            break;
          case 82:
            x = 340;
            y = 200;
            break;
          case 83:
            x = 170;
            y = 285;
            break;
          case 84:
            x = 425;
            y = 200;
            break;
          case 85:
            x = 595;
            y = 200;
            break;
          case 86:
            x = 340;
            y = 370;
            break;
          case 87:
            x = 170;
            y = 200;
            break;
          case 88:
            x = 170;
            y = 370;
            break;
          case 89:
            x = 510;
            y = 200;
            break;
          case 90:
            x = 85;
            y = 370;
            break;
          default:
            break;
        }

        if (recordF) {
          if (c == lengthMidi) {
            c = 0; 
            d ++;
            recordTrack[d] = "";
          }
          c++;
          recordTrack[d] += keys[key];
          if (c < lengthMidi){
            recordTrack[d] += " ";
          }
        }
        flag = true;
    }

    if(change[key]){
      console.log(change[key])
      switch(change[key]){
        case 49:
          initSound = "acoustic_grand_piano"
          break;
        case 50: 
          initSound = "electric_piano_1"
          break;
        case 51: 
          initSound = "fx_5_brightness"
          break;
        case 52: 
          initSound = "electric_guitar_clean"
          break;
        case 53: 
          initSound = "fx_7_echoes"
          break;
      }
      console.log(initSound)
      lead = Soundfont.instrument(ctx, initSound); 
    }

    if (controls[key]){
      switch(controls[key]){
        case 73:
          d = 0;
          c = 0;
          recordTrack.length = 0;
          recordTrack[0] = "";
          recordF = true;
          break;
        case 79:
          recordF = false;
          console.log(recordTrack)
          break;
        case 80:
          feedback = new MarkovChains(recordTrack);
          console.log(feedback.note)
          autoPlay(feedback.note)
          break;
        default:
          break;
      }
    }
}

function play(midinote) {
    lead.then(function (inst) {
        inst.play(midinote , 0, {
            loop: false
        });
    });
}

function autoPlay(midinote) {
  autoMidi = midinote.split(" ");
  autoMidi.pop();
  console.log(autoMidi)

  z = 0;
  nIntervId = setInterval(delayplay, 500);
}

function delayplay(){
  lead.then(function (inst) {
    inst.play(autoMidi[z] , 0, {
      loop: false
    });
  });
  z++
  if (z > autoMidi.length) stopFunction();
}

function stopFunction() {
  clearInterval(nIntervId)
}