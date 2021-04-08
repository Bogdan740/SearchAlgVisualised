
var size;
var nodes = []; // Stores (rows x columns) of nodes

var startNode; // Start node
var endNode; // End node

var endNodePos; //Position of end node on the canvas
var startNodePos; //Position of start node on the canvas

var endNodePointer; // Position of end node in the array
var currentNodePointer; // Position of start node in the array

var currentNode;

var rad = 6;

function setup(){
    createCanvas(windowWidth,windowHeight); 
    
    size = height/25; 

    endNodePos = createVector(size*19,size*19);
    startNodePos = createVector(size*0,size*0);

    startNode = new StartNode(startNodePos.x,startNodePos.y,size);
    endNode = new EndNode(endNodePos.x,endNodePos.y,size);

    for(let i = 0; i < Math.floor(width/size); i++){
        nodes.push(new Array);
    }
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < Math.floor(height/size); j++){
            if(i*size == endNodePos.x && j*size == endNodePos.y){ //Create The EndNode in the array
                nodes[i][j] = new Node(i*size,j*size,size,endNode.pos,false,true,createVector(i,j),false,false,false);
                endNodePointer = createVector(i,j) 

            }else if(i*size == startNodePos.x && j*size == startNodePos.y){ //Create the starting node in the array
                nodes[i][j] = new Node(i*size,j*size,size,endNode.pos,true,false,createVector(i,j),false,false,false);
                currentNodePointer = createVector(i,j);
            }
            
            else{
            nodes[i][j] = new Node(i*size,j*size,size,endNode.pos,false,false,createVector(i,j),false,false,false);
            }
        }
    }//End of loop
    currentNode = nodes[currentNodePointer.x][currentNodePointer.y]

}

var previous;
var optimalFound = false;
var pathways = new Array;

function draw(){
    background("#ffffff");
    checkSpace();
    if(mouseIsPressed){
        mousePressed();
    }

    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++){
            nodes[i][j].show();
        }

    }
    let finder;
    if(!optimalFound){
        let neighbours = new Array;
        let i = currentNodePointer.x;
        let j = currentNodePointer.y;
        
        try{
            finder = nodes[i+1][j];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
            
        }catch(err){}
        try{
            finder = nodes[i-1][j];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{
            finder = nodes[i][j+1];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{
            finder = nodes[i][j-1];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{
            finder = nodes[i+1][j+1];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{
            finder = nodes[i+1][j-1];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{
            finder = nodes[i-1][j+1];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        try{
            finder = nodes[i-1][j-1];
            if(finder != undefined && !finder.isObstacle && !finder.pathway){
                neighbours.push(finder);
            }
        }catch(err){}
        
        if(neighbours.length != 0){
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

    startNode.show();
    endNode.show();
    //noLoop();
}

// function checkNeighbours(neighbours){
//     allObstacles = true;
//     for(let i = 0; i < neighbours.length; i++){
//         if(!neighbours[i].isObstacle){
//             allObstacles = false;
//         }
//     }
//     return allObstacles;
// }

function checkSpace(){
    if(keyIsDown(32)){
        for(let i = 0; i < nodes.length; i++){
            for(let j = 0; j < nodes[i].length; j++){
                let object = nodes[i][j]
                let insideSquare = checkInsideSquare(createVector(object.pos.x,object.pos.y),
                                                            object.size*2,createVector(mouseX,mouseY))
                if (insideSquare){
                    object.isObstacle = true;
                }
            }
        }
    }
}
function mousePressed(){
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++){
            let object = nodes[i][j]
            let insideSquare = checkInsideSquare(createVector(object.pos.x,object.pos.y),
                                                        object.size,createVector(mouseX,mouseY))
            if (insideSquare){
                reset()
                startNode = new StartNode(i*size,j*size,size);
                currentNode = nodes[i][j];
                currentNodePointer = createVector(i,j)
            }
        }
    }
    
}




function checkInsideSquare(c1,size,coord){
    if(coord.x > c1.x && coord.y > c1.y && coord.x < c1.x + size && coord.y < c1.y + size){
        return true
    }

}
function reset(){
    optimalFound = false;
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < Math.floor(height/size); j++){
            if(!nodes[i][j].isObstacle){
                if(i*size == endNodePos.x && j*size == endNodePos.y){ //Create The EndNode in the array
                    nodes[i][j] = new Node(i*size,j*size,size,endNode.pos,false,true,createVector(i,j),false,false,false);
                    endNodePointer = createVector(i,j) 

                }else if(i*size == startNode.pos.x && j*size == startNode.pos.y){ //Create the starting node in the array
                    nodes[i][j] = new Node(i*size,j*size,size,endNode.pos,true,false,createVector(i,j),false,false,false);
                    currentNodePointer = createVector(i,j);
                }
                
                else{
                nodes[i][j] = new Node(i*size,j*size,size,endNode.pos,false,false,createVector(i,j),false,false,false);
                }
            }
        }
    }
}

function unStuck(pathways){
    for(let i = 0; i < pathways.length; i++){
        pathways[i].pathway = false;
        pathways[i].isObstacle = true;
    }
    reset()
    

}


