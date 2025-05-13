import { Page } from "@playwright/test";
import { HomePage } from "./Home";
import { StoreLocations } from "./StoreLocations";
import { PlaceOrder } from "./PlaceOrder";

export class PageManager {
  private readonly page: Page;
  private readonly home: HomePage;
  private readonly storeLocations: StoreLocations;
  private readonly placeOrder: PlaceOrder;
  constructor(page: Page) {
    this.page = page;
    this.home = new HomePage(this.page);
    this.storeLocations = new StoreLocations(this.page);
    this.placeOrder = new PlaceOrder(this.page);
  }

  navigateTo() {
    return this.home;
  }

  goToStoreLocation() {
    return this.storeLocations;
  }

  createOrder() {
    return this.placeOrder;
  }
}
