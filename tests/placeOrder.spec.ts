import { test } from "@playwright/test";
import { PageManager } from "../page_objects/PageManager";

test("Place an order at ticktuk store.", async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.navigateTo().navigateToHomePage();
  await pageManager.navigateTo().findAddress();
  await pageManager
    .goToStoreLocation()
    .startOrder("700 Wilshire Blvd, Santa Monica, CA 90401, USA");
  const items: string[] = [
    "Available Item - 24/7",
    "upsell item1",
    "Required Inner Section",
    "AU-MENU-ITEMS Complex Item - 2",
  ];
  await pageManager.createOrder().addItems(items);
});
