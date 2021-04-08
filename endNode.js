

class EndNode{
    constructor(posx,posy,size){
        this.pos = createVector(posx,posy);
        this.size = size;
     

    }
    show(){
        push();
        noStroke();
        fill("#ff0000");
        rect(this.pos.x,this.pos.y,this.size-offset,this.size-offset,rad,rad,rad,rad);
        stroke(0);
        fill("#ffffff");
        textAlign(CENTER);
        text("End",this.pos.x+this.size/2,this.pos.y + this.size/2);
        pop();
    }
}