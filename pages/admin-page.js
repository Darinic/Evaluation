import { expect } from "@playwright/test";

import { testData } from "../data/testData";

export class AdminPage {
  constructor(page) {
    this.page = page;
    this.nameLocator = page.locator(".v-subheader.theme--dark");
    this.lunchEditBlock = page.locator(
      'a.v-list__tile:has-text("Lunch Editing")'
    );
    this.buildButton = page.locator(
      '.v-btn__content >> .v-icon:has-text("build")'
    );
    this.addProviderButton = page.locator(
      '.v-btn__content >> .v-icon:has-text("add")'
    );
    this.providerNameField = page.locator(
      'input[aria-label="Provider Name"][name="Provider Name"][role="combobox"]'
    );
    this.providerColorField = page.locator('input[aria-label="Color"]');
    this.addDishButton = page.locator('button:has-text("Dish")').nth(1);
    this.soupSelectionNameField = page.locator(
      'input[aria-label="Selection Name"][name="Sriubos (Soups) category"]'
    );
    this.soupPriceField = page.locator(
      'input[aria-label="Price"][name="Sriubos (Soups) category"]'
    );
    this.soupCountField = page.locator(
      'input[aria-label="Count"][name="Sriubos (Soups) category"]'
    );
    this.translationField = page.locator(
      '.v-text-field__slot >> input[aria-label="Translation"]'
    );
    this.saveButton = page.locator(
      'button.v-btn--flat.theme--dark:has-text("Save")'
    );
    this.mainDishesSection = page.locator(
      'div.v-list__tile__title:has-text("Pagrindiniai Patiekalai")'
    );
    this.mainDishPriceField = page.locator(
      'input[aria-label="Price"][name="Pagrindiniai Patiekalai (Main Dishes) category"]'
    );
    this.mainDishFieldSelection = page.locator(
      'input[aria-label="Selection Name"][name="Pagrindiniai Patiekalai (Main Dishes) category"]'
    );
    this.expensesSection = page.locator(
      'div.v-list__tile__title:has-text("Users Expenses")'
    );
    this.dropdown = page.locator(".v-select__selection");
    this.costCells = page.locator("tbody tr td:nth-child(4)");
    this.priceToPayCells = page.locator("tbody tr td:nth-child(3)");
    this.amountToCollectElement = this.page.locator('tfoot td:has-text("Amount to collect:") strong');
    this.listLocator = this.page.locator("div.v-list.v-list--subheader.theme--light");
    this.totalCostText = this.page.locator('td:has-text("Total cost:") span')
  }

  async validateAdminLogin() {
    await expect(this.nameLocator).toHaveText(testData.loggedInAdminUser);
  }

  async goToLunchEditPage() {
    await this.lunchEditBlock.click();
  }

  async clickAddProviderButton() {
    await this.buildButton.hover();
    await this.addProviderButton.click();
  }

  async fillInSoupFields() {
    await this.soupSelectionNameField.fill(testData.soupName);
    await this.soupPriceField.fill(testData.soupPrice);
    await this.soupCountField.fill(testData.soupCount);
  }

  async fillInMainDishFields() {
    await this.mainDishesSection.click();
    await this.mainDishFieldSelection.fill(testData.mainDishName);
    await this.mainDishPriceField.fill(testData.mainDishPrice);
  }

  async generateRandomProviderName() {
    let randomProviderName = `${testData.teamName}${Math.floor(
      Math.random() * 1000
    )}`;
    return randomProviderName;
  }

  async generateRandomColor() {
    let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  }

  async fillInProviderFields(providerName, color) {
    await this.providerNameField.fill(providerName);
    await this.providerColorField.fill(color);
  }

  async goToExpenses() {
    await this.expensesSection.click();
  }

  async retrieveSumofCosts() {
    let costsArray = [];
    let count = await this.costCells.count(); // Count the number of cells found

    for (let i = 0; i < count; i++) {
      let rawText = await this.costCells.nth(i).innerText(); // Get text content
      let value = parseFloat(rawText.replace("€", "").trim());

      costsArray.push(value || 0); // Push the value to the array, defaulting to 0 if NaN
    }
    // Calculate the sum of all cost values in the array
    let sumOfCosts = costsArray.reduce((acc, currentValue) => acc + currentValue,0);

    let roundedSumOfCosts = Math.round(sumOfCosts * 100) / 100;

    return roundedSumOfCosts;
  }

  async retrieveSumofPriceToPay() {
    let costsArray = [];
    let count = await this.priceToPayCells.count(); // Count the number of cells found

    for (let i = 0; i < count; i++) {
      let rawText = await this.priceToPayCells.nth(i).innerText(); // Get text content
      let value = parseFloat(rawText.replace("€", "").trim());

      costsArray.push(value || 0); // Push the value to the array, defaulting to 0 if NaN
    }
    // Calculate the sum of all cost values in the array
    let sumOfCosts = costsArray.reduce((acc, currentValue) => acc + currentValue,0);

    let roundedSumOfCosts = Math.round(sumOfCosts * 100) / 100;

    return roundedSumOfCosts;
  }

  async retrieveTotalCostText() {
    let totalCostText = await this.totalCostText.textContent();
    let totalCost = parseFloat(
      totalCostText.replace("Total cost:", "").replace("€", "").trim()
    );
    return totalCost;
  }

  async selectAllRows() {
    await this.dropdown.click();

    //if i put this in locator section, i cannot use waitFor, if I can't use waitFor, i do not force the timeout and it fails
    const allOption = this.page.locator('.v-list__tile__title:has-text("All")');
    
    await allOption.waitFor({ state: "visible", timeout: 3000 });
    await allOption.click();
  }

  async retrievePriceToPayText() {
    let rawText = await this.amountToCollectElement.textContent();
    let amountToCollect = parseFloat(rawText.replace('Amount to collect:', '').replace('€', '').trim());

    return amountToCollect;
  }

  async retrieveAddedProvider(providerName) {
    let addedProvider = this.listLocator.locator(`div.v-list__tile__title:has-text("${providerName}")`
);

    return addedProvider;
  }
}
