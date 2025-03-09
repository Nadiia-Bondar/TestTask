import {Page} from 'playwright';
import {BasePage} from "./basePage";
import {Button} from "../elements/button";
import {UI_ENDPOINTS} from "../../data/constants/endPoints";

export class OrdersPage extends BasePage {
    constructor(page: Page) {
        super(page, UI_ENDPOINTS.ORDERS_OPEN);
    }

    get newOrderButton(): Button {
        return new Button(this.page, `//*[contains(text(),'New order')]`);
    }

    async selectNewOrderButton(): Promise<void> {
        await this.newOrderButton.click();
        await this.waitForUrlToContain(UI_ENDPOINTS.NEW_ORDER);
    }
}