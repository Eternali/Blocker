// avoiding dependency injection for the following global variables //
let canvas, width, height, fps;
let squaresize, enemySizeMin, enemySizeMax, enemySpeedMax;
let count, freq, gravity;

let player;
let enemies = [];
let squares = [];
let levels = [];

function setup () {
    fps = 60;
    squaresize = 50;
    enemySizeMin = 30;
    enemySizeMax = 60;
    enemySpeedMax = 6;
    count = 0;
    freq = 120;
    gravity = 15 / fps;  // keep physics relative to update frequency

    // initialize game environment
    levels.push([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1]
    ]);  // 12 by 14 level structure
    [width, height] = initWalls(levels[0], squaresize);
    player = new Player();

    // initialize canvas
    canvas = createCanvas(width, height);
    canvas.parent("sketchContainer");
    rectMode(CENTER);
}

function draw () {
    frameRate(fps);
    count++;

    // event handling
    if (count % freq == 0) {
        count = 0;
        enemies.push(new Enemy(Math.round(random(enemySizeMin, enemySizeMax)), 10, 
                               { x: Math.round(random(enemySizeMax, width-enemySizeMax)), y: -enemySizeMax/2 },
                               { x: Math.round(random(-enemySpeedMax, enemySpeedMax)), y: 0 }));
    }

    // logic


    // rendering
    background(51);
    for (let square of squares)
        square.draw();
    for (let e in enemies) {
        if (enemies[e].updatePos(squares, gravity))
            enemies.splice(e, 1);
        enemies[e].draw();
    }
}

function initWalls (level, squaresize) {
    let width = level[0].length * squaresize;
    let height = level.length * squaresize;

    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level[0].length; j++) {
            if (level[i][j]) 
                squares.push(new Square(i, j, squaresize));
        }
    }

    return [width, height];
}
