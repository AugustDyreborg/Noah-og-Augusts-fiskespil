class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
}

class Fisk {
    #pos; #vel; #X; #Y;
    constructor(pos, vel) {
        this.#pos = pos;
        this.#vel = vel;
        this.#X = 60;
        this.#Y = 30;
    }

    update() {
        this.#pos = this.#pos.add(this.#vel);
        this.boundaryCheck();
    }

    boundaryCheck() {
        if ((this.#pos.x > width) || (this.#pos.x < 0)) {
            this.#vel.x *= -1;
        }
        if ((this.#pos.y > height) || (this.#pos.y < 0)) {
            this.#vel.y *= -1;
        }
    }
}

class Hajfisk {
    #pos; #vel; #sizeX; #sizeY; #color;
    constructor(pos, vel, color) {
        this.#pos = pos;
        this.#vel = vel;
        this.#sizeX = 60;
        this.#sizeY = 30;
        this.#color = color;
    }

    update() {
        this.#pos = this.#pos.add(this.#vel);
        this.boundaryCheck();
    }

    show() {
        strokeWeight(3);
        fill(this.#color);
        triangle(
            this.#pos.x, this.#pos.y,
            this.#pos.x - this.#sizeX - 20, this.#pos.y - this.#sizeY / 2 - 10,
            this.#pos.x - this.#sizeX - 20, this.#pos.y + this.#sizeY / 2 + 10
        );
        ellipse(this.#pos.x + 20, this.#pos.y, this.#sizeX * 2, this.#sizeY * 2);
        
        triangle(
            this.#pos.x + 30, this.#pos.y + 5,
            this.#pos.x - this.#sizeX + 50, this.#pos.y - this.#sizeY / 2 + 5,
            this.#pos.x - this.#sizeX + 50, this.#pos.y + this.#sizeY / 2 + 5
        );

        fill("red");
        strokeWeight(10);
        circle(this.#pos.x + this.#sizeX / 4 + 35, this.#pos.y - this.#sizeY / 4, 4);
    }

    boundaryCheck() {
        if ((this.#pos.x > width) || (this.#pos.x < 0)) {
            this.#vel.x *= -1;
        }
        if ((this.#pos.y > height) || (this.#pos.y < 0)) {
            this.#vel.y *= -1;
        }
    }
}

let posVec, velVec, haj;

function setup() {
    createCanvas(600, 600);
    posVec = new Vector(300, 100);
    velVec = new Vector(5, 5);
    haj = new Hajfisk(posVec, velVec, "gray");
}

function draw() {
    background("blue");
    haj.show();
    haj.update();
}