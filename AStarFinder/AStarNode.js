

class AStarNode extends Node{
    constructor(posx,posy,size,target,isStart,isEnd,arrPos,checked,pathway,isObstacle){
        super(posx,posy,size,target,isStart,isEnd,arrPos,checked,pathway,isObstacle)
        this.pos = createVector(posx,posy);
        if(algUsed == "Astar"){
            this.proxToTarget = round(dist(posx,posy,target.x,target.y),2) * 1.4;
            this.proxToStart = round(dist(posx,posy,startNode.pos.x,startNode.pos.y),2);
        }else if(algUsed == "Dikstra"){
            this.proxToTarget = 10000;
            this.proxToStart = 10000;
        }else if(algUsed == "BestFirst"){
            this.proxToTarget = round(dist(posx,posy,target.x,target.y),2)*10;
            this.proxToStart = round(dist(posx,posy,startNode.pos.x,startNode.pos.y),2);
        }
        this.fCost = this.proxToStart + this.proxToTarget
        this.parent;
    }
    checkProx(otherNode){
        return round(dist(this.pos.x,this.pos.y,otherNode.pos.x,otherNode.pos.y),2);
    }
    findCurrentNode(others){
        let distances = [];
        for(let i = 0; i < others.length; i++){
            distances.push(others[i].fCost);
        }

        let mins = []
        let proxes = [];
        for(let i= 0 ;i < distances.length; i++){
            if(distances[i] == min(distances)){
                mins.push(others[i])
                proxes.push(others[i].proxToTarget)
            }

        }
        return mins[proxes.indexOf(min(proxes))]

    }
}
