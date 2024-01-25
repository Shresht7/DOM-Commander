// src/index.ts
var _$ = class {
  // CONSTRUCTOR
  // -----------
  /**
   * Instantiates a new Selection object
   * @param elements List of HTML elements or DOM selectors to select
   */
  constructor(...elements) {
    /** The selection of elements to manipulate */
    this.selection = [];
    // CLASS-LIST
    // ----------
    /** Allows for manipulation of selection's class tokens */
    this.classList = {
      /**
       * Adds the classNames to the classLists array
       * @param tokens CSS classNames
       * @see {@link DOMTokenList.add}
       */
      add: (...tokens) => {
        this.selection.forEach((element) => element.classList.add(...tokens));
        return this;
      },
      /**
       * Removes the classNames from the classLists array
       * @param tokens CSS classNames
       * @see {@link DOMTokenList.remove}
       */
      remove: (...tokens) => {
        this.selection.forEach((element) => element.classList.remove(...tokens));
        return this;
      },
      /**
       * Toggles a CSS class in the classList array
       * @param token CSS className
       * @param force force set boolean to value
       * @see {@link DOMTokenList.toggle}
       */
      toggle: (token, force) => {
        this.selection.forEach((element) => element.classList.toggle(token, force));
        return this;
      },
      /**
       * Checks if all selected elements have the given class
       * @param tokens CSS className
       */
      every: (token) => {
        return this.selection.every((element) => element.classList.contains(token));
      },
      /**
       * Checks if any selected elements have the given class
       * @param tokens CSS className
       */
      some: (token) => {
        return this.selection.some((element) => element.classList.contains(token));
      }
    };
    // STYLE
    // -----
    this.style = {
      /**
       * Sets the CSS property to the given value for all selected elements
       * @param property CSS property
       * @param value CSS property value
       */
      setProperty: (property, value) => {
        this.selection.forEach((element) => element.style.setProperty(property, value));
        return this;
      },
      /**
       * Removes the CSS property from all selected elements
       * @param property CSS property
       */
      removeProperty: (property) => {
        this.selection.forEach((element) => element.style.removeProperty(property));
        return this;
      }
    };
    if (elements) {
      this.select(...elements);
    }
  }
  // ARRAY-LIKE METHODS
  // ------------------
  /** Returns the element at the given index position */
  at(index) {
    return this.selection.at(index);
  }
  /** Returns the length of the selection array */
  get length() {
    return this.selection.length;
  }
  /** Execute a callback function for each selected element */
  forEach(cb) {
    this.selection.forEach(cb);
  }
  /** Filter the selection based on a callback function */
  filter(cb) {
    this.selection = this.selection.filter(cb);
    return this;
  }
  // SELECT
  // ------
  /**
   * Selects HTML elements and appends them to the selection
   * @param elements List of HTML elements or DOM selectors to select
   */
  select(...elements) {
    for (const element of elements) {
      if (typeof element === "string") {
        const s = document.querySelectorAll(element);
        this.selection.push(...Array.from(s));
      } else {
        this.selection.push(element);
      }
    }
    return this;
  }
  // CONTENTS
  // --------
  set textContent(text) {
    this.selection.forEach((element) => element.textContent = text);
  }
  set innerHTML(text) {
    this.selection.forEach((element) => element.innerHTML = text);
  }
  // ATTRIBUTES
  // ----------
  /**
   * Returns the value of the given attribute for all selected elements
   * @param name Attribute name
   */
  getAttribute(name) {
    return this.selection.map((element) => element.getAttribute(name));
  }
  /**
   * Sets the value of the given attribute for all selected elements
   * @param name The name of the attribute whose value is to be set
   * @param value The value to set the attribute to
   */
  setAttribute(name, value) {
    this.selection.forEach((element) => element.setAttribute(name, value));
    return this;
  }
  /**
   * Removes the given attribute from all selected elements
   * @param name The name of the attribute to remove
   */
  removeAttribute(name) {
    this.selection.forEach((element) => element.removeAttribute(name));
    return this;
  }
  // EVENT LISTENER
  // --------------
  /** Add an event listener to all selected elements */
  addEventListener(event, listener, options) {
    this.selection.forEach((element) => element.addEventListener(event, listener, options));
    return this;
  }
  /** Remove an event listener from all selected elements */
  removeEventListener(event, listener, options) {
    this.selection.forEach((element) => element.removeEventListener(event, listener, options));
    return this;
  }
};
var $ = (...elements) => new _$(...elements);
export {
  $
};
//# sourceMappingURL=index.js.map
