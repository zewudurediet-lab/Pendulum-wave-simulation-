class Pendulum {
  constructor(length, c, size, note) {
    this.length = length;
    this.angle = radians(45);
    this.angleV = 0;
    this.angleA = 0;
    this.prevAngle = this.angle; 
    this.c = c;
    this.size = size;
    this.note = note;
    
    this.osc = new p5.Oscillator('triangle');
    this.env = new p5.Envelope();
    this.osc.amp(0);              
    this.osc.start();             
    this.env.setADSR(0.001, 0.12, 0.08, 0.18);
  }

  update() {
    let g = (typeof gravity !== 'undefined') ? gravity : 0.4;
    this.angleA = -g / this.length * sin(this.angle);
    this.angleV += this.angleA;
    this.angle += this.angleV;

    this.x = this.length * sin(this.angle);
    this.y = this.length * cos(this.angle);

    let crossing = (this.prevAngle < 0 && this.angle >= 0) || (this.prevAngle > 0 && this.angle <= 0);

    if (crossing) {
      let baseFreq = midiToFreq(this.note);
      this.osc.freq(baseFreq * random(0.997, 1.003));

      let fadeIn = map(millis(), 0, 5000, 0, 1, true); 
      let amp = constrain(0.06 + abs(this.angleV) * 0.2, 0, 0.14) * fadeIn;

      this.env.setRange(amp, 0);
      this.env.play(this.osc);
    }

    this.prevAngle = this.angle;
  }

  display() {
    stroke(this.c);
    strokeWeight(2);
    line(0, 0, this.x, this.y);
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
