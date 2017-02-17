const canvas = document.createElement('canvas');
const canvasContext = canvas.getContext('2d');
const heroImage = new Image();
const monsterImage = new Image();
const bgImage = new Image();
const keysDown = {};
const chars = {
	hero: {
		speed: 256
	},
	monster: {}
};

let bgReady = false;
let heroReady = false;
let monsterReady = false;
let monstersCaught = 0;


canvas.width = 512;
canvas.height = 480;
bgImage.src = 'images/background.png';
heroImage.src = 'images/hero.png';
monsterImage.src = 'images/monster.png';

document.body.appendChild(canvas);

bgImage.onload = () => bgReady = true;
heroImage.onload = () => heroReady = true;
monsterImage.onload = () => monsterReady = true;

window.addEventListener('keydown', 
	(e) => { 
		keysDown[e.keyCode] =true; 
	},
	false);

window.addEventListener('keyup', 
	(e) => { 
		delete keysDown[e.keyCode]; 
	},
	false);

const reset = () => {
	chars.hero.x = canvas.width / 2;
	chars.hero.y = canvas.height / 2;

	chars.monster.x = 32 + 
		(Math.random() * (canvas.width - 64));
	chars.monster.y = 32 + 
		(Math.random() * (canvas.height - 64));
};

const update = (modifier) => {
	if (38 in keysDown) { // Pressionando a seta pra cima
		chars.hero.y -= chars.hero.speed * modifier;
	}
	if (40 in keysDown) { // Pressionando a seta pra baixo
		chars.hero.y += chars.hero.speed * modifier;
	}
	if (37 in keysDown) { // Pressionando a seta pra esquerda
		chars.hero.x -= chars.hero.speed * modifier;
	}
	if (39 in keysDown) { // Pressionando a seta pra direita
		chars.hero.x += chars.hero.speed * modifier;
	}

	if (
		chars.hero.x <= (chars.monster.x + 32)
		&& chars.monster.x <= (chars.hero.x + 32)
		&& chars.hero.y <= (chars.monster.y + 32)
		&& chars.monster.y <= (chars.hero.y + 32)
	) 
	{
		++monstersCaught;
		reset();
	}

};

const render = () => {
	if(bgReady) canvasContext.drawImage(bgImage, 0, 0);
	if(heroReady) canvasContext.drawImage(heroImage, chars.hero.x, chars.hero.y);
	if(monsterReady) canvasContext.drawImage(monsterImage, chars.monster.x, chars.monster.y);

	canvasContext.fillStyle = 'rgb(250, 250, 250)';
	canvasContext.font = '24px Helvetica';
	canvasContext.textAlign = 'left';
	canvasContext.textBaseline = 'top';
	canvasContext.fillText('Pessoas salvas: ' + monstersCaught, 32, 32);

};

const main = () => {
	const now = Date.now();
	const delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();

reset();
main();