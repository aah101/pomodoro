 //now, when you adjust the study session timer, it reverts to 25 on the seocnd loop. check split between sessionTime and data
 //what is registering where
 //brak timer doesn't appear to be working

//60 * minutesMinus = newMinutes = duration = timer
//document.querySelector('#time') = display = display.textContent  
//the interval function breaks down the main number into mins/secs 
//$('#sessionLength').text(data) = 25 - is set by data, data is adjusted in onclick calls

//so data and timer don't overlap, they are two separate representations of the time. run in parallel.
//surely it would be better to run them both?

//global variable to update minutes
var sessionTime = 25 * 60;
//global var to declare starting minutes
var data = 25;
//var for break length
var breakTime = 25;
//var breakNumber;//will need to set this up, so that you can update it via
var sessionID;
    //function for the timer
    var startTimer = function(duration, display) {
    //delcare timerm equal to duration passed in from the function, also decalre minutes and seconds
    
    var timer = duration, minutes, seconds, secondsElapsed;
    //created to preserve data's inital value. break wasnt registering on second round due to falling to 0. 
    var tempData = data;
    
    //chck if pause is not clicked
    var isPaused = true;
    //the inner fucntion that keeps clock ticking
    var intervals = function() {
         

        //minutes equals each of the 25 divided by 60,
        minutes = parseInt(timer / 60, 10);
        //this sets seconds to 0 for the start of each minute
        seconds = parseInt(timer % 60, 10);
        //if minutes is less than 10, add the 0
        minutes = minutes < 10 ? "0" + minutes : minutes;
        //if seconds is less than 10, add the 0
        seconds = seconds < 10 ? "0" + seconds : seconds;
        //record seconds Elapsed to add to updated minutes
        secondsElapsed = 60 - seconds;
        //set display content, which has been set in onload function to html div 'timer'
        display.textContent = minutes + ":" + seconds;
        //if paused is true, the timer keeps running until it hits 0, then resets
    
        if(isPaused) {
            timer--;
        if(timer <= 0) {
        clearInterval(intervalID);
        sessionID = setInterval(breakIntervals, 1000);
    //    }
    }
}
}
var breakIntervals = function() {
    //console.log(data);
        //minutes equals each of the 25 divided by 60,
        minutes = parseInt(tempData / 60, 10);
        //this sets seconds to 0 for the start of each minute
        seconds = parseInt(tempData % 60, 10);
        //if minutes is less than 10, add the 0
        minutes = minutes < 10 ? "0" + minutes : minutes;
        //if seconds is less than 10, add the 0
        seconds = seconds < 10 ? "0" + seconds : seconds;
        //record seconds Elapsed to add to updated minutes
        secondsElapsed = 60 - seconds;
        //set display content, which has been set in onload function to html div 'timer'
        display.textContent = minutes + ":" + seconds;
        //if paused is true, the timer keeps running until it hits 0, then resets
        if(isPaused) {
        if (--tempData <= 0) {
        clearInterval(sessionID);
        startTimer(data, display);
    }
}
}

var intervalID = setInterval(intervals, 1000);
//set initial value of session length
$('#sessionLength').text(data) * 60;
//set initial value of break length;
$('#breakLength').text(breakTime);
//$('#time').text(newMinutes);
//breakTime = 1;






//function to pause countdown
$('.circle').on('click', function(e) {
  e.preventDefault();
  //switch ispaused Boolean
  if(isPaused) {
    isPaused = false;
} else {
isPaused = true;
    }
});

//function to subtract one minute from study time
 $('.sessionMinus').on('click', function(e) {
    //console.log('clikcMinus')
    if(!isPaused) {
    //if(!breakSwitch) {
    if(data > 0) {
   e.preventDefault();
  data = data - 1;
  if( data <= 0) {
    data = 0;
  }
  $('#sessionLength').text(data);
    if(secondsElapsed < 60) {
    timer = timer - 60 + secondsElapsed;
  } else {
    timer = timer - 60;
  }

            }

        }
   });
 //function to add one minute from study time
 $('.sessionPlus').on('click', function(e) {

    if(!isPaused) {
    //if(!breakSwitch) {
    if(data >= 0) {
   e.preventDefault();
  data = data + 1;
  $('#sessionLength').text(data);

  if(secondsElapsed < 60) {
    timer = timer + 60 + secondsElapsed;
  } else {
    timer = timer + 60;
  }
            }
        }
   });


   //function to subtract one minute from break time
    $('.breakMinus').on('click', function(e) {
        console.log('clikcMinus')
    if(!isPaused) {
    if(timer > 0) {
   e.preventDefault();
  breakTime -= 1;
  if( data <= 0) {
    data = 0;
  }
  $('#breakLength').html(breakTime);

  if(secondsElapsed <= 60) {
    timer = timer - 60 + secondsElapsed;;
  } else {
    timer = timer - 60;
  }

  //$('#breakLength').html() * 60
  //timer = timer - 60 + secondsElapsed;
            }
        }
   });

//function to add one minute to break time
$('.breakPlus').on('click', function(e) {
        console.log('clikcPLus')
    if(!isPaused) {
    if(timer > 0) {
   e.preventDefault();
  breakTime += 1;
  if(secondsElapsed < 60) {
    timer = timer + 60 + secondsElapsed;
  } else {
    timer += + 60;
  }
  $('#breakLength').html(breakTime) + 1;
            }
        }
   });


}

//run the function on window onload
window.onload = function () {
    //newMinutes = 60 * minutesMinus;
    //set the display equal to the html div
    var display = document.querySelector('#time');
    //call the function
    startTimer(sessionTime, display);
};

