//  =============
//  DOM COMMANDER
//  =============

class _$ {

    private readonly selection: HTMLElement[] = []

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

}

//  ----------------------------------------------------------------
function $(element: HTMLElement | string) { return new _$(element) }
//  ----------------------------------------------------------------

$('main')
    .set.text('Hello World!')
    .classList.add('bg-red')
    .on('click', (e) => console.log(e))
