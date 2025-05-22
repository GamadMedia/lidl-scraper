import { CheerioCrawler, Dataset } from 'crawlee';

export const run = async () => {
    const crawler = new CheerioCrawler({
        async requestHandler({ request, $, log }) {
            log.info(`Processing: ${request.url}`);

            const products = [];

            $('.product-box-container').each((_, el) => {
                const name = $(el).find('.product-box-headline').text().trim();
                const price = $(el).find('.product-price').text().trim();
                products.push({ name, price });
            });

            await Dataset.pushData(products);
        },
    });

    await crawler.run([
        'https://www.lidl.si/h/sadje-in-zelenjava/h10071012',
    ]);
};

run();
