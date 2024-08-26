import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { EmployeePage } from "../pages/employee-page";
import { AdminPage } from "../pages/admin-page";

import { testData } from "../data/testData";

test.describe("XXXXXX", async () => {
  let loginPage;
  let employeePage;
  let adminPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);
    adminPage = new AdminPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(testData.standardUser.name, testData.standardUser.password);
    await employeePage.validateEmployeeLogin();
  });

    test("XXXXXX", async () => {
        // Test code here
    });
});
