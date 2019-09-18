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
    answer.addEventListener('keypress', function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById('submit-button').click();
        document.getElementById('newAnswer').value = '';
      }
    });
  }

  async getQuestionList() {
    const response = await fetch('http://localhost:8082/questionlist/9');
    if (response.status === 200) {
      const dataJson = await response.json();
      this.questionList = dataJson.questionList;
      this.questionIterator = 0;
      this.amountQuestions = this.questionList.length;
      this.creatAnswerList();
    }
  }

  creatAnswerList() {
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
    this.questionIterator++;
    if (this.questionIterator == this.amountQuestions) {
      window.location = './dashboard_trainee.html';
    }
  }

  sendClosedAnswer(sendableAnswer, e) {
    let options = document.getElementsByName('closed-question');
    let radio;
    let value;
    for (radio of options) {
      if (radio.checked) {
        value = radio.value;
        radio.checked = false;
        break;
      }
    }
    if (value) {
      sendableAnswer.response = value;
      const request = fetch('http://localhost:8082/closedanswer', {
        method: 'POST',
        body: JSON.stringify(sendableAnswer),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

  sendOpenAnswer(sendableAnswer, e) {
    sendableAnswer.text = e.target.parentNode.parentNode.parentNode.querySelector(
      'input'
    ).value;
    sendableAnswer.title = 'openquestion';
    const request = fetch('http://localhost:8082/openanswer', {
      method: 'POST',
      body: JSON.stringify(sendableAnswer),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    const niveaus = [
      'Helemaal mee oneens\t',
      'Enigszins mee oneens\t',
      'Neutraal\t',
      'Enigszins mee eens\t',
      'Helemaal mee eens\t'
    ];
    return html`
      <div style="width: 600px; margin: 0 auto;" align="center">
        <form>
          <div>
            ${this.questionList[this.questionIterator].questionType === 'OPEN'
        ? html`
                  <h2 style="margin-top:50px">Vraag</h2>
                `
        : html`
                  <h2 style="margin-top:50px">Stelling</h2>
                `}
            <h1>
              ${this.questionList
        ? this.questionList[this.questionIterator].text
        : 'Loading...'}
            </h1>
            <!--  <button type="button" onclick="loadDoc()">Laat de vraag zien en <br>typ je antwoord hieronder.</button>  -->

            ${this.questionList[this.questionIterator].questionType === 'OPEN'
        ? html`
                  <p>Typ je antwoord in het antwoordveld.</p>
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
                    <div class="row">
                      <div class="col-lg-4">
                        <label for="closed-question-${i}">${niveaus[i]}</label>
                      </div>
                      <div div class="col-lg-6">
                        <input
                          type="radio"
                          name="closed-question"
                          value=${i}
                          id="closed-question-${i}"
                        />
                      </div>
                    </div>
                  `
        )}
            <div class="row">
              <div class="col-lg-4">
                <button
                  type="button"
                  id="submit-button"
                  class=""
                  style="margin-top:30px"
                  @click=${e => this.sendAnswer(e)}
                >
                  ${this.questionIterator + 1 == this.amountQuestions
        ? html`
                        Submit
                      `
        : html`
                        Next
                      `}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

let questionList;
function showQuestion(question) { }

// Wat gebeurt hier?
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
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
