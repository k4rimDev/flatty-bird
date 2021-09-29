$(document).ready(function(){
    // Saving Variables
    let container = $(".game-container"),
        bird = $(".bird"),
        pole = $(".pole")
        pole1 = $(".pole1"),
        pole2 = $(".pole2"),
        speedSpan = $("#speed"),
        scoreSpan = $("#score"),
        restart = $(".restart-btn");


    // Saving Some initial setup
    let containerWidth = parseInt(container.width());
    let containerHeight = parseInt(container.height());
    let poleInitialPosition = parseInt(pole.css('right'));
    let poleInitialHeight = parseInt(pole.css('height'));
    let birdLeft = parseInt(bird.css('left'));
    let birdHeight = parseInt(bird.height());
    let speed = 10;
    let score = 0;

    // Bird coordinate
    let goUp = false;
    let scoreUpdated = false;
    let gameOver = false;

    // Movement of Poles
    let game = setInterval(function(){
        if(collision(bird, pole1) || collision(bird, pole2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) >= containerHeight - birdHeight   ){
            stopGame();
        }else{
            let poleCurrentPosition = parseInt(pole.css('right'));
            
            if(poleCurrentPosition > containerWidth - birdLeft){
                if(scoreUpdated ===false){
                    scoreSpan.text(parseInt(scoreSpan.text()) + 1);
                    scoreUpdated = true;
                }
            }

            // Check the poles out of container
            if(poleCurrentPosition > containerWidth){
                poleCurrentPosition = poleInitialPosition;
                
                // Change the height of poles
                let min = -100;
                let max = 100;
                let newHeight = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
                pole1.css('height', poleInitialHeight + newHeight);
                pole2.css('height', poleInitialHeight - newHeight);

                // Increase speed
                speed +=1;
                speedSpan.text(speed);

                scoreUpdated = false;
                poleCurrentPosition = poleInitialPosition;
                // Increase score
                
            }
            pole.css('right', poleCurrentPosition + speed);

            // Move Bird
            if(goUp === false){
                goDown();
            }
        }
    }, 40)

    // Keys
    $(document).on('keydown', function(e){
        let key = e.keyCode;
        if(key ===32 && goUp === false && gameOver === false){
            goUp = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function(e){
        let key = e.keyCode;
        if(key ===32){
            clearInterval(goUp);
            goUp = false;
        }
    })

    // Go down and up functions
    function goDown(){
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    function up(){
        bird.css('top', parseInt(bird.css('top')) - 10);
    }

    function collision($div1, $div2) {
        let x1 = $div1.offset().left;
        let y1 = $div1.offset().top;
        let h1 = $div1.outerHeight(true);
        let w1 = $div1.outerWidth(true);
        let b1 = y1 + h1;
        let r1 = x1 + w1;
        let x2 = $div2.offset().left;
        let y2 = $div2.offset().top;
        let h2 = $div2.outerHeight(true);
        let w2 = $div2.outerWidth(true);
        let b2 = y2 + h2;
        let r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    function stopGame(){
        restart.css('top', "0px")
        clearInterval(game);
        gameOver = true;
    }

    // Restart game
    restart.click(function(){
        location.reload();
    })
})