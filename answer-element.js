import { LitElement, html, css } from 'lit-element';

class AnswerElement extends LitElement {
  static get properties() {
    return {
      questionId: {
        type: Number
      }
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.getQuestionList();
  }

  async getQuestionList() {
    const response = await fetch('http://localhost:8082/questionlist/1');
    if (response.status === 200) {
      const dataJson = await response.json();
      this.questionList = dataJson.questionList;
      this.questionId = 0;
    }
  }

  sendOpenAnswer(e) {
    const inputValue = e.target.parentNode.querySelector('input').value;

    let sendableAnswer = {};
    sendableAnswer.title = 'openquestion';
    sendableAnswer.text = inputValue;

    const request = fetch('http://localhost:8082/openanswer', {
      method: 'POST',
      body: JSON.stringify(sendableAnswer),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.questionId++;
  }

  render() {
    return html`
      <div style="width: 600px; margin: 0 auto;">
        <form>
          <h2 style="margin-top:50px">Vraag</h2>
          <h3>
            ${this.questionList
              ? this.questionList[this.questionId].text
              : 'Loading...'}
          </h3>
          <!--  <button type="button" onclick="loadDoc()">Laat de vraag zien en <br>typ je antwoord hieronder.</button>  -->
          <p>Typ je antwoord in het antwoordveld.</p>

          ${this.questionList[this.questionId].questionType === 'OPEN'
            ? html`
                <input
                  type="text"
                  name="newAnswer"
                  style="font-size:12px; height:200px; width:50%;"
                />
              `
            : [, ,].map(
                /* Create array with amount of items equalling the amount of options of the question */
                i => html`
                  <!-- Template for closed questions with radios -->
                  <label for="closed-question-${i}">${i}</label>
                  <input
                    type="radio"
                    name="closed-question"
                    id="closed-question-${i}"
                  />
                `
              )}
          <button
            type="button"
            class=""
            style="margin-top:30px"
            @click=${e => this.sendOpenAnswer(e)}
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
