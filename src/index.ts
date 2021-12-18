//  =============
//  DOM COMMANDER
//  =============

class _$ {

    private selection: HTMLElement[] = []

    constructor(element: HTMLElement | string) {
        this.selection = typeof element === 'string'
            ? Array.from(document.querySelectorAll(element))    //  Convert NodeList --> Array
            : [element]

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

    /**
     * Returns the HTML DOM Element at the given index position
     * @param idx Index position
     * @returns HTMLElement at index position
     */
    get = (idx: number) => {
        return this.selection[idx]
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
     * Siblings
     */
    sibling = {

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
        }
    }

}

//  ----------------------------------------------------------------
function $(element: HTMLElement | string) { return new _$(element) }
//  ----------------------------------------------------------------

$('main')
    .set.text('Hello World!')
    .classList.add('bg-red')
    .on('click', (e) => console.log(e))
    .set.css({
        'font-size': '3rem'
    })
