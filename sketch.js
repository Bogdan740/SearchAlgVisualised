
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

let effectiveHeight;
let effectiveWidth;

var algUsed = "Astar"

let openList = [];
let closedList = [];



function setup(){
    createCanvas(windowWidth*0.8,windowHeight); 

    
    size = height/25; 
    effectiveWidth = floor(width/size)*size;
    effectiveHeight = floor(height/size)*size;
    endNodePos = createVector(size*(floor(width/size)-1),size*(floor(height/size)-1));
    startNodePos = createVector(size*0,size*0);

    startNode = new StartNode(startNodePos.x,startNodePos.y,size);
    endNode = new EndNode(endNodePos.x,endNodePos.y,size);
    
    if(algUsed == "Bogdan"){
        for(let i = 0; i < Math.floor(width/size); i++){
            nodes.push(new Array);
        }
        for(let i = 0; i < nodes.length; i++){
            for(let j = 0; j < Math.floor(height/size); j++){
                if(i*size == endNodePos.x && j*size == endNodePos.y){ //Create The EndNode in the array
                    nodes[i][j] = new BogdanNode(i*size,j*size,size,endNode.pos,false,true,createVector(i,j),false,false,false);
                    endNodePointer = createVector(i,j) 

                }else if(i*size == startNodePos.x && j*size == startNodePos.y){ //Create the starting node in the array
                    nodes[i][j] = new BogdanNode(i*size,j*size,size,endNode.pos,true,false,createVector(i,j),false,false,false);
                    currentNodePointer = createVector(i,j);
                }
                
                else{
                nodes[i][j] = new BogdanNode(i*size,j*size,size,endNode.pos,false,false,createVector(i,j),false,false,false);
                }
                currentNode = nodes[currentNodePointer.x][currentNodePointer.y]
            }
        }//End of loop
    }else if(algUsed == "Astar" || algUsed == "Dikstra" || algUsed == "BestFirst"){
        for(let i = 0; i < Math.floor(width/size); i++){
            nodes.push(new Array);
        }
        for(let i = 0; i < nodes.length; i++){
            for(let j = 0; j < Math.floor(height/size); j++){
                if(i*size == endNodePos.x && j*size == endNodePos.y){ //Create The EndNode in the array
                    nodes[i][j] = new AStarNode(i*size,j*size,size,endNode.pos,false,true,createVector(i,j),false,false,false);
                    endNodePointer = createVector(i,j) 

                }else if(i*size == startNodePos.x && j*size == startNodePos.y){ //Create the starting node in the array
                    nodes[i][j] = new AStarNode(i*size,j*size,size,endNode.pos,true,false,createVector(i,j),false,false,false);
                    currentNodePointer = createVector(i,j);
                }
                
                else{
                nodes[i][j] = new AStarNode(i*size,j*size,size,endNode.pos,false,false,createVector(i,j),false,false,false);
                    }
                }
            }//End of loop
        currentNode = nodes[currentNodePointer.x][currentNodePointer.y]
        initiateFinder(currentNode);
    }

}

var previous;
var optimalFound = false;
var pathways = new Array;
var holder;
var done = false

var checkAlgUsed;

function draw(){
    background("#00a7bb")
    checkSpace();

    if(insideStartNode){
        moveNodeToMouse(startNode)
    }else if(insideEndNode){
        moveNodeToMouse(endNode)
    }

    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++){
            nodes[i][j].show();
        }

    }

    if(algUsed == "Astar" || algUsed == "Dikstra" || algUsed == "BestFirst"){
        holder = nodes[endNodePointer.x][endNodePointer.y];
        while(done){
            pathways.push(holder)
            if(holder.parent != undefined){
                holder = holder.parent
            }else{
                done = false;
            }
        
        }
    }

    if(optimalFound && !insideStartNode){ // Runs after the path is found
        if(algUsed == "Bogdan" && pathways.length > 2){
            push()
            strokeWeight(3)
            stroke("#fff700")
            beginShape()
            noFill();
            vertex(startNode.pos.x + size/2,startNode.pos.y + size/2)
            for(let i =0; i< pathways.length; i++){
                vertex(pathways[i].realPos.x,pathways[i].realPos.y);
                push();
                fill("#fff700");
                ellipse(pathways[i].realPos.x,pathways[i].realPos.y,10)
                pop();
            }
            
            endShape()
            pop()
        }else if(algUsed == "Astar" || algUsed == "Dikstra" || algUsed == "BestFirst"){
            push()
            strokeWeight(4)
            stroke("#fff700")
            beginShape()
            noFill();
            //vertex(startNode.pos.x + size/2,startNode.pos.y + size/2)
            for(let i =0; i< pathways.length; i++){
                vertex(pathways[i].realPos.x,pathways[i].realPos.y);
                push();
                fill("#fff700");
                ellipse(pathways[i].realPos.x,pathways[i].realPos.y,10)
                pop();
            }
            vertex()
            vertex(startNode.pos.x + size/2,startNode.pos.y + size/2)
            
            endShape()
            pop()
        }
    }
    if(!optimalFound){// Runs while path is not found
        if(algUsed == "Bogdan"){
            BogdanFinder()
        }else if(algUsed == "Astar" || algUsed == "Dikstra" || algUsed == "BestFirst"){
            AStarFinder();
        }
        
    }

    startNode.show();
    endNode.show();
}

var insideStartNode = false;
var insideEndNode = false;


function mousePressed(){
    if(checkInsideSquare(createVector(startNode.pos.x,startNode.pos.y),size,createVector(mouseX,mouseY))){
        insideStartNode = true;
    }else if(checkInsideSquare(createVector(endNode.pos.x,endNode.pos.y),size,createVector(mouseX,mouseY))){
        insideEndNode = true;
        
    }
    
}

function centerNode(node,nodes){
    //console.log(nodes.length)
    let distances = [];
    for(let i = 0; i < nodes.length; i++){
        distances.push((nodes[i].pos.x,nodes[i].pos.y,node.pos.x,node.pos.y))

    }
    let minDist = min(distances);
    node.pos = nodes[distances.indexOf(minDist)].pos;

}
function mouseReleased(e){
    if(e.target.id == "defaultCanvas0"){

        if (insideStartNode){
            if(startNode.pos.x + size / 2 > effectiveWidth || startNode.pos.x + size / 2 < 0 || startNode.pos.y + size / 2 > effectiveHeight || startNode.pos.y + size / 2 < 0){
                startNode.pos = createVector(0,0)
                insideStartNode = false;
            }
            else{
                let nodesToCheck = [];
                for(let i = 0; i<nodes.length; i++){
                    for(let j = 0; j < nodes[i].length; j++){
                        let node = nodes[i][j];
                        if(dist(node.realPos.x,node.realPos.y,mouseX+size/2,mouseY+size/2) < size){
                            nodesToCheck.push(node);
                        }

                    }
                }
                insideStartNode = false;
                centerNode(startNode,nodesToCheck)
            }
        }
        if (insideEndNode){
            if(endNode.pos.x + size / 2 > effectiveWidth || endNode.pos.x + size / 2 < 0 || endNode.pos.y + size / 2 > effectiveHeight || endNode.pos.y + size / 2 < 0){
                endNode.pos = createVector(size*(floor(width/size)-1),size*(floor(height/size)-1))
                insideEndNode = false;
            }
            else{
                let nodesToCheck = [];
                for(let i = 0; i<nodes.length; i++){
                    for(let j = 0; j < nodes[i].length; j++){
                        let node = nodes[i][j];
                        if(dist(node.realPos.x,node.realPos.y,mouseX+size/2,mouseY+size/2) < size){
                            nodesToCheck.push(node);
                        }

                    }
                }
                insideEndNode = false;
                centerNode(endNode,nodesToCheck)
            }
        }
        reset()
    }else if(e.target.id == "algUsed"){
        checkAlgUsed = document.getElementById("algUsed").value;
        if(algUsed != checkAlgUsed){
            algUsed = checkAlgUsed;
            document.activeElement.blur()
            reset();
        }
    }
    
}

function moveNodeToMouse(node){
    node.pos = createVector(mouseX-size/2,mouseY-size/2)
}




function checkSpace(){
    if(keyIsDown(32)){
        for(let i = 0; i < nodes.length; i++){
            for(let j = 0; j < nodes[i].length; j++){
                let object = nodes[i][j]
                let insideSquare = checkInsideSquare(createVector(object.pos.x,object.pos.y),
                                                            object.size,createVector(mouseX,mouseY))
                if (insideSquare){
                    object.isObstacle = true;
                }
            }
        }
    }
}


function checkInsideSquare(c1,size,coord){ // c1 = the top left corner of the square, coord = coord to check if inside given square
    if(coord.x > c1.x && coord.y > c1.y && coord.x < c1.x + size && coord.y < c1.y + size){
        return true
    }

}
function reset(){
    if(algUsed == "Bogdan"){
        pathways = [];
        optimalFound = false;
        for(let i = 0; i < nodes.length; i++){
            for(let j = 0; j < Math.floor(height/size); j++){
                if(!nodes[i][j].isObstacle){
                    if(i*size == endNode.pos.x && j*size == endNode.pos.y){ //Create The EndNode in the array
                        nodes[i][j] = new BogdanNode(i*size,j*size,size,endNode.pos,false,true,createVector(i,j),false,false,false);
                        endNodePointer = createVector(i,j) 

                    }else if(i*size == startNode.pos.x && j*size == startNode.pos.y){ //Create the starting node in the array
                        nodes[i][j] = new BogdanNode(i*size,j*size,size,endNode.pos,true,false,createVector(i,j),false,false,false);
                        currentNodePointer = createVector(i,j);
                    }
                    
                    else{
                        nodes[i][j] = new BogdanNode(i*size,j*size,size,endNode.pos,false,false,createVector(i,j),false,false,false);
                    }
                }
            }
        }
        currentNode = nodes[currentNodePointer.x][currentNodePointer.y]
    }else if(algUsed == "Astar" || algUsed == "Dikstra" || algUsed == "BestFirst"){
        done = false;
        pathways = [];
        optimalFound = false;
        openList = [];
        closedList = [];

        for(let i = 0; i < nodes.length; i++){
            for(let j = 0; j < Math.floor(height/size); j++){
                if(!nodes[i][j].isObstacle){
                    if(i*size == endNode.pos.x && j*size == endNode.pos.y){ //Create The EndNode in the array
                        nodes[i][j] = new AStarNode(i*size,j*size,size,endNode.pos,false,true,createVector(i,j),false,false,false);
                        endNodePointer = createVector(i,j) 

                    }else if(i*size == startNode.pos.x && j*size == startNode.pos.y){ //Create the starting node in the array
                        nodes[i][j] = new AStarNode(i*size,j*size,size,endNode.pos,true,false,createVector(i,j),false,false,false);
                        currentNodePointer = createVector(i,j);
                    }
                    
                    else{
                    nodes[i][j] = new AStarNode(i*size,j*size,size,endNode.pos,false,false,createVector(i,j),false,false,false);
                    }
                }
            }
        }
        currentNode = nodes[currentNodePointer.x][currentNodePointer.y]
        initiateFinder(currentNode);

    }
}



