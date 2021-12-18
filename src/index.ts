//  =============
//  DOM COMMANDER
//  =============

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

    /**
     *  Manipulate classLists 
     */
    classList = {

        /**
         * Adds the classNames to the classLists array
         * @param tokens CSS classNames
         */
        add: (...tokens: string[]) => {
            this.selection.forEach(element => element.classList.add(...tokens))
            return this
        },

        /**
         * Removes the classNames from the classLists array
         * @param tokens CSS classNames
         */
        remove: (...tokens: string[]) => {
            this.selection.forEach(element => element.classList.remove(...tokens))
        },

        /**
         * Toggles a CSS class in the classList array
         * @param token CSS className
         * @param force force set boolean to value
         */
        toggle: (token: string, force?: boolean) => {
            this.selection.forEach(element => element.classList.toggle(token, force))
            return this
        }
    }

    /**
     * Set properties
     */
    set = {

        /**
         * Sets the innerText to given string
         * @param text Text
         */
        text: (text: string) => {
            this.selection.forEach(element => element.innerText = text)
            return this
        },

        /**
         * Sets the innerHTML to given string
         * @param html HTML markup
         */
        html: (html: string) => {
            this.selection.forEach(element => element.innerHTML = html)
            return this
        },

        /**
         * Sets attributes to all HTML elements
         * @param attributes Key-Value pairs of attributes
         */
        attributes: (attributes: { [k: string]: string }) => {
            this.selection.forEach(element => {
                for (const attr of Object.keys(attributes)) {
                    element.setAttribute(attr, attributes[attr])
                }
            })
        },

        /**
         * Apply CSS to selected elements
         * @param styles CSS styles object
         */
        css: (styles: { [k: string]: string }) => {
            this.selection.forEach(element => {
                for (const property of Object.keys(styles)) {
                    element.style.setProperty(property, styles[property])
                }
            })
            return this
        }
    }

    /** Get properties */
    get = {
        /**
         * Returns the HTML DOM Element at the given index position
         * @param idx Index position
         * @returns HTMLElement at index position
         */
        element: (idx: number) => {
            return this.selection[idx]
        }

    }

    /** Remove properties */
    remove = {

        /**
         * Removes DOM elements that satisfy the condition (condition default to always return true)
         * @param condition Callback function to determine whether to remove an element
         */
        element: (condition: (element: HTMLElement) => boolean = () => true) => {
            this.selection.forEach(element => condition(element) && element.remove())
            this.selection = this.selection.filter(element => element != null)
            return this
        },

    }

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

    /**
     * Filters elements based on provided criteria
     * @param cb Callback function to determine filter criteria
     */
    filter = (cb: (element: HTMLElement, idx: number, arr: HTMLElement[]) => boolean) => {
        this.selection = this.selection.filter(cb)
        return this
    }

    /**
     * nodes
     */
    node = {

        /**
         * Selects the next element siblings
         */
        next: () => {
            this.selection = this.selection.map(element => element.nextElementSibling as HTMLElement).filter(element => element != null)
            return this
        },

        /**
         * Selects the previous element siblings
         */
        prev: () => {
            this.selection = this.selection.map(element => element.previousElementSibling as HTMLElement).filter(element => element != null)
            return this
        },

        /**
         * Appends the given HTML nodes to the selected DOM elements
         * @param nodes HTML Nodes
         */
        append: (...nodes: (string | Node)[]) => {
            this.selection.forEach(element => element.append(...nodes))
            return this
        }
    }

}

/**
 * DOM Commander
 * @param element HTML Element or DOM selector
 */
function $(element: HTMLElement | string) { return new _$(element) }

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

//  =============================================================================================================================================

$('main')
    .set.text('Hello World!')
    .classList.add('bg-red')
    .on('click', (e) => console.log(e))
    .set.css({
        'font-size': '3rem'
    })
