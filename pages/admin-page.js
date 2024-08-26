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
    this.selectionNameField = page.locator(
      'input[aria-label="Selection Name"][name="Sriubos (Soups) category"]'
    );
    this.priceField = page.locator(
      'input[aria-label="Price"][name="Sriubos (Soups) category"]'
    );
    this.countField = page.locator(
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
  }

  async validateAdminLogin() {
    await expect(this.nameLocator).toHaveText(testData.loggedInAdminUser, {
      timeout: 5000,
    });
  }

  async goToLunchEditPage() {
    await this.lunchEditBlock.click();
  }

  async clickAddProviderButton() {
    await this.buildButton.hover();
    await this.addProviderButton.click();
  }

  async fillInSoupFields() {
    await this.selectionNameField.fill("Mega tasty soup");
    await this.priceField.fill("10");
    await this.countField.fill("2");
  }

  async fillInMainDishFields() {
    await this.mainDishesSection.click();
    await this.mainDishFieldSelection.fill("Mega tasty main dish");
    await this.mainDishPriceField.fill("10.50");
  }

  async generateRandomProviderName() {
    let randomProviderName = `JovitosTeam${Math.floor(Math.random() * 1000)}`;
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
    // Initialize an array to hold the cost values
    const costsArray = [];

    // Locate all cost cells in the 4th column and push their parsed values into the array
    const costs = await this.page
      .locator("tbody tr td:nth-child(4)")
      .evaluateAll((cells) => {
        return cells.map((cell) => {
          const rawText = cell.innerText;
          const value = parseFloat(rawText.replace("€", "").trim());
          return value || 0; // Return 0 if parsing fails to avoid NaN
        });
      });

    // Add the extracted values to the costsArray
    costsArray.push(...costs);

    // Calculate the sum of the array
    const sumOfCosts = costsArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    // Debugging output
    console.log(`Costs Array: ${costsArray}`);
    console.log(`Calculated Sum of Costs: ${sumOfCosts}`);

    return sumOfCosts;
  }

  async retrieveTotalCostText() {
    const totalCostText = await this.page
      .locator('td:has-text("Total cost:") span')
      .textContent();
    const totalCost = parseFloat(
      totalCostText.replace("Total cost:", "").replace("€", "").trim()
    );
    return totalCost;
  }
}
