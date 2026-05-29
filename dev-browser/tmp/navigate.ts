import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto("https://assetsflow-green-work.web.app");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "tmp/green-home.png" });
  console.log({ url: page.url(), title: await page.title() });

  await browser.close();
}

main().catch(console.error);
