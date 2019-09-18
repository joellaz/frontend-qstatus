function sendQuestion() {
  var deDom = document.getElementsByTagName('html');
  console.log(deDom);
  var mainContainer = document.getElementById('newQuestion');
  console.log(mainContainer.value);
  var IQContainer = document.getElementById('IQstate');
  console.log(IQContainer.value);
  var SQContainer = document.getElementById('SQstate');
  console.log(SQContainer.value);
  var FQContainer = document.getElementById('FQstate');
  console.log(FQContainer.value);
  var EQContainer = document.getElementById('EQstate');
  console.log(EQContainer.value);

  let sendableQuestion = {};
  sendableQuestion.text = mainContainer.value;
  sendableQuestion.eqWeight = EQContainer.value;
  sendableQuestion.sqWeight = SQContainer.value;
  sendableQuestion.iqWeight = IQContainer.value;
  sendableQuestion.fqWeight = FQContainer.value;

  if (document.getElementById('openQ').checked) {
    const request = fetch('http://localhost:8082/openquestion', {
      method: 'POST',
      body: JSON.stringify(sendableQuestion),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else if (document.getElementById('closedQ').checked) {
    const request = fetch('http://localhost:8082/closedquestion', {
      method: 'POST',
      body: JSON.stringify(sendableQuestion),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  location.href = './make_question.html';

  request.then(response => {
    if (response.status === 201) {
      response
        .json()
        .then(result => console.log('Question succesfully added: ' + result));
    }
  });
}
