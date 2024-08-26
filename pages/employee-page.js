import { expect } from "@playwright/test";

import { testData } from "../data/testData";

export class EmployeePage {
  constructor(page) {
    this.page = page;
    this.nameLocator = page.locator('.v-subheader.theme--dark');  
  }

  async validateEmployeeLogin() {
    await expect(this.nameLocator).toHaveText(testData.loggedInStandardUser, { timeout: 5000 });
  }
}