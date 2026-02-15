import { test, expect } from "@playwright/test";

test("landing page loads", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("heading")).toContainText("Motor Skills");
});

test("register child age 8 succeeds", async ({ page }) => {
  await page.goto("http://localhost:3000/register.html");
  await page.getByLabel("Parent Name").fill("Coach Lulu");
  await page.getByLabel("Parent Email").fill("coach@example.com");
  await page.getByLabel("Child Name").fill("Kid A");
  await page.getByLabel("Child Age").fill("8");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("#result")).toContainText("registration_id");
});

test("register child age 4 fails", async ({ page }) => {
  await page.goto("http://localhost:3000/register.html");
  await page.getByLabel("Parent Name").fill("Coach Lulu");
  await page.getByLabel("Parent Email").fill("coach@example.com");
  await page.getByLabel("Child Name").fill("Kid B");
  await page.getByLabel("Child Age").fill("4");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("#result")).toContainText("child_age_out_of_range");
});
