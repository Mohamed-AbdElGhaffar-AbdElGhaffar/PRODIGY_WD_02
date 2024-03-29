var hour = $('#hr');
var min = $('#min');
var sec = $('#sec');
var ms = $('#ms');
var saveTimes = $('.saveTimes')
var flip = false;
var intervalCounter = 0;
var btnStartStop = $('#btn-start-stop');
var labelStartStop = $('#label-start-stop');
var btnReset = $('#btn-reset');
var btnSave = $('.save');
var currentTime = 0;
var stop = true;
var time; 
var appendMilliSecond = 0;
var count = 0;

function timer(){
  var interval = 10;
  time = setInterval(function() {
    intervalCounter += interval;
    if (!stop) {

      if ((intervalCounter%10)==0) {
        if(appendMilliSecond >= 99 ){
          appendMilliSecond=0;
          appendMilliSecond += 1;
          var appendMS = appendMilliSecond < 10 ? "0" + appendMilliSecond : appendMilliSecond;
          ms.html(appendMS);
        }else{
          appendMilliSecond += 1;
          var appendMS = appendMilliSecond < 10 ? "0" + appendMilliSecond : appendMilliSecond;
          ms.html(appendMS);
        }
      }
      
      if((intervalCounter%1000)==0){
        currentTime += 1000;
        var appendHour = Math.floor(currentTime / (1000 * 60 * 60)); 
        var appendMinute = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
        var appendSecond = Math.floor((currentTime  % (1000 * 60)) / 1000);
        
        appendHour = appendHour < 10 ? "0" + appendHour : appendHour;
        appendMinute = appendMinute < 10 ? "0" + appendMinute : appendMinute;
        appendSecond = appendSecond < 10 ? "0" + appendSecond : appendSecond;
        
        hour.html(appendHour);
        min.html(appendMinute);
        sec.html(appendSecond);
      }
    }
  }, 10); 
}

function startAndStop(){
  $('#btn-start-stop .stop-watch').addClass('sw-click');

  setTimeout(function(){
    $('#btn-start-stop .stop-watch').removeClass('sw-click');
  },200);

  stop = !stop;
  if(!stop){
    labelStartStop.html('STOP');
    if(!intervalCounter){
      timer();
    }
    btnSave.css('opacity',1);
  }else{ 
    labelStartStop.html('START');
    btnSave.css('opacity',0.5);
  }
  btnReset.css('opacity',1);
  $('.btn-reset .bl-parts').css('transition','transform 0s');
  btnReset.removeClass('br-click');

  setTimeout(function(){
    $('.btn-reset .bl-parts').css('transition','transform 0.5s');
  },200);
}

function reset(){
  if(!stop){
    stop = !stop;
    labelStartStop.html('START');
  }
  clearInterval(time);
  if(intervalCounter){
    currentTime = 0;
    intervalCounter = 0;
    hour.html("00");
    min.html("00");
    sec.html("00");
    ms.html("00");
    $(this).css('opacity',0.5);
    btnSave.css('opacity',0.5);
    $(this).addClass('br-click');
  }
}

function save() {
    if (!stop) {
      $('.save i').addClass('fa-bounce');

      setTimeout(function(){
        $('.save i').removeClass('fa-bounce');
      },500);
      count++;
      var savedText = "#" + count + " " + hour.html() + ":" + min.html() + ":" + sec.html() + ":" + ms.html();
      
      var savedTime = $("<p>").html(savedText);
      
      saveTimes.prepend(savedTime);
    }
}

btnStartStop.on('click', startAndStop);
btnReset.on('click', reset);
btnSave.on('click', save);

