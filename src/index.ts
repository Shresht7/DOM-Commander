// ----------------
// TYPE DEFINITIONS
// ----------------

type HTMLElementOrSelector = HTMLElement | string

// ---------
// SELECTION
// ---------

class Selection {

    /** The selection of elements to manipulate */
    private selection: HTMLElement[] = []

    // ARRAY-LIKE METHODS
    // ------------------

    /** Returns the element at the given index position */
    at(index: number): HTMLElement | undefined {
        return this.selection.at(index)
    }

    /** Returns the length of the selection array */
    get length() {
        return this.selection.length
    }

    /** Execute a callback function for each selected element */
    forEach(cb: (element: HTMLElement, idx: number, arr: HTMLElement[]) => void) {
        this.selection.forEach(cb)
    }

    /** Filter the selection based on a callback function */
    filter(cb: (element: HTMLElement, idx: number, arr: HTMLElement[]) => boolean) {
        this.selection = this.selection.filter(cb)
        return this
    }

    // CONSTRUCTOR
    // -----------

    /**
     * Instantiates a new Selection object
     * @param elements List of HTML elements or DOM selectors to select
     */
    constructor(...elements: HTMLElementOrSelector[]) {
        if (elements) {
            this.select(...elements)
        }
    }

    // SELECT
    // ------

    /**
     * Selects HTML elements and appends them to the selection
     * @param elements List of HTML elements or DOM selectors to select
     */
    public select(...elements: HTMLElementOrSelector[]) {
        for (const element of elements) {
            if (typeof element === 'string') {
                const s = document.querySelectorAll(element) as NodeListOf<HTMLElement>
                this.selection.push(...Array.from(s)) //  Convert NodeList --> Array
            } else {
                this.selection.push(element)
            }
        }
        return this
    }

    // CONTENTS
    // --------

    set textContent(text: string) {
        this.selection.forEach(element => element.textContent = text)
    }

    set innerHTML(text: string) {
        this.selection.forEach(element => element.innerHTML = text)
    }

    // CLASS-LIST
    // ----------

    /** Allows for manipulation of selection's class tokens */
    public readonly classList = {

        /**
         * Adds the classNames to the classLists array
         * @param tokens CSS classNames
         * @see {@link DOMTokenList.add}
         */
        add: (...tokens: string[]) => {
            this.selection.forEach(element => element.classList.add(...tokens))
            return this
        },

        /**
         * Removes the classNames from the classLists array
         * @param tokens CSS classNames
         * @see {@link DOMTokenList.remove}
         */
        remove: (...tokens: string[]) => {
            this.selection.forEach(element => element.classList.remove(...tokens))
            return this
        },

        /**
         * Toggles a CSS class in the classList array
         * @param token CSS className
         * @param force force set boolean to value
         * @see {@link DOMTokenList.toggle}
         */
        toggle: (token: string, force?: boolean) => {
            this.selection.forEach(element => element.classList.toggle(token, force))
            return this
        },

        /**
         * Checks if all selected elements have the given class
         * @param tokens CSS className
         */
        every: (token: string) => {
            return this.selection.every(element => element.classList.contains(token))
        },

        /**
         * Checks if any selected elements have the given class
         * @param tokens CSS className
         */
        some: (token: string) => {
            return this.selection.some(element => element.classList.contains(token))
        }

    }

    // ATTRIBUTES
    // ----------

    /**
     * Returns the value of the given attribute for all selected elements
     * @param name Attribute name
     */
    public getAttribute(name: string) {
        return this.selection.map(element => element.getAttribute(name))
    }

    /**
     * Sets the value of the given attribute for all selected elements
     * @param name The name of the attribute whose value is to be set
     * @param value The value to set the attribute to
     */
    public setAttribute(name: string, value: string) {
        this.selection.forEach(element => element.setAttribute(name, value))
        return this
    }

    /**
     * Removes the given attribute from all selected elements
     * @param name The name of the attribute to remove
     */
    public removeAttribute(name: string) {
        this.selection.forEach(element => element.removeAttribute(name))
        return this
    }

    // STYLE
    // -----

    public style = {

        /**
         * Sets the CSS property to the given value for all selected elements
         * @param property CSS property
         * @param value CSS property value
         */
        setProperty: (property: string, value: string) => {
            this.selection.forEach(element => element.style.setProperty(property, value))
            return this
        },

        /**
         * Removes the CSS property from all selected elements
         * @param property CSS property
         */
        removeProperty: (property: string) => {
            this.selection.forEach(element => element.style.removeProperty(property))
            return this
        },

    }

}

    //  ===
    //  GET
    //  ===

    /**
     * Returns the HTML DOM Element at the given index position
     * @param idx Index position
     * @returns HTMLElement at index position
     */
    getElement = (idx: number) => {
        return this.selection[idx]
    }

    //  ======
    //  REMOVE
    //  ======

    /**
     * Removes DOM elements that satisfy the condition (condition default to always return true)
     * @param condition Callback function to determine whether to remove an element
     */
    removeElement = (condition: (element: HTMLElement) => boolean = () => true) => {
        this.forEach(element => condition(element) && element.remove())
        this.filter((element) => element != null)
        return this
    }


    /**
     * Removes the given attributes from all selected HTML elements
     * @param attributes List of attributes to remove
     */
    removeAttribute = (name: string) => {
        this.forEach(element => element.removeAttribute(name))
        return this
    }

    //  =====
    //  NODES
    //  =====

    /**
     * Selects the enxt element siblings
     */
    next = () => {
        this.selection = this.selection.map(element => element.nextElementSibling as HTMLElement).filter(element => element != null)
        return this
    }


    /**
     * Selects the previous element siblings
     */
    prev = () => {
        this.selection = this.selection.map(element => element.previousElementSibling as HTMLElement).filter(element => element != null)
        return this
    }


    /**
     * Appends the given HTML nodes to the selected DOM elements
     * @param nodes HTML Nodes
     */
    append = (...nodes: (string | Node)[]) => {
        this.forEach(element => element.append(...nodes))
        return this
    }

    //  ======
    //  EVENTS
    //  ======

    /**
     * Registers a onEvent handler callback
     * @param event HTML Element Event
     * @param listener Callback listener to fire on event
     * @param options Event listener options
     */
    on = (event: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
        this.selection.forEach(element => element.addEventListener(event, listener, options))
        return this
    }

    //  =======
    //  UTILITY
    //  =======

    /**
     * Filters elements based on provided criteria
     * @param cb Callback function to determine filter criteria
     */
    filter = (cb: (element: HTMLElement, idx: number, arr: HTMLElement[]) => boolean) => {
        this.selection = this.selection.filter(cb)
        return this
    }

    /**
     * Executes a callback for each HTML element
     * @param cb Callback function
     * @returns 
     */
    forEach = (cb: (element: HTMLElement, idx: number, arr: HTMLElement[]) => void) => {
        this.selection.forEach(cb)
        return this
    }

}

//  =============
//  MAIN FUNCTION
//  =============

/**
 * DOM Commander
 * @param element HTML Element or DOM selector
 */
export const $ = (element: HTMLElement | string) => new _$(element)

//  ==============
//  CREATE ELEMENT
//  ==============

/**
 * Creates one or more HTML elements
 * @param tagNames List of HTML tagNames to create
 */
$.create = (...tagNames: (keyof HTMLElementTagNameMap)[]) => {
    const elements: HTMLElement[] = []
    tagNames.forEach(tagName => {
        const element = document.createElement(tagName)
        elements.push(element)
    })
    return new _$(elements)
}
