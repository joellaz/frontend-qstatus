var choosenUser;
var allUsers;

function receiveUsers() {
  // Fetching all users in database.
  const request = fetch('http://localhost:8082/user/all');
  request.then(response => {
    if (response.status === 200) {
      response.json().then(result => {
        allUsers = result;
        for (var i = 0; i < result.length; i++) {
          // Store acquired data in the right element, so that it can be displayed.
          var mainContainer = document.getElementById(i);
          mainContainer.innerHTML = result[i].username;
        }
      });
    }
  });
}

function setChoosenUser(clickedId) {
  choosenUser = allUsers[clickedId];
}

function isTrainee(allTrainees, trainee) {
  var traineeDetected = false;
  console.log(allTrainees);
  for (var i = 0; i < allTrainees.length; i++) {
    if (allTrainees[i].id === trainee.id) {
      traineeDetected = true;
    }
  }
  console.log(traineeDetected);
  return traineeDetected;
}

function sendChoosenUser() {
  var allTrainees;
  const request = fetch('http://localhost:8082/trainee/all');
  request.then(response => {
    if (response.status === 200) {
      response.json().then(result => {
        allTrainees = result;
        console.log(allTrainees);
        isTrainee = isTrainee(allTrainees, choosenUser);
        if (isTrainee) {
          localStorage.setItem('choosenUser', JSON.stringify(choosenUser));
          localStorage.setItem('userType', 'trainee');
          location.href = './dashboard_trainee.html';
        } else {
          localStorage.setItem('choosenUser', JSON.stringify(choosenUser));
          localStorage.setItem('userType', 'manager');
          location.href = './dashboard_manager.html';
        }
      });
    }
  });
}
