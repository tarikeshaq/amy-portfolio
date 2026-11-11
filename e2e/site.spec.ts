import { expect, test, type Page } from "@playwright/test";
import { site } from "../lib/site";
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

    test("loads every visible image", async ({ page }) => {
      await page.goto(route.path);
      // Some images are viewport-specific alternates (display:none on the other viewport).
      const imgs = page.locator("img:visible");
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
  await expect(footer.getByRole("link", { name: "Email me" })).toHaveAttribute("href", `mailto:${site.email}`);
});

test("nav CONTACT link opens an email to Amy", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "CONTACT" })).toHaveAttribute("href", `mailto:${site.email}`);
});

test("home work cards and next-project cards link the case studies together", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Cutting compute costs by 30%/ }).click();
  await expect(page).toHaveURL(/\/work\/compute-costs\/$/);
  await page.getByRole("link", { name: /See next project/ }).click();
  await expect(page).toHaveURL(/\/work\/thought-partner\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/thought partner/);
  await page.getByRole("link", { name: /See next project/ }).click();
  await expect(page).toHaveURL(/\/work\/compute-costs\/$/);
});

test("nav WORK link returns to the selected-work section", async ({ page }) => {
  await page.goto("/work/thought-partner/");
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "WORK" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("heading", { name: "Selected work" })).toBeInViewport();
});

test("nav HOME link lands at the top of the home page", async ({ page }) => {
  const home = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "HOME" });
  const atTop = () => expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  // From another page (regression: smooth scrolling used to glide down to the footer).
  await page.goto("/about/");
  await home.click();
  await expect(page).toHaveURL(/\/$/);
  await atTop();
  // From further down the home page itself.
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await home.click();
  await atTop();
});

test("unknown paths render the styled 404", async ({ page }) => {
  const res = await page.goto("/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});
