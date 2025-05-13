import { Locator, Page } from "@playwright/test";

export class PersonalizeYourItem {
  readonly page: Page;
  readonly selectOptions: Locator;
  readonly addToCartButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.selectOptions = this.page.getByTestId("menu-item-single-select-row");
    this.addToCartButton = this.page.getByTestId("add-to-cart-btn");
  }

  async selectCustumizableOptions(options: string[]) {
    options.forEach(async (option) => {
      await this.selectOptions
        .filter({ hasText: option })
        .getByTestId("single-select-input")
        .click();
    });
    await this.addToCartButton.click();
  }
}
