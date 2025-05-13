import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly deliveryButton: Locator;
  readonly openMapButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.deliveryButton = this.page.getByTestId("delivery-tab");
    this.openMapButton = this.page.getByTestId("open-map-btn");
  }

  async navigateToHomePage() {
    await this.page.goto("https://staging.njs-qa1.lji.li/");
  }

  async findAddress() {
    await this.deliveryButton.click();
    if (
      (await this.openMapButton.getAttribute("data-button-type")) == "Secondary"
    )
      await this.deliveryButton.click();
    expect(this.openMapButton).toBeEnabled();
    await this.openMapButton.click();
  }
}
