// Keeps timeout ID used to write text
var timeoutId;

// Handles case empty fulfillment
function noFulfill() {

  var delay = 5000;

  setPic('./images/nofulfill.gif');
  writeText('What are you talking about, Onii-chan?');

  setTimeout(
    function() {
      writeText('');
      setPic('./images/default.gif');
    }, delay
  );
}

// Writes text to bubble with delay
function writeText(text) {

  var delay = 30;
  var elem = $('#speech_bubble');

  // Stops previous text being written
  clearTimeout(timeoutId);

  // Clear text in the bubble
  elem.text('');

  //text- string
  //elem - jQuery element where text is to be attached
  //delay - the delay in each text
  var addTextByDelay = function(text, elem, delay) {
    if (!elem) {
      elem = $('body');
    }
    if (!delay) {
      delay = 30;
    }
    if (text.length > 0) {
      //append first character
      elem.append(text[0]);
      timeoutId = setTimeout(
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

/* ---------------------------------------------------------------------------------------------- */

// change <ai_pic> to a picture specified in <picPath>
function setPic(picPath) {
  var elem = $('#ai_pic');
  elem.attr('src', picPath);
}
