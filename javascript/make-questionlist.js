window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      maakTabel(this.responseText);
    }
  };
  xhr.open('GET', 'http://localhost:8082/questionlist/all', true);
  xhr.send();
};
function maakTabel(deJSON) {
  var eindHTML = '<table>';
  var alleQL = JSON.parse(deJSON);
  for (var x = 0; x < alleQL.length; x++) {
    eindHTML += '<tr><td class=QFO >' + alleQL[x].id + '</td></tr>';
    for (var y = 0; y < alleQL[x].questionList.length; y++) {
      eindHTML +=
        '<tr><td class=QFE >' + alleQL[x].questionList[y].text + '</td></tr>';
    }
  }
  eindHTML += '<table>';
  document.getElementById('questionlistoverview').innerHTML = eindHTML;
}
