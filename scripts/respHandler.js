// use text input to create request
function submitText() {
  var text = $('#input_box').val();
  $('#input_box').val('');
  if (text === '') return;

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

/* ---------------------------------------------------------------------------------------------- */

// write general response
function genRespHandler(response) {
  // DEBUG
  console.log('In genRespHandler()');
  console.log(response);
  console.log(response.result.fulfillment.speech);

  var fulfillment = response.result.fulfillment.speech;

  if (fulfillment === '') noFulfill();
  else writeText(fulfillment);

}
