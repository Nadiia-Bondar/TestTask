import {Page} from 'playwright';
import {BasePage} from "./basePage";
import {Input} from "../elements/input";
import {Button} from "../elements/button";
import {Label} from "../elements/label";
import {UI_ENDPOINTS} from "../../data/constants/endPoints";
import {expect} from 'playwright/test';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page, UI_ENDPOINTS.AUTH);
    }

    get enterEmailButton(): Button {
        return new Button(this.page, `[name="mail"]`);
    }

    get emailInput(): Input {
        return new Input(this.page, '[type="email"]');
    }

    get passwordInput(): Input {
        return new Input(this.page, '[type="password"]');
    }

    get continueButton(): Button {
        return new Button(this.page, `//*[contains(text(),'Continue')]`);
    }

    get errorMessage(): Label {
        return new Label(this.page, 'form-error div[role="alert"]', 1);
    }

    async login(email: string, password: string): Promise<void> {
        await this.waitForUrlToContain(this.url);
        await this.enterEmailButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.continueButton.click();
        await this.waitForLoadState();
    }

    async verifyUserIsLoggedIn(): Promise<void> {
        await this.waitForUrlToContain(process.env.BASE_URL + UI_ENDPOINTS.ORDERS_OPEN);
    }

    async verifyUserIsNotLoggedIn(message: string): Promise<void> {
        await this.waitForUrlToContain(process.env.BASE_URL + UI_ENDPOINTS.ORDERS_OPEN, false);
        await expect.soft(this.errorMessage.element).toBeVisible();
        expect.soft(await this.errorMessage.getText()).toEqual(message);
    }
}
