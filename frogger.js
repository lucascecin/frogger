class Frogger {
    constructor(){
        this.spriteWidth = 250; // tamanho no sprite sheet
        this.spriteHeight = 250;
        this.width = this.spriteWidth/5 ; // [50] scaling down, 5 times smaller, pois 250 é muito grande
        this.height = this.spriteHeight/5;
        this.x = canvas.width/2 - this.width/2; // posicionando o sapo inicialmente no meio da tela (spawn)
        this.y = canvas.height - this.height - 40;
        this.moving = false; // previne o sapo de se mover muito rápido quando mantemos pressionada a tecla! Para poder fazer uma pressionada de tecla = pula uma casa
        this.frameX = 0; // coordenadas do sprite sheet, serão mudadas dinamicamente para animar o sapo
        this.frameY = 0;
    }
    update(){
        //console.log('update');
        if (keys[38]) {  //up
            if (this.moving === false){ // moving será falso após o evento keyup
                this.y -= grid; // grid é variável global = 80 pixels.. 
                this.moving = true;
                this.frameX = 1 // imagem do sapo pulando pra cima
                this.frameY = 0 // para acessar a primeira linha
            }
        }
        if (keys[40]) {  //down
            if (this.moving === false && this.y < canvas.height - this.height * 2) {
                this.y += grid;
                this.moving = true;
                this.frameY = 3
            }
        }
        if (keys[37]) {  //left
            if (this.moving === false && this.x > this.width) {
                this.x -= grid;
                this.moving = true;
                this.frameY = 2
            }
        }
        if (keys[39]) {  //right
            if (this.moving === false && this.x < canvas.width - this.width * 2) {
                this.x += grid;
                this.moving = true;
                this.frameY = 1
            }
        }
        if (this.y < 0) scored(); // se o sapo sair do canvas por cima = chegar na floresta
    }
    draw(){
        //ctx3.fillStyle = "green";     
        //ctx3.fillRect(this.x, this.y, this.width, this.height);
        ctx3.drawImage(froggerSprite,                       // versão de 9 argumentos
                        this.frameX * this.spriteWidth,     // crop x
                        this.frameY * this.spriteHeight,    // crop y
                        this.spriteWidth,                   // crop width
                        this.spriteHeight,                  // crop height
                        this.x - 25,                        // draw x
                        this.y - 25,                        // ...
                        this.width * 2, 
                        this.height * 2)
    }
    jump(){
        console.log('jump');
        if (this.moving === false) this.frameX = 1;
        else if (this.frameX === 1) this.frameX = 0;
    }
}

const frogger = new Frogger();