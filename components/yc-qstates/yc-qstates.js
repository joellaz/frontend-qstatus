import { LitElement, html, css } from 'lit-element';
import 'yc-battery/yc-battery.js';

class YCQstates extends LitElement {
  static get properties() {
    return {
      qData: {
        type: Object,
        hasChanged(newVal, oldVal) {
          if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
            return true;
          }
          return false;
        }
      }
    };
  }

  static get styles() {
    return css``;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchQStates();
  }

  async fetchQStates() {
    const response = await fetch('../../assets/mock-data/qstates.json');
    this.qData = await response.json();
    console.log('just fetched new qData');

    // Necessary to manually start a re-render, because now we have the fillAmounts from the API.
    // this.requestUpdate();
  }

  render() {
    return html`
      <yc-battery
        .fillAmount=${this.qData ? this.qData.iq_state * 100 : 0}
      ></yc-battery>
      <yc-battery
        .fillAmount=${this.qData ? this.qData.eq_state * 100 : 0}
      ></yc-battery>
      <yc-battery
        .fillAmount=${this.qData ? this.qData.fq_state * 100 : 0}
      ></yc-battery>
      <yc-battery
        .fillAmount=${this.qData ? this.qData.sq_state * 100 : 0}
      ></yc-battery>
    `;
  }
}

customElements.define('yc-qstates', YCQstates);
