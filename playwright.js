const playwright = require('playwright');
const fs = require('fs');

async function getDOM() {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();

    const pageStatic = await context.newPage();
    const pageLive = await context.newPage();

    urlStatic = 'http://localhost:8080/iframe.html?args=&id=example-page--logged-out&viewMode=story'
    urlLive = 'http://localhost:6006/iframe.html?args=&id=example-page--logged-out&viewMode=story'

    await pageStatic.goto(urlStatic);
    // await page.waitForLoadState('networkidle');
    await pageLive.goto(urlLive);
    // await page.waitForLoadStage('networkidle');

    const htmlStatic = await pageStatic.content();
    const htmlLive = await pageLive.content();

    try {
        fs.writeFileSync('static.html', htmlStatic);
    } catch (err) {
        console.error(err);
    }

    try {
        fs.writeFileSync('live.html', htmlLive);
    } catch (err) {
        console.error(err);
    }

    await browser.close();
}

getDOM();