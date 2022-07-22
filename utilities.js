function animate(){     //a sequência é importante, para coisas que estão no mesmo canvas
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    ctx5.clearRect(0, 0, canvas.width, canvas.height);
    
    handleRipples();
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
    handleParticles();
    frogger.update();
    frogger.draw();
    

    handleObstacles();
    handleScoreBoard();
    ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
    frame++;
    requestAnimationFrame(animate);
}
animate();

// event listeners
window.addEventListener('keydown', function(e){
    keys = []; // limpa o array (em caso de haver algo armazenado)
    keys[e.keyCode] = true; // adding to keys array whatever was pressed, captured by event
    if (keys[37] || keys[38] || keys[39] || keys[40]){ // se apertar qualquer tecla de movimento
        frogger.jump(); // esse método vai animar o sprite sheet
    }
});

window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    frogger.moving = false;     // quando solta a tecla, muda o boolen "moving"
    frogger.frameX = 0;
});

function scored(){
    score++;
    gameSpeed += 0.05;
    frogger.x = canvas.width/2 - frogger.width/2; // reseta a posição x do sapo
    frogger.y = canvas.height - frogger.height - 40; // reseta a posição y do sapo
}

function handleScoreBoard(){
    ctx4.fillStyle ="black";
    ctx4.strokeStyle ="black";
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Score', 265, 15);
    ctx4.font = '60px Verdana';
    ctx4.fillText(score, 270, 65);
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Colisões: ' + collisionCount, 10, 175);
    ctx4.strokeText('Velocidade do Jogo: ' + gameSpeed.toFixed(1), 10, 195);
}

// collision detection between two rectangles
// obs.: logical OR operator || return true if any of the statemensts are true
// se não há colisão, retorna true. Mas queremos que retorne falso, por isso o uso do !
// essa função de colisão pode ser reaproveitada! Por isso está aqui em utilities!
// primeiro procura um cenário em que não há colisão, para não precisar procurar mais nada
// mas, se todas as quatro retornarem falso, 

function collision(first, second){
    return !(first.x > second.x + second.width ||   // first está à direita de second, sem colisão = TRUE
             first.x + first.width < second.x  ||   // first está à esquerda de second, sem colisão = TRUE
             first.y > second.y + second.height||  // first está abaixo de second, sem colisão = TRUE
             first.y + first.height < second.y)    // first está acima de second, sem colisão = TRUE
                                                    // assim, o ! fará retornar FALSO quando não houver colisão!
}

function resetGame(){   //quando frogger bate no carro ou cai na água
    frogger.x = canvas.width/2 - frogger.width/2; // reseta a posição x do sapo
    frogger.y = canvas.height - frogger.height - 40; // reseta a posição y do sapo
    score = 0;
    collisionCount++;
    gameSpeed = 1;
}
