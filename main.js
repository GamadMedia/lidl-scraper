import { CheerioCrawler, Dataset } from 'crawlee';

const startUrls = ['https://www.lidl.si/h/sadje-in-zelenjava/h10071012'];

const crawler = new CheerioCrawler({
    async requestHandler({ $, request }) {
        const items = [];

        $('.m-offer-tile').each((index, el) => {
            const title = $(el).find('.m-offer-tile__title').text().trim();
            const price = $(el).find('.m-price__price').text().trim();

            if (title && price) {
                items.push({
                    title,
                    price,
                    sourceUrl: request.url,
                });
            }
        });

        if (items.length > 0) {
            await Dataset.pushData(items);
            console.log(`✅ Pushed ${items.length} items to dataset`);
        } else {
            console.log('⚠️ No items found on this page.');
        }
    },
});

await crawler.run(startUrls);

