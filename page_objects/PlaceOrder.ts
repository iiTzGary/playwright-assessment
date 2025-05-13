import { expect, Locator, Page } from "@playwright/test";
import { PersonalizeYourItem } from "./PersonalizeYourItem";

export class PlaceOrder {
  readonly page: Page;
  readonly itemsList: Locator;
  readonly personalizeItem: PersonalizeYourItem;

  constructor(page: Page) {
    this.page = page;
    this.itemsList = this.page.getByTestId("menu-item-card");
    this.personalizeItem = new PersonalizeYourItem(this.page);
  }

  async addItems(items: string[]) {
    const count = await this.itemsList.count();
    items.forEach(async (item) => {
      for (let i = 0; i < count; i++) {
        const element = this.itemsList.nth(i);

        const itemName = await element
          .getByTestId("menu-item-title")
          .textContent();
        if (itemName == item) {
          await element.scrollIntoViewIfNeeded();
          await element.click();
          console.log(`Item added to the order: ${item?.trim()}`);
          if (await this.personalizeItem.selectOptions.isVisible()) {
            this.personalizeItem.selectCustumizableOptions([]);
          }
        }
      }
    });
  }
}
