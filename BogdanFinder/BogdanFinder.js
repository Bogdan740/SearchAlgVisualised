function unStuck(pathways){
    for(let i = 0; i < pathways.length; i++){
        pathways[i].pathway = false;
        pathways[i].isObstacle = true;
    }
    reset()
    

}


function BogdanFinder(){
    let finder;
    let neighbours = new Array;
        let i = currentNodePointer.x;
        let j = currentNodePointer.y;
        
        try{// Right
            finder = nodes[i+1][j];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
            
        }catch(err){}
        try{// Left
            finder = nodes[i-1][j];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{// Top
            finder = nodes[i][j+1];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{// Bottom
            finder = nodes[i][j-1];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{// Bottom right
            finder = nodes[i+1][j+1];
            let checkSides
            let n1 = nodes[i][j+1];
            let n2 = nodes[i+1][j];

            if(n1 == undefined || n2 == undefined){
                checkSides = true;
            }else{
                checkSides = (!n1.isObstacle && !n2.isObstacle)
            }

            if(finder != undefined && !finder.isObstacle && !finder.pathway && checkSides){
                neighbours.push(finder);
            }
        }catch(err){
            //console.log(err)
        }
        try{// Top right
            finder = nodes[i+1][j-1];
            let checkSides
            let n1 = nodes[i+1][j];
            let n2 = nodes[i][j-1];
            if(n1 == undefined || n2 == undefined){
                checkSides = true;
            }else{
                checkSides = (!n1.isObstacle && !n2.isObstacle)
            }
            if(finder != undefined && !finder.isObstacle && !finder.pathway && checkSides){
                neighbours.push(finder);
            }
        }catch(err){
            //console.log(err)
        }
        try{// Bottom left
            finder = nodes[i-1][j+1];
            let checkSides;
            let n1 = nodes[i-1][j];
            let n2 = nodes[i][j+1];
            if(n1 == undefined || n2 == undefined){
                checkSides = true;
            }else{
                checkSides = (!n1.isObstacle && !n2.isObstacle)
            }

            if(finder != undefined && !finder.isObstacle && !finder.pathway && checkSides){
                neighbours.push(finder);
            }
        }catch(err){
            //console.log(err)
        }
        try{// Top left
            finder = nodes[i-1][j-1];
            let checkSides
            let n1 = nodes[i][j-1];
            let n2 = nodes[i-1][j];
            if(n1 == undefined || n2 == undefined){
                checkSides = true;
            }else{
                checkSides = (!n1.isObstacle && !n2.isObstacle)
            }

            if(finder != undefined && !finder.isObstacle && !finder.pathway && checkSides){
                neighbours.push(finder);
            }
        }catch(err){
            //console.log(err)
        }
        
        if(neighbours.length != 0){
            //console.log(currentNode)
            let nextMove = currentNode.findMove(neighbours);

            currentNode.col = "#00008b"
            nextMove.col = "#00f7e7";
            nextMove.pathway = true;
            pathways.push(nextMove);
            currentNode = nextMove;
            currentNodePointer = this.arrPos;
            if(currentNode.proxToTarget == 0){
                optimalFound = true;
                console.log("We have found the target");
                console.log(millis()/1000)

            }
            currentNodePointer = createVector(currentNode.arrPos.x,currentNode.arrPos.y)
        }
        else{
            unStuck(pathways);
        }
}