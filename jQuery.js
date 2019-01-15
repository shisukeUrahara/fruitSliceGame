var isPlaying = false;
var score;
var livesLeft;
var step;
var action;
var fruits=['apple','grapes','guava','orange','pineapple'];
$(function(){
    // I.) when we click the startReset button
    $("#startReset").click(function(){
        // if we are playing, reload the page
        if(isPlaying){
            location.reload();
        }
        else{
            // we were not playing and clicked the startreset button
            // set the score to zero  and print it
            score=0;
            $('#scoreValue').text(score);
            // set isPlaying to true
            isPlaying=true;
            // change start button to reset button
            $("#startReset").text("RESET GAME");
            // show trials left text
            $("#trialsLeft").show();
            livesLeft=3;
            showLives();
            // start sending fruits
            startAction();
        }
    })


// functions
function showLives(){
    // console.log("in the function");
    $("#trialsLeft").empty();
    for(i=0;i<livesLeft;i++){
        $("#trialsLeft").append("<img src='images/heart.png' class='heart'>");
    }
}

function startAction(){
    // $("#fruitsContainer").append("<img src='images/apple.png' class='fruits'>");
    $("#fruit1").show();
    // choosinf a random fruit
    chooseFruit();
    // choose a random position
    $("#fruit1").css({'left':Math.round(Math.random()*550),'top':-50});
    // generate a random step by which rate the fruit falls down
     step=1+Math.round(Math.random()*5);

     // making the fruit fall each 10ms
     action=setInterval(function(){
           $("#fruit1").css("top",$("#fruit1").position().top+step);
           //  if fruit is too low(i.e top position of fruit is greater than the height of the fruitContainer)
    if($("#fruit1").position().top > $("#fruitsContainer").height()){
        // check if we have trials left
        if(livesLeft>1){
           $("#fruit1").show();
           // choosinf a random fruit
           chooseFruit();
           $("#fruit1").css({'left':Math.round(Math.random()*550),'top':-50});
           // generate a random step by which rate the fruit falls down
            step=1+Math.round(Math.random()*5);
            // reduce number of lives left
            livesLeft--;
            // print lives left on screen
            showLives();
        }
        else{// game is over so

           // we are no longer playing
           isPlaying=false;
           // change reset game to start game
           $("#startReset").text("START GAME");
           // show game over section and the score
           $("#gameOver").show();
           $("#gameOver").html("<p>GAME OVER</p><p>YOUR SCORE IS "+score+"</p>");

           // stop dropping fruits
           stopAction();

        }
   
     }},10);
    }

    // slicing the fruit
    $("#fruit1").mouseover(function(){
        // update the score
        score++;
        $("#scoreValue").text(score);
        // playing the slice sound
        // document.getElementById("#sliceSound").play();
        $("#sliceSound")[0].play();

        // hide fruit and stop it from falling simply
        // stopAction();

        // hide fruit
        clearInterval(action);
        // put new animation
        $("#fruit1").hide("explode",500);
        // the above line means animation explode takes place for 500ms

        // send new fruit but wait till the animation is finished
        setTimeout(startAction,500);
        

    });

function chooseFruit(){
    $("#fruit1").attr('src','images/'+fruits[Math.round(Math.random()*4)]+'.png');
}

function stopAction(){
    // stop dropping fruits
    clearInterval(action);
    // hide the fruits
    $("#fruit1").hide();
}
});
/* pseudocode

(I) after clicking the startreset button 
if(we  are  playing){
reload page
}
else{
    1.)show trials left box
    2.)change start game button to restart game button
    3.)(i)create a random fruit
       (ii)create a random step
       (iii) move that fruit down by one step per sec
       (iv) if(fruit is too low i.e reached the bottom)
       {
           repeat step (iii)
       }
       else{
           if( any trials left){
               do step (i)
           }
           else{
               (a)show game over and score
               (b)change reset game to start game button 

           }
       }
}

(II) if (we have sliced a fruit)
{
    (i) explode the fruit
    (ii)make the exploding sound
    (iii)increase score by one
}
*/