import { expect } from "@playwright/test";

import { testData } from "../data/testData";

export class EmployeePage {
  constructor(page) {
    this.page = page;
    this.nameLocator = page.locator(".v-subheader.theme--dark");
    this.lunchEditSection = page.locator(
      'div.v-list__tile__title:has-text("Lunch Editing")'
    );
    this.userExpensesSection = page.locator(
      'div.v-list__tile__title:has-text("Users Expenses")'
    );
    this.ordersHistoryElement = this.page.locator(
      'div.v-list__tile__title:has-text("Orders History")'
    );
    this.firstDishCardInFirstSection = this.page
    .locator("div.layout.row.wrap")
    .nth(0)
    .locator("div.dish-card")
    .first();
  this.firstDishCardInSecondSection = this.page
    .locator("div.layout.row.wrap")
    .nth(1)
    .locator("div.dish-card")
    .first();
  this.pietuManijaItem = this.page
  .locator('.v-list__tile__title span:has-text("Pietu Manija")')
  }

  async validateEmployeeLogin() {
    await expect(this.nameLocator).toHaveText(testData.loggedInStandardUser, {
      timeout: 5000,
    });
  }

  async validateLunchEditSectionIsNotVisible() {
    await expect(this.lunchEditSection).not.toBeVisible();
  }

  async validateUserExpensesSectionIsNotVisible() {
    await expect(this.userExpensesSection).not.toBeVisible();
  }

  async validateThatPurchaseWasSuccessful() {
    await this.ordersHistoryElement.click();
  }

  //as it's available day to order
  async selectThursday() {
  const thursdayElement = this.page.locator('.v-list__tile:has-text("Thursday"):has(.v-icon.green--text)');

  await thursdayElement.waitFor({ state: 'visible', timeout: 10000 });

  await thursdayElement.click();

  console.log('Thursday element with green check mark has been clicked.');
  }

  async selectFirstItemAfterThursday() {
    for (let attempt = 0; attempt < 5; attempt++) {
        let firstItem = this.pietuManijaItem.first();

        await firstItem.click();
    }
  }

  async selectFirstSoupItem() {
    this.firstDishCardInSecondSection.click();
  }

  async selectFirstMainDishItem() {
    this.firstDishCardInFirstSection.click();
  }

  async extractFirstProductName() {
    let firstProductName = await this.firstDishCardInFirstSection.locator('div.v-card__text').textContent();
    return firstProductName.trim();
  }

  async validateProductInCart(productName) {
    let productLocator = this.page.locator(`.v-chip__content:has-text("${productName}")`);
    await expect(productLocator).toBeVisible({
      timeout: 5000,
    });
  }

  async reachPietuManijaPage() {
    await this.selectThursday();
    await this.selectFirstItemAfterThursday();

  }
}
