const request = fetch('http://localhost:8082/closedquestion/4');
request.then(response => {
  if (response.status === 200) {
    response.json().then(result => {
      jsonData = result.text;
      console.log(jsonData);

      // Store acquired data in the right element (myData), so that it can be displayed.
      var mainContainer = document.getElementById('myData');
      mainContainer.innerHTML = jsonData;
    });
  }
});
