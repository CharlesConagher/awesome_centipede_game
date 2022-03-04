const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const playgroundImg = new Image();
playgroundImg.src = 'img/playground.svg';
const foodImg = new Image();
foodImg.src = 'img/food.png';
const centipedeHeadImg= new Image();
centipedeHeadImg.src = 'img/centipedeHead.png';
const centipedeBodyImg = new Image();
centipedeBodyImg.src = 'img/centipedeBody.png'

let box = 32;
let score = 0;
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let centipede = [];
centipede[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener('keydown', direction);
let movementDir;
function direction(event){
    switch (true){
        case event.keyCode === 37 && movementDir !== 'right':
            movementDir = 'left';
            break;
        case event.keyCode === 38 && movementDir !== 'down':
            movementDir = 'up';
            break;
        case event.keyCode === 39 && movementDir !== 'left':
            movementDir = 'right';
            break;
        case event.keyCode === 40 && movementDir !== 'up':
            movementDir = 'down';
            break;
    }
}

function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x === arr[i].x && head.y === arr[i].y){
            clearInterval(game)
        }
    }
}

function drawGame() {
    ctx.drawImage(playgroundImg, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);
    for(let i = 0; i < centipede.length; i++){
        if(i === 0){ ctx.drawImage(centipedeHeadImg, centipede[i].x, centipede[i].y)} else{
            ctx.drawImage(centipedeBodyImg, centipede[i].x, centipede[i].y);
        }
    }
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7)

    let centipedeX = centipede[0].x;
    let centipedeY = centipede[0].y;

    if(centipedeX === food.x && centipedeY === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        centipede.pop();
    }

    if(centipedeX < box || centipedeX > box * 17
       || centipedeY < 3 * box || centipedeY > box * 17 ){
        clearInterval(game)
    }

    switch (true) {
        case movementDir === 'left':
            centipedeX -= box;
            break;
        case movementDir === 'right':
            centipedeX += box;
            break;
        case movementDir === 'up':
            centipedeY -= box;
            break;
        case movementDir === 'down':
            centipedeY += box;
            break;
    }
    let newHead = {
        x: centipedeX,
        y: centipedeY,
    }
    eatTail(newHead, centipede);
    centipede.unshift(newHead);

}

let game = setInterval(drawGame, 100);