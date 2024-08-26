import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { EmployeePage } from "../pages/employee-page";
import { AdminPage } from "../pages/admin-page";

import { testData } from "../data/testData";

test.describe("DB Food ordering Page login testing", async () => {
  let loginPage;
  let employeePage;
  let adminPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);
    adminPage = new AdminPage(page);
    await loginPage.goToLoginPage();
  });

  test.describe("Validate successfull logins", async () => {
    test("Standard user should be able to log in Successfully", async () => {
      await loginPage.login(
        testData.standardUser.name,
        testData.standardUser.password
      );
      await employeePage.validateEmployeeLogin();
    });

    test("Admin user should be able to log in Successfully", async () => {
      await loginPage.login(
        testData.adminUser.name,
        testData.adminUser.password
      );
      await adminPage.validateAdminLogin(testData.loggedInAdminUser);
    });
  });

  test.describe("Validate unsuccessful logins", async () => {
    test("Invalid user should fail logging in and receives infinite loading spinner", async () => {
      await loginPage.interceptGraphQL();
      await loginPage.login(
        testData.invalidUser.name,
        testData.invalidUser.password
      );
    });

    test("User without a password should fail logging in and receives infinite loading spinner", async () => {
      await loginPage.interceptGraphQL();
      await loginPage.login(
        testData.emptyPassword.name,
        testData.emptyPassword.password
      );
    });

    test("User without a email should fail logging in and receives infinite loading spinner", async () => {
      await loginPage.interceptGraphQL();
      await loginPage.login(
        testData.emptyUsername.name,
        testData.emptyUsername.password
      );
    });

    test("User without a email and password should fail logging in and receives infinite loading spinner", async () => {
      await loginPage.interceptGraphQL();
      await loginPage.login(
        testData.emptyUsernameAndPassword.name,
        testData.emptyUsernameAndPassword.password
      );
    });
  });
});
