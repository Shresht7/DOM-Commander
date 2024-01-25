// ----------------
// TYPE DEFINITIONS
// ----------------

type HTMLElementOrSelector = HTMLElement | string

// ---------
// SELECTION
// ---------

class Selection extends Array<Element> {

    // CONSTRUCTOR
    // -----------

    /**
     * Instantiates a new Selection object
     * @param elements List of HTML elements or DOM selectors to select
     */
    constructor(...elements: HTMLElementOrSelector[]) {
        super()
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
                this.push(...Array.from(document.querySelectorAll(element))) //  Convert NodeList --> Array
            } else {
                this.push(element)
            }
        }
        return this
    }

}

class _$ {

    private selection: HTMLElement[] = []

    constructor(element: HTMLElement | HTMLElement[] | string) {

        if (typeof element === 'string') {
            this.selection = Array.from(document.querySelectorAll(element)) //  Convert NodeList --> Array
        } else if (Array.isArray(element)) {
            this.selection = [...element]
        } else {
            this.selection = [element]
        }

        return this
    }


    //  ==========
    //  CLASS-LIST
    //  ==========

    /**
     * Adds the classNames to the classLists array
     * @param tokens CSS classNames
     */
    addClass = (...tokens: string[]) => {
        this.forEach(element => element.classList.add(...tokens))
        return this
    }

    /**
     * Removes the classNames from the classLists array
     * @param tokens CSS classNames
     */
    removeClass = (...tokens: string[]) => {
        this.forEach(element => element.classList.remove(...tokens))
        return this
    }

    /**
     * Toggles a CSS class in the classList array
     * @param token CSS className
     * @param force force set boolean to value
     */
    toggleClass = (token: string, force?: boolean) => {
        this.forEach(element => element.classList.toggle(token, force))
        return this
    }

    /**
     * Checks if all selected elements have the given classes
     * @param tokens CSS classNames
     */
    hasClass = (...tokens: string[]) => {
        return this.selection.every(element => {
            let allHaveToken = true
            for (const token of tokens) {
                if (!element.classList.contains(token)) {
                    allHaveToken = false
                    break
                }
            }
            return allHaveToken
        })
    }


    //  ===
    //  SET
    //  ===

    /**
     * Sets the innerText to given string
     * @param text Text
     */
    setText = (text: string) => {
        this.forEach(element => element.innerText = text)
        return this
    }

    /**
     * Sets the innerHTML to given string
     * @param html HTML markup
     */
    setHTML = (html: string) => {
        this.forEach(element => element.innerHTML = html)
        return this
    }

    /**
     * Sets attributes to all HTML elements
     * @param attributes Key-Value pairs of attributes
     */
    setAttributes = (attributes: { [name: string]: string }) => {
        this.forEach(element => {
            for (const name of Object.keys(attributes)) {
                element.setAttribute(name, attributes[name])
            }
        })
        return this
    }


    /**
     * Apply CSS to selected elements
     * @param styles CSS styles object
     */
    setCSS = (styles: { [k: string]: string }) => {
        this.forEach(element => {
            for (const property of Object.keys(styles)) {
                element.style.setProperty(property, styles[property])
            }
        })
        return this
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
