// Usando o ctx (que seria o contexto do canvas), vou deixar aqui um comentario,
// exemplificando como configurar o canvas. 
/*
ctx.fillStyle = "greenyellow";
ctx.fillRect(450, 150, 25, 50)
*/

// Manipulação de DOM para ter acesso ao Canvas e a seu contexto.
const canvas =  document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// Variável que definindo o tamanho do Snake.
const size = 25;

// Variável que guada as posições do Snake.
const snake = [
    {x: 100, y: 150},
    {x: 125, y: 150}
   
];

// Variável que registra as direções;
let direction 
let loopId 

// Função...  Desenhando o Snake no Canvas segundo suas posições.
function drawSnake() {
    ctx.fillStyle = "greenyellow";
    

    snake.forEach((position, index) => {
        ctx.fillRect(position.x, position.y, size, size);

    })
}

// Função para mover o Snake
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

// Função de loop para mover o Snake.
function gameLoop() {
    ctx.clearRect(0, 0, 600, 600)

    drawSnake();
    moveSnake();

    loopId = setTimeout(() => {
        gameLoop()
    }, 200)

}

gameLoop()


document.addEventListener('keydown', ({key}) => {
    if (key == "ArrowDown") {
        direction = "down";
    }
    if (key == "ArrowRight") {
        direction = "right"
    }
    if (key == "ArrowLeft") {
        direction = "left"
    }
    if (key == "ArrowUp") {
        direction = "up"
    }
})

