var offset = 0.5;

class Node{
    constructor(posx,posy,size,target,isStart,isEnd,arrPos,checked,pathway,isObstacle){
        this.pos = createVector(posx,posy);
        this.size = size;
        this.realPos = createVector(posx + size/2, posy+size/2); // Positon of the center of each node
        this.proxToTarget = round(dist(posx,posy,posx,target.y) + dist(posx,posy,target.x,posy),2);
        this.isStart = isStart;
        this.isEnd = isEnd;
        //this.col = "#663399"
        this.col = "#ffffff"
        this.arrPos = arrPos;
        this.checked = checked;
        this.pathway = pathway;
        this.isObstacle = isObstacle;
    }
    show(){
        push();
        noStroke();
        if(this.isObstacle){
            this.col = "#663399";
        }
        else if(this.checked && !this.pathway){
            this.col = "#00a7bb";
        }
        fill(this.col);
        rect(this.pos.x,this.pos.y,this.size-offset,this.size-offset,rad,rad,rad,rad);
        stroke(0);
        textAlign(CENTER)
        pop();
    }
    // checkProx(otherNode){
    //     return round(dist(this.pos.x,this.pos.y,otherNode.pos.x,otherNode.pos.y),2);
    // }
    // findMove(others){
    //     let distances = [];
    //     for(let i = 0; i < others.length; i++){
    //         distances.push(others[i].proxToTarget)
    //         others[i].checked= true;
            
    //     }
    //     let minVal = min(distances);
    //     return others[distances.indexOf(minVal)]

    // }
}