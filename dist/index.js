// src/index.ts
var _$ = class {
  constructor(element) {
    this.selection = [];
    //  ==========
    //  CLASS-LIST
    //  ==========
    /**
     * Adds the classNames to the classLists array
     * @param tokens CSS classNames
     */
    this.addClass = (...tokens) => {
      this.forEach((element) => element.classList.add(...tokens));
      return this;
    };
    /**
     * Removes the classNames from the classLists array
     * @param tokens CSS classNames
     */
    this.removeClass = (...tokens) => {
      this.forEach((element) => element.classList.remove(...tokens));
      return this;
    };
    /**
     * Toggles a CSS class in the classList array
     * @param token CSS className
     * @param force force set boolean to value
     */
    this.toggleClass = (token, force) => {
      this.forEach((element) => element.classList.toggle(token, force));
      return this;
    };
    /**
     * Checks if all selected elements have the given classes
     * @param tokens CSS classNames
     */
    this.hasClass = (...tokens) => {
      return this.selection.every((element) => {
        let allHaveToken = true;
        for (const token of tokens) {
          if (!element.classList.contains(token)) {
            allHaveToken = false;
            break;
          }
        }
        return allHaveToken;
      });
    };
    //  ===
    //  SET
    //  ===
    /**
     * Sets the innerText to given string
     * @param text Text
     */
    this.setText = (text) => {
      this.forEach((element) => element.innerText = text);
      return this;
    };
    /**
     * Sets the innerHTML to given string
     * @param html HTML markup
     */
    this.setHTML = (html) => {
      this.forEach((element) => element.innerHTML = html);
      return this;
    };
    /**
     * Sets attributes to all HTML elements
     * @param attributes Key-Value pairs of attributes
     */
    this.setAttributes = (attributes) => {
      this.forEach((element) => {
        for (const name of Object.keys(attributes)) {
          element.setAttribute(name, attributes[name]);
        }
      });
      return this;
    };
    /**
     * Apply CSS to selected elements
     * @param styles CSS styles object
     */
    this.setCSS = (styles) => {
      this.forEach((element) => {
        for (const property of Object.keys(styles)) {
          element.style.setProperty(property, styles[property]);
        }
      });
      return this;
    };
    //  ===
    //  GET
    //  ===
    /**
     * Returns the HTML DOM Element at the given index position
     * @param idx Index position
     * @returns HTMLElement at index position
     */
    this.getElement = (idx) => {
      return this.selection[idx];
    };
    //  ======
    //  REMOVE
    //  ======
    /**
     * Removes DOM elements that satisfy the condition (condition default to always return true)
     * @param condition Callback function to determine whether to remove an element
     */
    this.removeElement = (condition = () => true) => {
      this.forEach((element) => condition(element) && element.remove());
      this.filter((element) => element != null);
      return this;
    };
    /**
     * Removes the given attributes from all selected HTML elements
     * @param attributes List of attributes to remove
     */
    this.removeAttribute = (name) => {
      this.forEach((element) => element.removeAttribute(name));
      return this;
    };
    //  =====
    //  NODES
    //  =====
    /**
     * Selects the enxt element siblings
     */
    this.next = () => {
      this.selection = this.selection.map((element) => element.nextElementSibling).filter((element) => element != null);
      return this;
    };
    /**
     * Selects the previous element siblings
     */
    this.prev = () => {
      this.selection = this.selection.map((element) => element.previousElementSibling).filter((element) => element != null);
      return this;
    };
    /**
     * Appends the given HTML nodes to the selected DOM elements
     * @param nodes HTML Nodes
     */
    this.append = (...nodes) => {
      this.forEach((element) => element.append(...nodes));
      return this;
    };
    //  ======
    //  EVENTS
    //  ======
    /**
     * Registers a onEvent handler callback
     * @param event HTML Element Event
     * @param listener Callback listener to fire on event
     * @param options Event listener options
     */
    this.on = (event, listener, options) => {
      this.selection.forEach((element) => element.addEventListener(event, listener, options));
      return this;
    };
    //  =======
    //  UTILITY
    //  =======
    /**
     * Filters elements based on provided criteria
     * @param cb Callback function to determine filter criteria
     */
    this.filter = (cb) => {
      this.selection = this.selection.filter(cb);
      return this;
    };
    /**
     * Executes a callback for each HTML element
     * @param cb Callback function
     * @returns 
     */
    this.forEach = (cb) => {
      this.selection.forEach(cb);
      return this;
    };
    if (typeof element === "string") {
      this.selection = Array.from(document.querySelectorAll(element));
    } else if (Array.isArray(element)) {
      this.selection = [...element];
    } else {
      this.selection = [element];
    }
    return this;
  }
};
var $ = (element) => new _$(element);
$.create = (...tagNames) => {
  const elements = [];
  tagNames.forEach((tagName) => {
    const element = document.createElement(tagName);
    elements.push(element);
  });
  return new _$(elements);
};
export {
  $
};
//# sourceMappingURL=index.js.map
