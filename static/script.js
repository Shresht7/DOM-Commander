// @ts-check

import { $ } from '../dist/index.js'

$('main').textContent = 'Hello World!'

$('main')
    .classList.add('bg-red')
    .style.setProperty('font-size', '3rem')
    .style.setProperty('color', 'whitesmoke')
    .addEventListener('click', (e) => console.log(e))
