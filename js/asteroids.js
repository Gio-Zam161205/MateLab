        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const levelDisplay = document.getElementById('level');
        const scoreDisplay = document.getElementById('score');
        const livesDisplay = document.getElementById('lives');
        const gameOverScreen = document.getElementById('gameOver');
        const startScreen = document.getElementById('startScreen');
        const startBtn = document.getElementById('startBtn');
        const finalScoreDisplay = document.getElementById('finalScore');
        const restartBtn = document.getElementById('restartBtn');
        
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const shootBtn = document.getElementById('shootBtn');
        
        const laserSound = document.getElementById('laserSound');
        const explosionSound = document.getElementById('explosionSound');
        const gameOverSound = document.getElementById('gameOverSound');
        const levelUpSound = document.getElementById('levelUpSound');
        const bgMusic = document.getElementById('bgMusic');

        let audioEnabled = false;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let gameRunning = false;
        let level = 1;
        let score = 0;
        let lives = 3;
        let asteroids = [];
        let lasers = [];
        let stars = [];
        let explosions = [];
        let asteroidsToDestroy = 5;
        let destroyedCount = 0;
        let currentEquation = "";
        let moveLeft = false;
        let moveRight = false;

        const playerShip = {
            x: canvas.width / 2,
            y: canvas.height - 80,
            width: 40,
            height: 60,
            color: '#0ff',
            speed: 12,
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.height/2);
                ctx.lineTo(this.x + this.width/2, this.y + this.height/2);
                ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
                ctx.closePath();
                ctx.fill();
                
                // Detalles de la nave
                ctx.fillStyle = '#8ff';
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.height/4);
                ctx.lineTo(this.x + this.width/4, this.y + this.height/4);
                ctx.lineTo(this.x - this.width/4, this.y + this.height/4);
                ctx.closePath();
                ctx.fill();
            },
            moveLeft() {
                this.x = Math.max(this.width/2, this.x - this.speed);
            },
            moveRight() {
                this.x = Math.min(canvas.width - this.width/2, this.x + this.speed);
            },
            update() {
                if (moveLeft) this.moveLeft();
                if (moveRight) this.moveRight();
            }
        };

        class Asteroid {
            constructor() {
                this.size = Math.random() * 30 + 30;
                this.x = Math.random() * (canvas.width - this.size);
                this.y = -this.size;
                this.speed = Math.random() * 2 + 1 + level * 0.2;
                this.rotation = 0;
                this.rotationSpeed = (Math.random() - 0.5) * 0.1;
                this.equation = generateEquation();
                this.solution = eval(this.equation.replace(/×/g, '*').replace(/÷/g, '/'));
            }
            
            update() {
                this.y += this.speed;
                this.rotation += this.rotationSpeed;
            }
            
            draw() {
                ctx.save();
                ctx.translate(this.x + this.size/2, this.y + this.size/2);
                ctx.rotate(this.rotation);
                
                ctx.fillStyle = '#8B4513';
                ctx.beginPath();
                ctx.moveTo(0, -this.size/2);
                ctx.lineTo(this.size/3, -this.size/4);
                ctx.lineTo(this.size/2, this.size/4);
                ctx.lineTo(this.size/4, this.size/2);
                ctx.lineTo(-this.size/4, this.size/3);
                ctx.lineTo(-this.size/2, 0);
                ctx.lineTo(-this.size/3, -this.size/3);
                ctx.closePath();
                ctx.fill();
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold ' + (this.size/4) + 'px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.equation, 0, 0);
                
                ctx.restore();
            }
            
            isOutOfScreen() {
                return this.y > canvas.height + this.size;
            }
        }

        function generateEquation() {
            const operations = ['+', '-', '×', '÷'];
            const operation = operations[Math.floor(Math.random() * operations.length)];
            let num1, num2;
            
            const maxNumber = Math.min(5 + level * 3, 20);
            
            switch (operation) {
                case '+':
                    num1 = Math.floor(Math.random() * maxNumber) + 1;
                    num2 = Math.floor(Math.random() * maxNumber) + 1;
                    return `${num1} + ${num2}`;
                case '-':
                    num1 = Math.floor(Math.random() * maxNumber) + 5;
                    num2 = Math.floor(Math.random() * num1) + 1;
                    return `${num1} - ${num2}`;
                case '×':
                    num1 = Math.floor(Math.random() * Math.min(maxNumber, 10)) + 1;
                    num2 = Math.floor(Math.random() * Math.min(maxNumber, 10)) + 1;
                    return `${num1} × ${num2}`;
                case '÷':
                    num2 = Math.floor(Math.random() * 5) + 1;
                    const result = Math.floor(Math.random() * 5) + 1;
                    num1 = num2 * result;
                    return `${num1} ÷ ${num2}`;
            }
        }

        class Laser {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.width = 4;
                this.height = 20;
                this.speed = 15;
                this.color = '#0ff';
            }
            
            update() {
                this.y -= this.speed;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);
                
                ctx.fillStyle = 'white';
                ctx.globalAlpha = 0.7;
                ctx.fillRect(this.x - this.width/4, this.y, this.width/2, this.height/4);
                ctx.globalAlpha = 1.0;
            }
            
            isOutOfScreen() {
                return this.y < -this.height;
            }
        }

        function createStars() {
            stars = [];
            for (let i = 0; i < 200; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.5,
                    speed: Math.random() * 2 + 1
                });
            }
        }

        function updateStars() {
            for (let i = 0; i < stars.length; i++) {
                stars[i].y += stars[i].speed;
                if (stars[i].y > canvas.height) {
                    stars[i].y = 0;
                    stars[i].x = Math.random() * canvas.width;
                }
            }
        }

        function drawStars() {
            ctx.fillStyle = 'white';
            for (let i = 0; i < stars.length; i++) {
                ctx.globalAlpha = stars[i].opacity;
                ctx.fillRect(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
            }
            ctx.globalAlpha = 1.0;
        }

        function shootLaser() {
            if (!gameRunning) return;
            
            lasers.push(new Laser(playerShip.x, playerShip.y - playerShip.height/2));
            if (audioEnabled) {
                try {
                    laserSound.currentTime = 0;
                    const playPromise = laserSound.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("No se pudo reproducir sonido de láser, intentando cargar fuente alternativa");
                            loadAlternativeAudio(laserSound);
                        });
                    }
                } catch (e) {
                    console.log("Error al reproducir láser:", e);
                }
            }
        }

        function createExplosion(x, y) {
            explosions.push({
                x: x,
                y: y,
                frame: 0
            });
            if (audioEnabled) {
                try {
                    explosionSound.currentTime = 0;
                    const playPromise = explosionSound.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("No se pudo reproducir sonido de explosión, intentando cargar fuente alternativa");
                            loadAlternativeAudio(explosionSound);
                        });
                    }
                } catch (e) {
                    console.log("Error al reproducir explosión:", e);
                }
            }
        }

        function loadAlternativeAudio(audioElement) {
            if (audioElement.children.length > 1) {
                try {
                    audioElement.src = audioElement.children[1].src;
                    audioElement.load();
                    audioElement.play().catch(e => {
                        console.log("No se pudo reproducir fuente alternativa:", e);
                    });
                } catch (e) {
                    console.log("Error al cambiar fuente de audio:", e);
                }
            }
        }

        function updateExplosions() {
            for (let i = explosions.length - 1; i >= 0; i--) {
                explosions[i].frame++;
                if (explosions[i].frame > 10) {
                    explosions.splice(i, 1);
                }
            }
        }

        function drawExplosions() {
            for (let i = 0; i < explosions.length; i++) {
                const size = explosions[i].frame * 4;
                const alpha = 1 - explosions[i].frame / 10;
                
                ctx.save();
                ctx.translate(explosions[i].x, explosions[i].y);
                ctx.globalAlpha = alpha;
                
                // Anillos de la explosión
                ctx.strokeStyle = '#ff0';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.strokeStyle = '#f80';
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.strokeStyle = '#f00';
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
        }

        function checkCollisions() {
            for (let i = lasers.length - 1; i >= 0; i--) {
                for (let j = asteroids.length - 1; j >= 0; j--) {
                    const laser = lasers[i];
                    const asteroid = asteroids[j];
                    
                    if (
                        laser.x > asteroid.x &&
                        laser.x < asteroid.x + asteroid.size &&
                        laser.y > asteroid.y &&
                        laser.y < asteroid.y + asteroid.size
                    ) {
                        createExplosion(asteroid.x + asteroid.size/2, asteroid.y + asteroid.size/2);
                        asteroids.splice(j, 1);
                        lasers.splice(i, 1);
                        
                        currentEquation = asteroid.equation + " = " + asteroid.solution;
                        setTimeout(() => {
                            currentEquation = "";
                        }, 1000);
                        
                        score += 10 * level;
                        destroyedCount++;
                        
                        if (destroyedCount >= asteroidsToDestroy) {
                            levelComplete();
                        }
                        
                        break;
                    }
                }
            }
            
            for (let i = asteroids.length - 1; i >= 0; i--) {
                const asteroid = asteroids[i];
                
                if (
                    playerShip.x - playerShip.width/2 < asteroid.x + asteroid.size &&
                    playerShip.x + playerShip.width/2 > asteroid.x &&
                    playerShip.y - playerShip.height/2 < asteroid.y + asteroid.size &&
                    playerShip.y + playerShip.height/2 > asteroid.y
                ) {
                    createExplosion(asteroid.x + asteroid.size/2, asteroid.y + asteroid.size/2);
                    asteroids.splice(i, 1);
                    lives--;
                    
                    if (lives <= 0) {
                        gameOver();
                    }
                }
            }
        }

        function levelComplete() {
            level++;
            destroyedCount = 0;
            asteroidsToDestroy = 5 + level;
            
            asteroids = [];
            lasers = [];
            
            if (audioEnabled) {
                try {
                    levelUpSound.currentTime = 0;
                    const playPromise = levelUpSound.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("No se pudo reproducir sonido de nivel, intentando cargar fuente alternativa");
                            loadAlternativeAudio(levelUpSound);
                        });
                    }
                } catch (e) {
                    console.log("Error al reproducir sonido de nivel:", e);
                }
            }
            
            updateUI();
        }

        function gameOver() {
            gameRunning = false;
            if (audioEnabled) {
                try {
                    bgMusic.pause();
                    gameOverSound.currentTime = 0;
                    const playPromise = gameOverSound.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("No se pudo reproducir sonido de game over, intentando cargar fuente alternativa");
                            loadAlternativeAudio(gameOverSound);
                        });
                    }
                } catch (e) {
                    console.log("Error al reproducir sonido de game over:", e);
                }
            }
            
            finalScoreDisplay.textContent = score;
            gameOverScreen.style.display = 'flex';
        }

        function restartGame() {
            level = 1;
            score = 0;
            lives = 3;
            destroyedCount = 0;
            asteroidsToDestroy = 5;
            
            asteroids = [];
            lasers = [];
            explosions = [];
            currentEquation = "";
            
            gameOverScreen.style.display = 'none';
            startGame();
        }

        function updateUI() {
            levelDisplay.textContent = level;
            scoreDisplay.textContent = score;
            livesDisplay.textContent = lives;
        }

        function drawCurrentEquation() {
            if (currentEquation) {
                ctx.fillStyle = 'rgba(0, 0, 100, 0.7)';
                ctx.fillRect(canvas.width/2 - 100, 20, 200, 40);
                
                ctx.fillStyle = '#0ff';
                ctx.font = 'bold 20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(currentEquation, canvas.width/2, 40);
            }
        }

        function gameLoop() {
            if (!gameRunning) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            drawStars();
            updateStars();
            
            drawCurrentEquation();
            
            playerShip.update();
            playerShip.draw();
            
            for (let i = asteroids.length - 1; i >= 0; i--) {
                asteroids[i].update();
                asteroids[i].draw();
                
                if (asteroids[i].isOutOfScreen()) {
                    asteroids.splice(i, 1);
                }
            }
            
            for (let i = lasers.length - 1; i >= 0; i--) {
                lasers[i].update();
                lasers[i].draw();
                
                if (lasers[i].isOutOfScreen()) {
                    lasers.splice(i, 1);
                }
            }
            
            updateExplosions();
            drawExplosions();
            
            checkCollisions();
            
            if (Math.random() < 0.02 + level * 0.005) {
                asteroids.push(new Asteroid());
            }
            
            requestAnimationFrame(gameLoop);
        }

        function startGame() {
            gameRunning = true;
            createStars();
            updateUI();
            
            if (audioEnabled) {
                try {
                    bgMusic.currentTime = 0;
                    const playPromise = bgMusic.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("No se pudo reproducir música de fondo, intentando cargar fuente alternativa");
                            loadAlternativeAudio(bgMusic);
                        });
                    }
                } catch (e) {
                    console.log("Error al reproducir música de fondo:", e);
                }
            }
            
            gameLoop();
        }

        function enableAudioAndStart() {
            audioEnabled = true;
            
            const audioElements = [laserSound, explosionSound, gameOverSound, levelUpSound, bgMusic];
            audioElements.forEach(audio => {
                try {
                    audio.load();
                    if (audio.play) {
                        audio.play().then(() => audio.pause()).catch(e => {
                            console.log("Error al precargar audio:", e);
                        });
                    }
                } catch (e) {
                    console.log("Error al cargar audio:", e);
                }
            });
            
            startScreen.style.display = 'none';
            startGame();
        }

        startBtn.addEventListener('click', enableAudioAndStart);
        restartBtn.addEventListener('click', restartGame);

        document.addEventListener('keydown', (e) => {
            if (!gameRunning) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    moveLeft = true;
                    break;
                case 'ArrowRight':
                    moveRight = true;
                    break;
                case ' ':
                    shootLaser();
                    e.preventDefault();
                    break;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    moveLeft = false;
                    break;
                case 'ArrowRight':
                    moveRight = false;
                    break;
            }
        });

        leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveLeft = true;
        });
        
        leftBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            moveLeft = false;
        });
        
        rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveRight = true;
        });
        
        rightBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            moveRight = false;
        });
        
        shootBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            shootLaser();
        });
        
        leftBtn.addEventListener('mousedown', () => moveLeft = true);
        leftBtn.addEventListener('mouseup', () => moveLeft = false);
        leftBtn.addEventListener('mouseleave', () => moveLeft = false);
        
        rightBtn.addEventListener('mousedown', () => moveRight = true);
        rightBtn.addEventListener('mouseup', () => moveRight = false);
        rightBtn.addEventListener('mouseleave', () => moveRight = false);
        
        shootBtn.addEventListener('mousedown', shootLaser);

        window.addEventListener('load', () => {
            startScreen.style.display = 'flex';
        });