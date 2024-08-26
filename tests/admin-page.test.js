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

  test("Admin should be able to add a provider", async ({ page }) => {
    await adminPage.goToLunchEditPage();

    await adminPage.clickAddProviderButton();

    let randomProviderName = await adminPage.generateRandomProviderName();
    let randomColor = await adminPage.generateRandomColor();

    await adminPage.fillInProviderFields(randomProviderName, randomColor);
    await adminPage.fillInSoupFields();
    await adminPage.fillInMainDishFields();
    await adminPage.saveButton.click();

    let addedProvider = adminPage.retrieveAddedProvider(randomProviderName);
    
    await expect(addedProvider).toHaveText(randomProviderName);
  });

  // THIS ONE IS EDITED AFTER THE EVALUATION WORKSHOP/BEFORE IT FAILED
  test("Total cost in Expenses should be calculated accurately", async () => {
    await adminPage.goToExpenses({ timeout: 10000 });
    await adminPage.selectAllRows();
    let totalCost = await adminPage.retrieveTotalCostText();
    let sumOfCosts = await adminPage.retrieveSumofCosts();
    expect(sumOfCosts).toBe(totalCost);
  });


// Newly added test after the evaluation workshop
  test("Price to pay in Expenses should be calculated accurately", async () => {
    await adminPage.goToExpenses({ timeout: 10000 });
    await adminPage.selectAllRows();
    let priceToPay = await adminPage.retrievePriceToPayText();
    let sumOfPriceToPay = await adminPage.retrieveSumofPriceToPay();
    expect(sumOfPriceToPay).toBe(priceToPay);
  });
});
