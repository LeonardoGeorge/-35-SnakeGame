// Usando o ctx (que seria o contexto do canvas), vou deixar aqui um comentario,
// exemplificando como configurar o canvas. 
/*
ctx.fillStyle = "greenyellow";
ctx.fillRect(450, 150, 25, 50)
*/

// Manipulação de DOM para ter acesso ao Canvas e a seu contexto.
const canvas =  document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// Manipulação de DOM para ter acesso ao menu do Game Over.
const score = document.querySelector('.score_value');
const finalScore = document.querySelector('.final_score > span');
const menu = document.querySelector('.menu_screen');
const btnPlay = document.querySelector('.btn_play');

// Audio de comer o food.
let audio = new Audio("../01. Audio/audio.mp3");

// Variável que definindo o tamanho do Snake.
const size = 25;

const inicialPosition = [
    {x: 100, y: 150},
    {x: 125, y: 150},
    {x: 150, y: 150}
];

// Variável que guarda a posição inicial do Snake.
let snake = inicialPosition;

function incrementScore() {
    score.innerText = +score.innerText + 25;
}

// Função que gera aleatoriedade para o contador.
function ramdonNumber(max, min) {
    return Math.round(Math.random() * (max - min) + min)
}

// Função que gera aleatoriedade para a positção da comida.
function ramdonPosition() {
    const number = ramdonNumber(0, canvas.width - size);
    return Math.round(number / 25) * 25;
}

//Inserindo score na tela


// Variável que registra as direções.
let direction 

// Variável que armazena o loop de movimento do Snake.
let loopId 

function ramdonColor() {
    const red = ramdonNumber(0, 255);
    const green = ramdonNumber(0, 255);
    const blue = ramdonNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

// Variável que armazena a comida do Snake. 
const food = {
    x: ramdonPosition(),
    y: ramdonPosition(),
    color: ramdonColor()
}

// Função...  Desenhando o Snake no Canvas segundo suas posições.
function drawSnake() {
    ctx.fillStyle = "greenyellow";
    

    snake.forEach((position, index) => {
        if (index == snake.length -1) {
            ctx.fillStyle = 'greenyellow';
        }

        ctx.fillRect(position.x, position.y, size, size);

    })
}

// Desenhando o a grade de fundo do jogo.
function drawGrid() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#191919'

    for (let i = 25; i < 600; i += 25) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }  
}

// Desenhando comida do Snake
function drawFood() {
    const {x, y, color} = food;

    ctx.shadowColor = color;
    ctx.shadowBlur = 30;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
}

// Função para mover o Snake.
function moveSnake() {
    // Verificação para saber se a varrável direction contém algo. 
    if (!direction){
        return
    };


    // Variável que seleciona a ultima posição do Snake 
    let head = snake[snake.length - 1];


    // Ordem para remover a ultima posição do Snake.
    snake.shift();


    // Ordem para add uma nova posição
    if (direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    }
    if (direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    }
    if (direction == "down") {
        snake.push({x: head.x, y: head.y + size})
    }
    if (direction == "up") {
        snake.push({x: head.x, y: head.y - size})
    }
    
}

function checkEat() {
    const head = snake[snake.length - 1];

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head);
        audio.play();
        
        let x = ramdonPosition();
        let y = ramdonPosition();

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = ramdonPosition();
            y = ramdonPosition();
        }

        food.x = x,
        food.y = y,
        food.color = ramdonColor()
    }
}

// Checagem de colisão
function checkCollision() {
    let head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    const wallCollision = 
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    }) 
    if (wallCollision || selfCollision) {
        gameOver();
    }
}

function gameOver() {
    direction = undefined;

    menu.style.display = 'flex';
    finalScore.innerHTML = score.innerText;
    canvas.style.filter = 'blur(4px)'

}


// Função de loop para mover o Snake.
function gameLoop() {
    ctx.clearRect(0, 0, 600, 600)

    drawSnake();
    moveSnake();
    drawGrid();
    drawFood();
    checkEat();
    checkCollision();

    loopId = setTimeout(() => {
        gameLoop()
    }, 200);

}
gameLoop()

// Add evento de funcionamento de teclas.
document.addEventListener('keydown', ({key}) => {
    if (key == "ArrowDown" && direction !== "up") {
        direction = "down";
    }
    if (key == "ArrowRight" && direction !== "left") {
        direction = "right"
    }
    if (key == "ArrowLeft" && direction !== "right") {
        direction = "left"
    }
    if (key == "ArrowUp" && direction !== "down") {
        direction = "up"
    }
})

btnPlay.addEventListener('click', () => {
    score.innerText = '00';
    menu.style.display = 'none';
    canvas.style.filter = 'none';

    snake = [
        {x: 100, y: 150},
        {x: 125, y: 150},
        {x: 150, y: 150}
    ];
})
