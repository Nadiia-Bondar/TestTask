import {Page} from 'playwright';
import {BasePage} from "./basePage";
import {UI_ENDPOINTS} from "../../data/constants/endPoints";
import {Label} from "../elements/label";
import {expect} from "playwright/test";
import {Button} from "../elements/button";

export class DraftsPage extends BasePage {
    constructor(page: Page) {
        super(page, UI_ENDPOINTS.ORDERS_DRAFT);
    }

    draftItem(orderId: string): Label {
        return new Label(this.page, `[href="/customer/draft/${orderId}"]`);
    }

    draftTitle(orderId: string): Label {
        return new Label(this.page, `[href="/customer/draft/${orderId}"] h4`);
    }

    draftMoreActions(orderId: string): Label {
        return new Label(this.page, `[href="/customer/draft/${orderId}"] [name="more-vert"]`);
    }

    get deleteButton(): Button {
        return new Button(this.page, `.ant-modal-confirm-btns .ant-btn-dangerous`);
    }

    async checkDraftPresence(orderId: string, isPresent: boolean = true): Promise<void> {
        isPresent ?
            await expect.soft(this.draftItem(orderId).element).toBeVisible()
            : await expect.soft(this.draftItem(orderId).element).not.toBeVisible();
    }

    async checkDraftData(orderId: string, text: string): Promise<void> {
        await expect.soft(await this.draftTitle(orderId).getText()).toBe(text);
    }

    async discardDraft(orderId: string): Promise<void> {
        await this.draftItem(orderId).click();
        await this.waitForUrlToContain(UI_ENDPOINTS.draftById(orderId));
        await this.getButton('Discard draft').click();
        await this.deleteButton.click();
        await this.waitForUrlToContain(this.url);
        await this.checkDraftPresence(orderId, false);
    }
}