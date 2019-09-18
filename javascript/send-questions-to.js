var choosenUser;
var allUsers;
var ChoosenQuestionlist;
var allQuestionLists;

function receiveUsers() {
  console.log('hoy');
  // Fetching all users in database.
  const request = fetch('http://localhost:8082/trainee/all');
  request.then(response => {
    if (response.status === 200) {
      response.json().then(result => {
        allUsers = result;
        console.log(allUsers);
        for (var i = 0; i < result.length; i++) {
          // Store acquired data in the right element, so that it can be displayed.
          var mainContainer = document.getElementById(i);
          mainContainer.innerHTML = result[i].username;
        }
      });
    }
  });
}

function receiveQuestionLists() {
  // Fetching all question lists in database.
  const request = fetch('http://localhost:8082/questionlist/all');
  request.then(response => {
    if (response.status === 200) {
      response.json().then(result => {
        allQuestionLists = result;
        console.log(result.length);
        for (var i = 0; i < result.length; i++) {
          // Store acquired data in the right element, so that it can be displayed.
          var mainContainer = document.getElementById('questionlist' + i);
          mainContainer.innerHTML = 'Vragenlijst ' + allQuestionLists[i].id;
        }
      });
    }
  });
}

function setChoosenUser(clickedId) {
  choosenUser = allUsers[clickedId];
}

function setChoosenQuestionlist(clickedId) {
  choosenQuestionlist = allQuestionLists[clickedId];
}

function sendData() {
  localStorage.setItem('sendUser', JSON.stringify(choosenUser));
  localStorage.setItem('sendQuestionList', JSON.stringify(choosenQuestionlist));
  // TODO: Hier een "succes!" pagina voor maken.
  location.href = './dashboard_manager.html';
}
