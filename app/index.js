const axios = require('axios')
const cheerio = require('cheerio');

const date = new Date();

const year = date.toLocaleDateString('ro', {
    year: "numeric"
});

const month = date.toLocaleDateString('ro', {
    month: "2-digit"
})

const day = date.toLocaleDateString('ro', {
    day: "2-digit"
})


axios.get(`https://dexonline.ro/cuvantul-zilei/${year}/${month}/${day}`)
    .then(page => {
        const $ = cheerio.load(page.data);
        const wordWithDefinition = $('.defWrapper').find('span.def').html();
        console.log(wordWithDefinition)
    })