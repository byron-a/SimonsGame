//alert('fine')
var h1 = $('h1').html();
console.log(h1);

let gamePattern = [];

let userClickedPattern = [];

let buttonColour = ["red", "blue", "green", "yellow"]

var onePress = 0;
var level = 'level ';
//var difficulty = 0;

//START GAME......
document.addEventListener('keypress',()=>{
    if(onePress == 20){
        location.reload();
    }if(onePress < 1){
       setTimeout(()=>{nextSequence();},250) 
        }
});

function nextSequence(){
    if(onePress==20){
        gameOver();
    }else{
        let randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour = buttonColour[randomNumber];
        gamePattern.push(randomChosenColour);
    
        let buttons = $("#"+ randomChosenColour);
        buttons.ready(()=>{
            buttons.css("opacity", "0");
            setInterval(()=>{buttons.css("opacity", "1")},200)
        });

        playSound(buttons.text()); //button colour getter
        onePress++
        $('h1').html(level + onePress);
    }
    
}

// let audio = new Audio('/sounds/'+randomChosenColour+'.mp3');
// audio.play();
//or
function playSound(sound){
    switch(sound){
        case'red': new Audio('./sounds/red.mp3').play(); //audio constructor function
            break;
        case'green': new Audio('./sounds/green.mp3').play();
            break;
        case'yellow': new Audio('./sounds/yellow.mp3').play();
            break;
        case'wrong' : new Audio('./sounds/wrong.mp3').play();
            break;   
            default: new Audio('./sounds/blue.mp3').play();                    
    }
}

///...DETECTING WHEN A BUTTON IS CLICK SENDING THE 'ID' TO AN EMPTY ARRAY....///////
let clickFreq = 0;
let chance = 0;
$('.btn').click((e)=>{
    if(gamePattern.length >0){
        var userChoosenColour = e.target; //finds the node
        console.log(userChoosenColour)
        var id = userChoosenColour.getAttribute("id");
        let patternItems = userClickedPattern.length;
        userClickedPattern.push(id);
    
            if(id == userClickedPattern[clickFreq] && id == gamePattern[clickFreq]){//1sd check
                playSound(id);
               if(clickFreq == patternItems ){ //2nd check
                    setTimeout(()=>{nextSequence()},1000); //automate next level
                    clickFreq = 0;
                }else{
                    userClickedPattern.pop(); 
                    clickFreq++;
                };
            }else{
                userClickedPattern.pop(); 
                if(chance > 0){
                   gameOver();
                   chance = 0;
                }else{
                    playSound('wrong');
                    $('body').addClass('game-over') 
                    setInterval(()=>{$('body').removeClass('game-over')},100)
                    $('h1').html('Last Chance !');
                    chance++;
                }; 
            };
    
         animatePress($('#'+id));
    }    
});

//BUTTON ANIMATION......
function animatePress(curentColour){
     curentColour.addClass("pressed");
     setInterval(()=>{
        curentColour.removeClass('pressed')},100);
}

//GAMEOVER...
function gameOver(){
    if(onePress == 20){
        setInterval(()=>{$('.btn').toggleClass('pressed')},200);
        $('h1').html('You Won !, Smart Ass. Press any key to restart.');
        clickFreq = undefined;
        onePress = 20;
    }else{
        playSound('wrong');
        $('body').addClass('game-over')
        setInterval(()=>{$('body').removeClass('game-over')},100)
        $('h1').html('Game Over!, You Dumb Ass. ');  
        clickFreq = 0;
        onePress = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
    
}

