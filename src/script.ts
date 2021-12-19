
$('main')
    .set.text('Hello World!')
    .classList.add('bg-red')
    .on('click', (e) => console.log(e))
    .set.css({
        'font-size': '3rem',
        color: 'whitesmoke'
    })
