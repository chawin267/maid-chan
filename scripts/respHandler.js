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

function handleResp(response) {
  // DEBUG
  console.log(response);
  console.log(response.result.action);

  var action = response.result.action;
  switch (action) {
    case '':

      break;
    default:
      handleDefResp(response);
  }
}

// write general response
function handleDefResp(response) {

  var fulfillment = response.result.fulfillment.speech;

  if (fulfillment === '') noFulfill();
  else writeText(fulfillment);

}
