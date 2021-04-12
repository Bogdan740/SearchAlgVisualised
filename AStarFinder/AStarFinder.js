function initiateFinder(node){
    currentNode.checked = true
    let finder;
    let i = node.arrPos.x;
    let j = node.arrPos.y;
    try{// Right
        finder = nodes[i+1][j];
        if(finder != undefined && !finder.isObstacle && !finder.pathway){
            openList.push(finder);
        }
        
    }catch(err){}
    try{// Left
        finder = nodes[i-1][j];
        if(finder != undefined && !finder.isObstacle && !finder.pathway){
            openList.push(finder);
        }
    }catch(err){}
    try{// Top
        finder = nodes[i][j+1];
        if(finder != undefined && !finder.isObstacle && !finder.pathway){
            openList.push(finder);
        }
    }catch(err){}
    try{// Bottom
        finder = nodes[i][j-1];
        if(finder != undefined && !finder.isObstacle && !finder.pathway){
            openList.push(finder);
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
            openList.push(finder);
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
            openList.push(finder);
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
            openList.push(finder);
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
            openList.push(finder);
        }
    }catch(err){
        //console.log(err)
    }
    for(let i = 0; i < openList.length ; i++){
        openList[i].checked = true;
    }

    

}

function findPossibleNeighbours(){
    var finder;
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
        return neighbours

}



function AStarFinder(){
    currentNode.col = "#00008b";
    //console.log(currentNode)
    //console.log(currentNode.getOwnPropertyDescriptor(AStarFinder))
    currentNode = currentNode.findCurrentNode(openList);
    currentNodePointer = currentNode.arrPos;
    currentNode.pathway = true
    openList.splice(openList.indexOf(currentNode),1);
    closedList.push(currentNode);
    if(currentNode == nodes[endNodePointer.x][endNodePointer.y]){
        done = true;
        console.log("Path has been found!")
        console.log(millis()/1000)
        optimalFound = true;
    }
    let neighbours = findPossibleNeighbours(currentNode);
    for(let i= 0 ; i < neighbours.length; i++){
        if(!closedList.includes(neighbours[i])){
            if(!openList.includes(neighbours[i]) || currentNode.fcost + dist(currentNode.pos.x,currentNode.pos.y,neighbours[i].pos.x,neighbours[i].pos.y) < neighbours[i].fCost){
                neighbours[i].proxToTarget = currentNode.proxToTarget + dist(currentNode.pos.x,currentNode.pos.y,neighbours[i].pos.x,neighbours[i].pos.y);
                neighbours[i].proxToStart = currentNode.proxToStart + dist(currentNode.pos.x,currentNode.pos.y,neighbours[i].pos.x,neighbours[i].pos.y);
                neighbours[i].fcost = currentNode.fcost + dist(currentNode.pos.x,currentNode.pos.y,neighbours[i].pos.x,neighbours[i].pos.y);
                neighbours[i].parent = currentNode; 
                if(!openList.includes(neighbours[i])){
                    openList.push(neighbours[i])
                    neighbours[i].checked = true
                }
            }
        }
    }
}
