import { LitElement, html, css } from 'lit-element';

class AnswerElement extends LitElement {
  static get properties() {
    return {
      questionIterator: {
        type: Number
      }
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.getQuestionList();
    let answer = document.getElementById('newAnswer');
    answer.addEventListener('keypress', function(event) {
      if (event.keyCode == 13) {
        console.log('sdfdsf');
        event.preventDefault();
        document.getElementById('submit-button').click();
        document.getElementById('newAnswer').value = '';
      }
    });
  }

  async getQuestionList() {
    const response = await fetch('http://localhost:8082/questionlist/1');
    if (response.status === 200) {
      const dataJson = await response.json();
      this.questionList = dataJson.questionList;
      this.questionIterator = 0;
      this.amountQuestions = this.questionList.length;
    }
  }

  sendAnswer(e) {
    let sendableAnswer = {};

    sendableAnswer.question = {
      id: this.questionList[this.questionIterator].id,
      text: this.questionList[this.questionIterator].text
    };
    sendableAnswer.answerList = {
      id: 1
    };
    this.questionList[this.questionIterator].questionType === 'OPEN'
      ? this.sendOpenAnswer(sendableAnswer, e)
      : this.sendClosedAnswer(sendableAnswer, e);
  }

  sendClosedAnswer(sendableAnswer, e) {
    let options = document.getElementsByName('closed-question');
    console.log(options);
    let radio;
    let value;
    for (radio of options) {
      if (radio.checked) {
        value = radio.value;
        break;
      }
    }
    if (value) {
      sendableAnswer.text = value;
      const request = fetch('http://localhost:8082/closedanswer', {
        method: 'POST',
        body: JSON.stringify(sendableAnswer),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.questionIterator++;
      if (this.questionIterator == this.amountQuestions) {
        window.location = './dashboard_trainee.html';
      }
    }
  }

  sendOpenAnswer(sendableAnswer, e) {
    sendableAnswer.text = e.target.parentNode.querySelector('input').value;
    sendableAnswer.title = 'openquestion';
    const request = fetch('http://localhost:8082/openanswer', {
      method: 'POST',
      body: JSON.stringify(sendableAnswer),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.questionIterator++;
    if (this.questionIterator == this.amountQuestions) {
      window.location = './dashboard_trainee.html';
    }
  }

  render() {
    return html`
      <div style="width: 600px; margin: 0 auto;">
        <form>
          <h2 style="margin-top:50px">Vraag</h2>
          <h3>
            ${this.questionList
              ? this.questionList[this.questionIterator].text
              : 'Loading...'}
          </h3>
          <!--  <button type="button" onclick="loadDoc()">Laat de vraag zien en <br>typ je antwoord hieronder.</button>  -->
          <p>Typ je antwoord in het antwoordveld.</p>

          ${this.questionList[this.questionIterator].questionType === 'OPEN'
            ? html`
                <input
                  type="text"
                  name="newAnswer"
                  id="newAnswer"
                  style="font-size:12px; height:200px; width:50%;"
                />
              `
            : [
                ...Array(
                  this.questionList[this.questionIterator].rangeMax + 1
                ).keys()
              ].map(
                /* Create array with amount of items equalling the amount of options of the question */
                i => html`
                  <!-- Template for closed questions with radios -->
                  <label for="closed-question-${i}">${i}</label>
                  <input
                    type="radio"
                    name="closed-question"
                    value=${i}
                    id="closed-question-${i}"
                  />
                `
              )}
          <button
            type="button"
            id="submit-button"
            class=""
            style="margin-top:30px"
            @click=${e => this.sendAnswer(e)}
          >
            Submit
          </button>
        </form>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

let questionList;
function showQuestion(question) {}

// Wat gebeurt hier?
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var vraag = this.responseText;
      var string = JSON.parse(vraag);
      // welke variable meot hij hieraanroepeN?
      document.getElementById('myData').innerHTML = string.text;
    }
  };

  // welke variabelen
  var identify = xhttp.open(
    //id ergens vandaag???
    'GET',
    'http://localhost:8082/openquestion/{' + identify + '}',
    true
  );
  xhttp.send();
}

customElements.define('answer-element', AnswerElement);
