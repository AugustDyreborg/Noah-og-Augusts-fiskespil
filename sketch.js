class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    add(v) {
      return new Vector(this.x + v.x, this.y + v.y);
    }
  
    sub(v) {
      return new Vector(this.x - v.x, this.y - v.y);
    }
  
    mult(n) {
      return new Vector(this.x * n, this.y * n);
    }
  
    mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  
    normalize() {
      let m = this.mag();
      return m > 0 ? this.mult(1 / m) : new Vector(0, 0); //normalize gør at den ikke ændre gamle vectorere, men de har en værdi af 1 
    }
  }
  
  class FlokFisk {
    constructor(pos, vel) {
      this.pos = pos;
      this.vel = vel;
      this.sizeX = 60;
      this.sizeY = 30;
    }
  
    update() {
      this.pos = this.pos.add(this.vel);
      this.checkEdges();
    }
  
    show(col) {
      fill(col);
      ellipse(this.pos.x, this.pos.y, this.sizeX, this.sizeY);
      triangle(
        this.pos.x - this.sizeX / 2, this.pos.y,
        this.pos.x - this.sizeX, this.pos.y - this.sizeY / 2,
        this.pos.x - this.sizeX, this.pos.y + this.sizeY / 2
      );
      fill("white");
      circle(this.pos.x + this.sizeX / 4, this.pos.y - this.sizeY / 6, 8);
    }
  
    checkEdges() {
      if (this.pos.x < this.sizeX / 2 || this.pos.x > width - this.sizeX / 2) {
        this.vel.x *= -1;
      }
      if (this.pos.y < this.sizeY / 2 || this.pos.y > height - this.sizeY / 2) {
        this.vel.y *= -1;
      }
    }
  }
  
  class HajFisk extends FlokFisk { //børne class, så bruger de samme atributter og metoder
    constructor(pos, vel) {
      super(pos, vel);
      this.sizeX = 80;
      this.sizeY = 40;
    }
  
    update(fisk) {
      let nærmest = null;
      let nærmesteDistance = 200;
  
      for (let f of fisk) {
        let d = dist(this.pos.x, this.pos.y, f.pos.x, f.pos.y);
        if (d < nærmesteDistance) {
          nærmest = f;
          nærmesteDistance = d;
        }
      }
  
      if (nærmest) {
        let retning = nærmest.pos.sub(this.pos).normalize().mult(0.1);
        this.vel = this.vel.add(retning).normalize().mult(1.2);
      }
  
      super.update();
    }
  
    show() {
      fill(150);
      ellipse(this.pos.x, this.pos.y, this.sizeX, this.sizeY);
      triangle(
        this.pos.x - this.sizeX / 2, this.pos.y,
        this.pos.x - this.sizeX, this.pos.y - this.sizeY / 2,
        this.pos.x - this.sizeX, this.pos.y + this.sizeY / 2
      );
      fill("red");
      circle(this.pos.x + this.sizeX / 4, this.pos.y - this.sizeY / 6, 10);
    }
  }
  
  let fisk = [];
  let hajer = [];
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
  
    for (let i = 0; i < 8; i++) {
      let pos = new Vector(random(width), random(height));
      let vel = new Vector(random(-1, 1), random(-1, 1)).normalize().mult(2);
      fisk.push(new FlokFisk(pos, vel));
    }
  
    for (let i = 0; i < 2; i++) {
      let pos = new Vector(random(width), random(height));
      let vel = new Vector(random(-0.5, 0.5), random(-0.5, 0.5));
      hajer.push(new HajFisk(pos, vel));
    }
  }
  
  function draw() {
    background(0, 50, 100);
  
    for (let f of fisk) {
      f.update();
      f.show(color(255, 215, 0));
    }
  
    for (let h of hajer) {
      h.update(fisk);
      h.show();
  
      for (let i = fisk.length - 1; i >= 0; i--) {
        let d = dist(h.pos.x, h.pos.y, fisk[i].pos.x, fisk[i].pos.y);
        if (d < 30) {
          fisk.splice(i, 1);
        }
      }
    }
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight); //gør den tilpasser sig, og uden det der mellemrum man altid har.
  }
  