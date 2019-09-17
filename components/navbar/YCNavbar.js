import { LitElement, html } from "lit-element";

class YCNavbar extends LitElement {
  render() {
    return html`
      <nav
        class="navbar navbar-expand-lg navbar-light bg-white border-bottom border-secondary"
      >
        <a class="navbar-brand" href="#">
          <img
            src="./assets/images/logoyc.svg"
            width="90"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="javascript:choosePage()"
                >Home <span class="sr-only">(current)</span></a
              >
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li>
              <a class="nav-link" href="./index.html"
                >Login<span class="sr-only">(current)</span></a
              >
            </li>
          </ul>
        </div>
      </nav>
    `;
  }

  createRenderRoot() {
    return this;
  }

  choosePage() {
    user = JSON.parse(localStorage.getItem("choosenUser"));
    if (user.hasOwnProperty("team_id")) {
      return "./dashboard_trainee.html";
    }
    return "./dashboard_manager.html";
  }
}

customElements.define("yc-navbar", YCNavbar);
