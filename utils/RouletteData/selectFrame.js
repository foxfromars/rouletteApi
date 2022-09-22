const puppeteer = require('puppeteer');

async function selectFrame(browser , page){
    await page.waitForSelector("iframe");
    const iframeHandle = await page.$("iframe");
    const contentFrame = await iframeHandle.contentFrame();
    await contentFrame.waitForSelector("li.sidebar-buttons__item:nth-of-type(5)")
    await contentFrame.click("li.sidebar-buttons__item:nth-of-type(5)");
    // await contentFrame.waitForSelector(
    //   ".roulette-history-extended__contentxfUxn2lfztU7EVIL05oM > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
    // );
    return contentFrame
  }

module.exports = selectFrame;
