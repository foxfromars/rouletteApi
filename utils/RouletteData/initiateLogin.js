const puppeteer = require("puppeteer");
const delay = require("./delay");

async function initiateLogin() {
  const browser = await puppeteer.launch({
  args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://www.leovegas.com/pt-br/jogo/roleta-brasileira-ao-vivo"
  );
  page.setDefaultNavigationTimeout(0);
  await delay(10000);
  await page.type(
    ".c4RS2 > fieldset:nth-child(1) > label:nth-child(1) > div:nth-child(1) > input:nth-child(1)",
    "raposo.work.luis@gmail.com"
  );
  await page.type(
    ".hXmnT > label:nth-child(1) > div:nth-child(1) > input:nth-child(1)",
    "quevoa05!"
  );
  await page.screenshot({ path: "loginProcesso.png" });
  await page.focus("button.-t8wB:nth-child(1) > canvas:nth-child(1)");
  await page.keyboard.press("Enter");
  await delay(9000);
  await page.click(".fFINL");
  await delay(50000);
  return { browser, page}
}

module.exports = initiateLogin;
