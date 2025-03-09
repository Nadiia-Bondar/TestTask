import {Page} from 'playwright';
import {BasePage} from "./basePage";
import {Button} from "../elements/button";
import {UI_ENDPOINTS} from "../../data/constants/endPoints";

export class NewOrderPage extends BasePage {
    constructor(page: Page) {
        super(page, UI_ENDPOINTS.NEW_ORDER);
    }

    get contentTypeDropdown(): Button {
        return new Button(this.page, `[data-icon="down"]`);
    }

    async fillNewOrder(orderOptions: {}): Promise<void> {
        await this.contentTypeDropdown.click();

    }
}