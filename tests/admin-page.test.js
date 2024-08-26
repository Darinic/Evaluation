import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { EmployeePage } from "../pages/employee-page";
import { AdminPage } from "../pages/admin-page";

import { testData } from "../data/testData";

test.describe("Admin Page functionality", async () => {
  let loginPage;
  let employeePage;
  let adminPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);
    adminPage = new AdminPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(testData.adminUser.name, testData.adminUser.password);
  });

  test('Admin should be able to add a provider', async ({ page }) => {
    await adminPage.goToLunchEditPage();

    await adminPage.clickAddProviderButton();

    let randomProviderName = await adminPage.generateRandomProviderName()
    let randomColor = await adminPage.generateRandomColor();

    await adminPage.fillInProviderFields(randomProviderName, randomColor);
    await adminPage.fillInSoupFields();
    await adminPage.fillInMainDishFields();
    await adminPage.saveButton.click();

    let listLocator = page.locator('div.v-list.v-list--subheader.theme--light');
    let addedProvider = listLocator.locator(`div.v-list__tile__title:has-text("${randomProviderName}")`);

    await expect(addedProvider).toBeVisible();
    await expect(addedProvider).toHaveText(randomProviderName);
  });

  //FAILED due to not calculating sums of costs correctly
  // test("Expenses should be calculated accurately for the admin", async () => {
  //   await adminPage.goToExpenses({ timeout: 10000 });
  //   let sumOfCosts = await adminPage.retrieveSumofCosts();
  //   let totalCost = await adminPage.retrieveTotalCostText();
  //   expect(sumOfCosts).toBe(totalCost);
  // });
});