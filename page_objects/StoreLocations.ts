import { expect, Locator, Page } from "@playwright/test";
//Store Locations class
export class StoreLocations {
  readonly page: Page;
  readonly enterLocation: Locator;
  constructor(page: Page) {
    this.page = page;
    this.enterLocation = this.page.getByTestId("map-dialog-input");
  }

  /**
   * Starts an order by searching an specific store and then hitting start order button
   * @param location
   */
  async startOrder(location: string) {
    await this.enterLocation.fill(location);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(5000);

    await this.page
      .getByTestId("store-address")
      .last()
      .waitFor({ state: "visible" });
    const storeList = this.page.getByTestId("store-list-item");
    const count = await storeList.count();
    this.page.waitForLoadState();
    for (let i = 0; i < count; i++) {
      const item = storeList.nth(i);
      const storeName = await item.getByTestId("store-address").textContent();
      if (storeName == location) {
        console.log(`Found store: ${storeName?.trim()}`);
        const button = item.getByTestId("start-my-order-button");
        await expect(button).toBeEnabled();
        await expect(button).toBeVisible();
        await button.click();
        break;
      }
    }
  }
}
