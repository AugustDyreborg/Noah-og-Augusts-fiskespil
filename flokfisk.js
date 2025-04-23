
class Fisk{
    #pos; #vel; #X; #Y
    constructor(pos,vel){
        this.#pos = pos;
        this.#vel = vel;
        this.#X = 60;
        this.#Y = 30;
    }

    update(){
        this.#pos=this.#pos.add(this.#vel)
        this.boundaryCheck()
    }

    show(col){
     
    }

    boundaryCheck(){
        if ((this.#pos.x > width) || (this.#pos.x < 0)) {
            this.#vel.x = this.#vel.x * -1;
        }
        if ((this.#pos.y > height) || (this.#pos.y < 0)) {
            this.#vel.y = this.#vel.y * -1;
        }
    }
}