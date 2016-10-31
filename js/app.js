
var x = true;//put X or O
var drawCount = 0;//if all 9 cells were pressed
var isDraw = true;
var lastWinnerCombination; //to reset BG color when press RESET

// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function
  $("#board").removeClass('visuallyhidden', 2000);//make board visible in 2s

  var cells = $(".box"); // get all .box elements
  $(cells).one('click', function(){play(this)});

//pressing on RESET button
  $("#play-again").on('click', function(){
    drawCount = 0;
    isDraw = true;
    x = true;//make X go first at the beginning of the game
    $(".box").html(""); //reset all cells//bind back click event
    $(".box").one('click', function(){play(this);});
    $(lastWinnerCombination).css('background', '#e8edf3');//reset BG color of winning combination
    $(".x").css("border", "2px solid green"); //set green border around X...X is next turn
    $(".o").css("border", "none");

    $(".message").css('height', '0');
  });
});

//every time you press on the cell this function going to work
function play(cell){
  putXorO(cell);
  isGameOver();
}

//draw X or O on the board
function putXorO(cell){
  if($(cell).text()===""){
    if(x){
        $(cell).html("<h1 style='color:#F79F79'>X</h1>");
        $(".x").css("border", "none");
        $(".o").css("border", "2px solid green");
        x = !x;
    }
    else {
      $(cell).html("<h1 style='color:#87B6A7'>O</h1>");
      $(".x").css("border", "2px solid green");
      $(".o").css("border", "none");
      x = !x;
    }
  }
}

function isGameOver(){
  var horizontalStr = [$('#cell0').text()+$('#cell1').text()+$('#cell2').text(),
                      $('#cell3').text()+$('#cell4').text()+$('#cell5').text(),
                      $('#cell6').text()+$('#cell7').text()+$('#cell8').text()];
  var verticalStr = [$('#cell0').text()+$('#cell3').text()+$('#cell6').text(),
                      $('#cell1').text()+$('#cell4').text()+$('#cell7').text(),
                      $('#cell2').text()+$('#cell5').text()+$('#cell8').text()];
  var diagonals = [$('#cell0').text()+$('#cell4').text()+$('#cell8').text(),
                      $('#cell2').text()+$('#cell4').text()+$('#cell6').text()];
  drawCount++;
  //check all horizontal and vertical strings
  for(var i=0; i<3; i++){
    if(showWinningCombination(horizontalStr[i], verticalStr[i], diagonals[i], 'XXX', i)){
          $(".message-content h1").html("Player <span style='color:#F79F79'>X</span> has won!");
          setTimeout(function(){$(".message").css('height', '75%')}, 700);
          isDraw = false;
          $(".box").unbind('click');
          break;
    }else if(showWinningCombination(horizontalStr[i], verticalStr[i], diagonals[i], 'OOO', i)){
          $(".message-content h1").html("Player <span style='color:#87B6A7'>O</span> has won!");
          setTimeout(function(){$(".message").css('height', '75%')}, 700);
          isDraw = false;
          $(".box").unbind('click');
          break;
    }
   }

  if(drawCount===9 && isDraw){
    $(".message-content h1").html("It's a DRAW!");
    setTimeout(function(){$(".message").css('height', '75%')}, 700);
  }
}

function showWinningCombination(horizontal, vertical, diagonal, pattern, index){
  switch (pattern) {
    case horizontal:
      lastWinnerCombination = $('.row'+(index+1)); //to reset BG color when press RESET
      $('.row'+(index+1)).css('background', '#656E90');
      return true;
      break;
    case vertical:
      lastWinnerCombination = $('.col'+(index+1)); //to reset BG color when press RESET
      $('.col'+(index+1)).css('background', '#656E90');
      return true;
      break;
    case diagonal:
      lastWinnerCombination = $('.diag'+(index+1)); //to reset BG color when press RESET
      $('.diag'+(index+1)).css('background', '#656E90');
      return true;
      break;
    default:
      return false;
  }
}
