const { chromium } = require('playwright');
const fs = require('fs');


async function takeScreenshot() {
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    const pageLive = await context.newPage();
    const pageStatic = await context.newPage();

    const htmlLive = fs.readFileSync('live.html', 'utf8');
    const htmlStatic = fs.readFileSync('static.html', 'utf8');

    await pageLive.setContent(htmlLive.toString());
    await pageLive.waitForLoadState('load');
    await pageStatic.setContent(htmlStatic.toString());
    await pageStatic.waitForLoadState('load');

    await pageLive.screenshot({path: `screenshots/live.png`});
    await pageStatic.screenshot({path: `screenshots/static.png`});
    await browser.close();
};

takeScreenshot();