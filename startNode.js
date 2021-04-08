class StartNode{
    constructor(posx,posy,size){
        this.pos = createVector(posx,posy);
        this.size = size;
     

    }
    show(){
        push();
        noStroke();
        fill("#0000ed");
        rect(this.pos.x,this.pos.y,this.size-offset,this.size-offset,rad,rad,rad,rad);
        stroke(0);
        fill("#ffffff");
        textAlign(CENTER);
        text("Start",this.pos.x+this.size/2,this.pos.y + this.size/2);
        pop()
    }
}