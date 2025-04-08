
class Fisk{
    #pos; #has; #X; #Y
    constructor(pos,vel){
        this.#pos = pos;
        this.#has = vel;
        this.#X = 60;
        this.#Y = 30;
    }

    update(){
        this.#pos=this.#pos.add(this.#has)
        this.boundaryCheck()
    }

    show(col){
     
    }

    boundaryCheck(){
        // check that the fish is inside the canvas
        if ((this.#pos.x > width) || (this.#pos.x < 0)) {
            this.#has.x = this.#has.x * -1;
        }
        if ((this.#pos.y > height) || (this.#pos.y < 0)) {
            this.#has.y = this.#has.y * -1;
        }
    }
}