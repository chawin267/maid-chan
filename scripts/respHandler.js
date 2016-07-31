function submitText() {
  var text = $('#input_box').val();
  $('#input_box').val('');
  var request = app.textRequest(text);

  request.on('response', genRespHandler);

  request.on('error', function(error) {
    console.log(error);
  });

  request.end();
}

$('#input_btn').click(submitText);

$('#input_box').bind('keyup', function(e) {
  if (e.keyCode === 13) submitText();
});

function genRespHandler(response) {
  // DEBUG
  console.log('In genRespHandler()');
  console.log(response);
  console.log(response.result.fulfillment.speech);

  var fulfillment = response.result.fulfillment.speech;
  writeText(fulfillment);

}

// write text to bubble with delay
function writeText(text) {

  var delay = 30;
  var elem = $('#speech_bubble');

  // clear text in the bubble
  elem.text("");

  //text- string
  //elem - jQuery element where text is to be attached
  //delay - the delay in each text
  var addTextByDelay = function(text, elem, delay) {
    if (!elem) {
      elem = $('body');
    }
    if (!delay) {
      delay = 300;
    }
    if (text.length > 0) {
      //append first character
      elem.append(text[0]);
      setTimeout(
        function() {
          //Slice text by 1 character and call function again
          addTextByDelay(text.slice(1), elem, delay);
        }, delay
      );
    }
  }

  addTextByDelay(text, elem, delay);
}
// ref: http://stackoverflow.com/questions/19465256/jquery-function-to-display-text-one-character-at-a-time
