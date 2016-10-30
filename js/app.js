
var x = true;//put X or O
var drawCount = 0;//if all 9 cells were pressed
var isDraw = true;
// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function
  var cells = $(".box"); // get all .box elements
  $(cells).on('click', function(){play(this);});

//pressing on RESET button
  $("#reset").on('click', function(){
    $(".box").html("");
    $(".box").bind('click', function(){play(this);});
    x = true;
    drawCount = 0;
    isDraw = true;
    $(".x").css("border", "2px solid green");
    $(".o").css("border", "none");
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
        $(cell).html("<h1>X</h1>");
        $(".x").css("border", "none");
        $(".o").css("border", "2px solid green");
        x = !x;
    }
    else {
      $(cell).html("<h1>O</h1>");
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
    if(horizontalStr[i]==='XXX' || verticalStr[i]==='XXX' || diagonals[i]==='XXX')
    {
      alert('X is a winner!');
      isDraw = false;
      $(".box").unbind('click');
      break;
    }
    else if(horizontalStr[i]==='OOO' || verticalStr[i]==='OOO' || diagonals[i]==='OOO'){
      alert('O is a winner!');
      isDraw = false;
      $(".box").unbind('click');
      break;
    }
  }

  if(drawCount===9 && isDraw){
    alert("It's a draw!");
  }
}
