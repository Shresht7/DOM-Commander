
$('main')
    .setText('Hello World!')
    .addClass('bg-red')
    .setCSS({
        'font-size': '3rem',
        color: 'whitesmoke'
    })
    .on('click', (e) => console.log(e))
