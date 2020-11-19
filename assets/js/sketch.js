let grid;
let cols;
let rows;
let resolution = 5;

let fps = 60;
let fallSpeed = 2;

let fillColor = 'rgba(255,255,255, 0.5)';
let backgroundColor = 'rgba(168, 202, 218, 0.5)';

let brushSize = 3;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}



function setup() {
    createCanvas(1500,600);
    cols = width / resolution;
    rows = height / resolution;

    frameRate(fps);

    noStroke();
    fill(168, 202, 218);
    fill(fillColor);
    
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}



function draw() {

    
    let x = int(mouseX/resolution);
    let y = int(mouseY/resolution)
        for (let i = -brushSize; i < brushSize; i++) {
        for (let j = -brushSize; j < brushSize; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            grid[col][row] = floor(random(2));
        }
    }
    
    
    
    
    
    
    
    
    
    
    background(backgroundColor);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {

                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    let next = make2DArray(cols, rows);

    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // Count live neighbors!
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);
            
            
            jOffset = (j+floor((frameCount % fallSpeed+ 1)/fallSpeed)) % rows;
            
            if (state == 0 && neighbors == 3) {
                next[i][jOffset] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][jOffset] = 0;
            } else {
                next[i][jOffset] = state;
            }

        }
    }

    grid = next;



}


function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}



