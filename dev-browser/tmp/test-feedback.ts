import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Step 1: Load site
  await page.goto("https://assetsflow-green-work.web.app");
  await page.waitForTimeout(4000);

  // Step 2: Login
  // Find email field and fill it
  const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
  await emailInput.fill("test@assetflow.dev");

  const passwordInput = page.locator('input[type="password"]');
  await passwordInput.fill("Test123!");

  // Click login button
  const loginBtn = page.locator('button:has-text("Login"), button:has-text("Sign"), button[type="submit"]');
  await loginBtn.first().click();

  await page.waitForTimeout(5000);
  await page.screenshot({ path: "tmp/after-login.png" });
  console.log("After login URL:", page.url());

  // Step 3: Find and click feedback button (green floating button)
  // Flutter renders to canvas, so we need to use accessibility tree or evaluate JS
  const snapshot = await page.accessibility.snapshot();
  console.log("Page accessibility children count:", snapshot?.children?.length || 0);

  // Log what's visible on the page
  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log("Page text:", bodyText?.substring(0, 300));

  await page.screenshot({ path: "tmp/dashboard.png" });

  await browser.close();
}

main().catch(console.error);
