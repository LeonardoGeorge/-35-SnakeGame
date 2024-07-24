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
    {x: 125, y: 150},
    {x: 150, y: 150},
    {x: 175, y: 150},
    {x: 200, y: 150},
];

// Desenhando o Snake no Canvas segundo suas posições...
const drawSnake = () => {
    ctx.fillStyle = "greenyellow";
    

    snake.forEach((position) => {
        ctx.fillRect(position.x, position.y, size, size);

    })

}

drawSnake();
