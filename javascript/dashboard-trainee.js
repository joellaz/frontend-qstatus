window.onload = function() {
  user = JSON.parse(localStorage.getItem('choosenUser'));
  console.log(user);
  // Store acquired data in the right element (myData), so that it can be displayed.

  if (user !== null) {
    var mainContainer = document.getElementById('myData');
    mainContainer.innerHTML = 'Welkom terug ' + user.username + '!';
    console.log(mainContainer);
    console.log(user);
  }
  creatAnswerList();
};

function creatAnswerList() {
  let sendableAnswer = {};
  sendableAnswer.trainee = JSON.parse(localStorage.getItem('choosenUser'));
  console.log('BONJOUR');
  const request = fetch('http://localhost:8082/answerlist', {
    method: 'POST',
    body: JSON.stringify(sendableAnswer),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
