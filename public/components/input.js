import { createComponent } from "../js/component.js";

createComponent(
  import.meta.url,
  (Component) =>
    class Input extends Component {
      #input;
      #placeholder;

      constructor(protectedProps) {
        super(protectedProps);
        const { shadowRoot } = protectedProps;

        this.#input = shadowRoot.getElementById("input");
        this.#placeholder = shadowRoot.getElementById("placeholder");

        this.#input.addEventListener("keypress", (event) => {
          if (event.key === "Enter") {
            this.dispatchEvent(new CustomEvent("enter", event));
          }
        });
      }

      static observedAttributes = ["password-mode", "placeholder", "error"];

      onAttributeUpdate(name, oldValue, newValue) {
        switch (name) {
          case "password-mode":
            this.#input.setAttribute(
              "type",
              this.hasAttribute("password-mode") ? "password" : "text"
            );
            break;
          case "placeholder":
            this.#placeholder.textContent = newValue;
            break;
          case "error":
            this.#input.toggleAttribute("error", this.hasAttribute("error"));
            break;
        }
      }

      get value() {
        return this.#input.value;
      }

      focus() {
        this.#input.focus();
      }
    }
);
