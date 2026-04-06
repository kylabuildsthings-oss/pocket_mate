import { test, expect } from "@playwright/test";

test.describe("PocketMate smoke", () => {
  test("onboarding → dashboard shows Demo mode", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("landing-open-dashboard").click();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText("Demo Active")).toBeVisible();
  });

  test("demo → live shows risk modal then Live state", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByTestId("mode-toggle-live").click();
    await expect(page.getByTestId("live-risk-modal")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Switch to Live Mode?" })
    ).toBeVisible();
    await page.getByTestId("live-risk-confirm").click();
    await expect(page.getByTestId("live-risk-modal")).toBeHidden();
    await expect(page.getByText(/Live ·/)).toBeVisible();
  });

  test("learn lesson renders", async ({ page }) => {
    await page.goto("/learn/what-is-defi");
    await expect(
      page.getByRole("heading", { name: /What is DeFi/i })
    ).toBeVisible();
  });

  test("trade shows simulated execution context", async ({ page }) => {
    await page.goto("/trade");
    await expect(page.getByText(/simulated/i)).toBeVisible();
  });

  test("hub shows strategy feed", async ({ page }) => {
    await page.goto("/hub");
    await expect(
      page.getByRole("heading", { name: "Strategy feed" })
    ).toBeVisible();
  });

  test("shell exposes main landmark and primary nav", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" })
    ).toBeVisible();
  });

  test("footer links to risk disclosures", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: "Risk disclosures" }).click();
    await expect(page).toHaveURL(/\/legal\/risk/);
    await expect(
      page.getByRole("heading", { name: "Risk disclosures" })
    ).toBeVisible();
  });
});
