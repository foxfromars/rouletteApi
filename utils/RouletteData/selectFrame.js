const puppeteer = require('puppeteer');
const delay = require('./delay');

async function selectFrame(browser , page){
    await delay(20000);
    await page.waitForSelector("iframe");
    const iframeHandle = await page.$("iframe");
    const contentFrame = await iframeHandle.contentFrame();
    await page.screenshot({path : 'screenshot.png'})
    // await contentFrame.waitForSelector("li.sidebar-buttons__item:nth-of-type(5)")
    await contentFrame.click("li.sidebar-buttons__item:nth-of-type(5)");
    // await contentFrame.waitForSelector(
    //   ".roulette-history-extended__contentxfUxn2lfztU7EVIL05oM > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
    // );"li.sidebar-buttons__item"
    return contentFrame
  }

module.exports = selectFrame;
