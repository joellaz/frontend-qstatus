import { LitElement, html, css } from 'lit-element';
import 'yc-battery/yc-battery.js';

class YCQstates extends LitElement {
  static get properties() {
    return {
      dataObj: {
        type: Array,
        hasChanged(newVal, oldVal) {
          if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
            return true;
          }
          return false;
        }
      },
      userId: {
        type: Number,
        reflect: true,
        attribute: 'userid'
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .row {
        display: flex;
      }

      .col {
        padding: 0 20px;
      }

      .q-title {
        text-align: center;
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchQStates();

    console.log(this.userId);

    // Create an obj from database result that is easier to work with in template :)
    this.dataObj = [
      [
        {
          name: 'IQ',
          balance: this.qData.iq_state
        },
        {
          name: 'EQ',
          balance: this.qData.eq_state
        }
      ],
      [
        {
          name: 'FQ',
          balance: this.qData.fq_state
        },
        {
          name: 'SQ',
          balance: this.qData.sq_state
        }
      ]
    ];
  }

  async fetchQStates() {
    const response = await fetch('../../assets/mock-data/qstates.json');
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    this.qData = await response.json();
  }

  render() {
    return html`
      <div class="row">
        ${this.dataObj
          ? this.dataObj[0].map(
              obj => html`
                <div class="col">
                  <p class="q-title">${obj.name}</p>
                  <yc-battery .fillAmount=${obj.balance * 100}></yc-battery>
                </div>
              `
            )
          : 'Loading...'}
      </div>
      <div class="row">
        ${this.dataObj
          ? this.dataObj[1].map(
              obj => html`
                <div class="col">
                  <p class="q-title">${obj.name}</p>
                  <yc-battery .fillAmount=${obj.balance * 100}></yc-battery>
                </div>
              `
            )
          : 'Loading...'}
      </div>
    `;
  }
}

customElements.define('yc-qstates', YCQstates);
