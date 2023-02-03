const fs = require('fs');

async function getDOM() {
    const createBrowser = require('browserless')
    const browser = createBrowser()
    const browserless = await browser.createContext();
    
    urlStatic = 'http://localhost:8080/iframe.html?args=&id=example-page--logged-out&viewMode=story'
    urlLive = 'http://localhost:6006/iframe.html?args=&id=example-page--logged-out&viewMode=story'

    const htmlStatic = await browserless.html(urlStatic, { waitUntil: 'load' });
    const htmlLive = await browserless.html(urlLive, { waitUntil: 'load' });

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

    await browserless.destroyContext();
    await browser.close();
    return;
}

getDOM();