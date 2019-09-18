window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      maakTabel(this.responseText);
    }
  };
  xhr.open("GET", "http://localhost:8082/questionlist/all", true);
  xhr.send();

  getAllQuestions();
};

async function getAllQuestions() {
  response = await fetch("http://localhost:8082/question/all");
  questions = await response.json();
  console.log(questions);

  const el = document.getElementById("allQuestions");

  let htmlString = "<h3>Alle vragen</h3><table>";
  questions.forEach(question => {
    htmlString += `<tr><td class=QFE >${question.text}<input style="margin: 5px;" type="checkbox" name="questionCheckboxes"></input></td></tr>`;
  });
  htmlString += "</table>";

  el.innerHTML = htmlString;
}

function maakTabel(deJSON) {
  var eindHTML = "<h3>Vragenlijsten</h3><table>";
  var alleQL = JSON.parse(deJSON);
  for (var x = 0; x < alleQL.length; x++) {
    eindHTML += "<tr><td class=QFO >" + alleQL[x].id + "</td></tr>";
    for (var y = 0; y < alleQL[x].questionList.length; y++) {
      eindHTML +=
        "<tr><td class=QFE >" + alleQL[x].questionList[y].text + "</td></tr>";
    }
  }
  eindHTML += "<table>";
  document.getElementById("questionlistoverview").innerHTML = eindHTML;
}
