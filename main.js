import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    headless: true,
    maxRequestsPerCrawl: 1,
    requestHandler: async ({ page, request, enqueueLinks, log, pushData }) => {
        log.info(`Visiting ${request.url}`);

        // Wait for products to load — adjust if needed
        await page.waitForSelector('.product-grid-box', { timeout: 10000 });

        // Extract product data
        const products = await page.$$eval('.product-grid-box', (elements) =>
            elements.map(el => {
                const name = el.querySelector('.product-title')?.innerText.trim() || '';
                const price = el.querySelector('.price')?.innerText.trim() || '';
                return { name, price };
            })
        );

        // Push to dataset
        for (const product of products) {
            await pushData(product);
        }
    },
});

await crawler.run(['https://www.lidl.si/h/sadje-in-zelenjava/h10071012']);


