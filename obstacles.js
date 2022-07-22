class Obstacle {
    constructor(x, y, width, height, speed, type){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.frameX = 0;
        this.frameY = 0;
        this.randomize = Math.floor(Math.random() * 30 + 30);   // número inteiro aleatório entre 30 e 60
        this.carType = (Math.floor(Math.random() * numberOfCars));
    }
    draw(){     // desenha turtles (com animação randon), logs e carros
        if (this.type === 'turtle'){ // cada turtle tem uma velocidade randômica de nadar!
            if (frame % this.randomize === 0){  //module gives remainder! if frame is 12, módulo é 2, que é o resto
                if (this.frameX >= 1) this.frameX = 0;  // fica cycling entre frame 1 e frame 0, horizontaly
                else this.frameX++;
            }     
            ctx1.drawImage(turtle, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height);
        } else if (this.type === 'log'){
            ctx1.drawImage(log, this.x, this.y, this.width, this.height)
        } else {
            ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height)
        }
        
        //ctx3.fillStyle = "blue";
        //ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        this.x += this.speed * gameSpeed;
        if (this.speed > 0){    // speed > 0 significa carros indo para a direita
            if (this.x > canvas.width + this.width){    // se atravessou pela direita
                this.x = 0 - this.width;                // respawn em -160 
                this.carType = (Math.floor(Math.random() * numberOfCars));
            }
        } else {                // speed < 0 => indo para a esquerda
            this.frameX = 1
            if (this.x < 0 - this.width){   // se ultrapassou e sumiu pela esquerda
                this.x = canvas.width + this.width; // respawn na direita
                this.carType = (Math.floor(Math.random() * numberOfCars)); // com imagem aleatória do spritesheet de carros
            }
        }
    }
}

function initObstacles(){
    // lane 1
    for (let i = 0; i < 2; i++){
        let x = i * 350; // espaço entre os carros .. valor x vai retornar 0 e 350 
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 25, grid * 2, grid, 1, 'car'));
    }
    // lane 2
    for (let i = 0; i < 2; i++){
        let x = i * 300;  
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -5, 'car'));
    }
    // lane 3
    for (let i = 0; i < 2; i++){
        let x = i * 400;  
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car'));
    }
    // lane 4 - logs
    for (let i = 0; i < 2; i++){
        let x = i * 400;  
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log'));
    }
    // lane 5 - turtles ... will give ride
    for (let i = 0; i < 3; i++){
        let x = i * 200;
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, 'turtle'));
    }
}
initObstacles();

function handleObstacles(){ // chama os métodos update e draw do carsArray
    for (let i in carsArray){   // mesmo que (let i = 0; i < carsArray.length; i++){
        carsArray[i].update();
        carsArray[i].draw();
    }
    for (let i in logsArray){    //     (let i = 0; i < logsArray.length; i++){
        logsArray[i].update();
        logsArray[i].draw();
    }
    // collision with car
    for (let i in carsArray){
        if (collision(frogger, carsArray[i])){  // se a colisão retornar verdadeira
            ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50);
            resetGame();
        }
    }
    // collision with logs / turtle
    if (frogger.y < 250 && frogger.y > 100){
        safe = false; 

        for (i in logsArray){     //(i = 0; i < logsArray.length; i++){
            if (collision(frogger, logsArray[i])){
                frogger.x += logsArray[i].speed;
                safe = true;
            }
        }
        if (!safe){
            //ripples quando sapo afunda
            for (i = 0; i < 30; i++){
                ripplesArray.unshift(new Particle(frogger.x, frogger.y));
            }
            resetGame();
        }
    }
}

