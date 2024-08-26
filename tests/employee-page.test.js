import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { EmployeePage } from "../pages/employee-page";
import { AdminPage } from "../pages/admin-page";

import { testData } from "../data/testData";

test.describe("Employee page functionality", async () => {
  let loginPage;
  let employeePage;
  let adminPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);
    adminPage = new AdminPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(
      testData.standardUser.name,
      testData.standardUser.password
    );
  });

  test("Validate that admin sections are not visible", async () => {
    await employeePage.validateEmployeeLogin({ timeout: 5000 });
    await employeePage.validateLunchEditSectionIsNotVisible();
    await employeePage.validateUserExpensesSectionIsNotVisible();
  });

  //Modified and fixed after the evaluation, as it was not working
  test("After clicking on the soup it should be added to the cart", async () => {
    await employeePage.reachPietuManijaPage();
    await employeePage.selectFirstSoupItem();
    let firstProductName = await employeePage.extractFirstProductName();
    await employeePage.validateProductInCart(firstProductName);
  });

});
