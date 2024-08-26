import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.errorMessage = page.locator("h3");
    this.headline = page.locator(".headline");
  }

  async goToLoginPage() {
    await this.page.goto("https://lunch.devbstaging.com/login-password");
    await expect(this.headline).toHaveText("Sign in");
  }

  async login(username, password) {
    await this.page.locator('input[name="email"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('button:has-text("Login")').click();
  }

  // Of course writing incorrect data should not make the page infinite load, but this test is more accustomed to the application how it currently operates
  async interceptGraphQL() {
    this.page.on("response", async (response) => {
      if (response.status() === 500 && response.url().includes("graphql")) {
        let responseBody = await response.json();

        let errorMessage = responseBody.errors[0].message;
        expect(errorMessage).toBe("Invalid Email or Password.");
      }
    });
  }
}
