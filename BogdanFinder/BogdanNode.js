
class BogdanNode extends Node{
    constructor(posx,posy,size,target,isStart,isEnd,arrPos,checked,pathway,isObstacle){
        super(posx,posy,size,target,isStart,isEnd,arrPos,checked,pathway,isObstacle);
    }
    checkProx(otherNode){
        return round(dist(this.pos.x,this.pos.y,otherNode.pos.x,otherNode.pos.y),2);
    }
    findMove(others){
        let distances = [];
        for(let i = 0; i < others.length; i++){
            distances.push(others[i].proxToTarget)
            others[i].checked= true;
            
        }
        let minVal = min(distances);
        return others[distances.indexOf(minVal)]

    }
}