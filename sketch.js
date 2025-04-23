let posVec, velVec, haj

function setup() 
{
	createCanvas(600, 600);
    posVec = new Vector(300,100)
    velVec = new Vector(5,5)
    haj = new Hajfisk(posVec,velVec, "gray")
}

function draw()
{
    background("blue")
    haj.show("red")
    haj.update()
}
