let gravity = 0.5;
let lengthMult = 70000000;
let pendulums = [];
let num = 15;
let freq0 = 51;
let c = ["black", "green"];
let midiNotes = [
  91, 88, 84,
  79, 76, 72,
  67, 64, 60,
  55, 52, 48,
  43, 40, 36
];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < num; i++) {
    let period = 1 / (freq0 + i);
    let length = gravity * pow((period / TWO_PI), 2) * lengthMult;
    let s = 18;
    pendulums[i] = new Pendulum(length, c[i % c.length], s, midiNotes[i % midiNotes.length]);
  }        
}

function draw() {
  background("grey");
  translate(width / 2, 0);
    
  // Draw the wooden beam at the top
  stroke(120, 72, 16);
  strokeWeight(22);
  line(-75, 0, 75, 0);
  strokeWeight(2);

  for (let i = 0; i < num; i++) {
    pendulums[i].update();
    pendulums[i].display();
  }
}
