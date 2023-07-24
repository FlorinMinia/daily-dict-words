const axios = require('axios')
const cheerio = require('cheerio');
const fs = require('fs');

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

const readableDate = date.toDateString();

axios.get(`https://dexonline.ro/cuvantul-zilei/${year}/${month}/${day}`)
    .then(page => {
        const $ = cheerio.load(page.data);
        const definition = $('.defWrapper').find('span.def').html();
        const completeDefinitionMarkup = `\r\n\t\t\t<div class="word mt-5"><h4>${readableDate}</h4>${definition}</div>`;
        return Promise.resolve(completeDefinitionMarkup);
    })
    .then(newWord => {
        fs.readFile('/site/index.html', 'utf8', (err, page) => {
            if (err) {
              console.error(err);
              return;
            }
            const $ = cheerio.load(page);
            $('body').find('#word-list').prepend(newWord);
            const updatedPage = $.html();    

            fs.writeFile('/site/index.html', updatedPage, err => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('SUCCESS');
                return;
              });
        });
    });