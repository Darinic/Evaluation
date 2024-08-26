import { expect } from "@playwright/test";

import { testData } from "../data/testData";

export class EmployeePage {
  constructor(page) {
    this.page = page;
    this.nameLocator = page.locator('.v-subheader.theme--dark');
    this.lunchEditSection = page.locator('div.v-list__tile__title:has-text("Lunch Editing")');
    this.userExpensesSection = page.locator('div.v-list__tile__title:has-text("Users Expenses")');
    this.fridayLocator = page.locator('div.v-list__tile__title:has-text("Friday")');
    this.mcdonaldsLocator = page.locator('a.v-list__tile:has-text("McDonalds")');
    this.firstDishCardInFirstSection = this.page.locator('div.layout.row.wrap').nth(0).locator('div.dish-card').first();
    this.firstDishCardInSecondSection = this.page.locator('div.layout.row.wrap').nth(1).locator('div.dish-card').first();
    this.orderButton = this.page.locator('button.orders-list-button.v-btn.v-btn--round.theme--dark.secondary');
    this.ordersHistoryElement = this.page.locator('div.v-list__tile__title:has-text("Orders History")');

  }

  async validateEmployeeLogin() {
    await expect(this.nameLocator).toHaveText(testData.loggedInStandardUser, { timeout: 5000 });
  }

  async validateLunchEditSectionIsNotVisible() {
    await expect(this.lunchEditSection).not.toBeVisible();
  }

  async validateUserExpensesSectionIsNotVisible() {
    await expect(this.userExpensesSection).not.toBeVisible();
  }

  async selectAvailableDay() {
    const unselectedDayLocator = this.page.locator('div.v-list__tile').filter({
      hasNot: this.page.locator('i.v-icon.green--text:has-text("check")')
    }).first();

    if (await unselectedDayLocator.count() > 0) {
      await unselectedDayLocator.click();
      console.log('Clicked on an unselected day.');
    } else {
      console.log('No unselected days left.');
    }
  }


  async validateThatPurchaseWasSuccessful() {
    await this.ordersHistoryElement.click();

  }

  async createAnOrder( ) {
    await this.selectAvailableDay();

    await this.firstSoupLocator.click();
    await this.firstMainDishLocator.click();
    await this.orderButton.click();
  
    const cartSoupSelector = 'selector-for-first-soup-in-cart'; 
    const cartMainDishSelector = 'selector-for-first-main-dish-in-cart'; 
  
    await expect(this.page.locator(cartSoupSelector)).toBeVisible();
    await expect(this.page.locator(cartMainDishSelector)).toBeVisible();
  }
}