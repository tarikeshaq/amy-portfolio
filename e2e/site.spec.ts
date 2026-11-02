import { expect, test, type Page } from "@playwright/test";
import { routes } from "./routes";

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
}

for (const route of routes) {
  test.describe(`page ${route.path}`, () => {
    test("renders its heading with no console errors", async ({ page }) => {
      const errors = await collectErrors(page);
      const res = await page.goto(route.path);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.h1);
      expect(errors).toEqual([]);
    });

    test("marks the active nav item", async ({ page }) => {
      await page.goto(route.path);
      const current = page.getByRole("navigation", { name: "Main" }).locator('[aria-current="page"]');
      await expect(current).toHaveText(route.activeNav);
    });

    test("has no horizontal overflow", async ({ page }) => {
      await page.goto(route.path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("loads every image", async ({ page }) => {
      await page.goto(route.path);
      const imgs = page.locator("img");
      const n = await imgs.count();
      for (let i = 0; i < n; i++) {
        const img = imgs.nth(i);
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty("complete", true);
        expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
        expect(await img.getAttribute("alt")).not.toBeNull();
      }
    });
  });
}

test("footer exposes contact links", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: "Find me on Linkedin" })).toHaveAttribute("href", /linkedin\.com/);
  await expect(footer.getByRole("link", { name: "Email me" })).toHaveAttribute("href", /^mailto:/);
});
