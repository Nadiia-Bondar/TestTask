import {Page} from 'playwright';
import {BasePage} from "./basePage";
import {Input} from "../elements/input";
import {Button} from "../elements/button";
import {Label} from "../elements/label";
import {UI_ENDPOINTS} from "../../data/constants/endPoints";
import {expect} from 'playwright/test';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page, '');
    }

    get logInButton(): Button {
        return new Button(this.page, `//*[contains(text(),'Log In')]`);
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
        return new Label(this.page, '[role="alert"]');
    }

    get logoutButton(): Button {
        return new Button(this.page, `//*[contains(text(),'Logout')]`);
    }

    get profileMenuButton(): Button {
        return new Button(this.page, '[name="nav-arrow-right"]');
    }

    async logout(): Promise<void> {
        await this.navigateTo();
        await this.profileMenuButton.click();
        await this.logoutButton.click();
        await this.waitForLoadState();
        await this.waitForUrlToContain(`${process.env.BASE_LANDING_URL}`);
    }

    async login(email: string, password: string): Promise<void> {
        await this.logInButton.click();
        await this.waitForUrlToContain(UI_ENDPOINTS.AUTH);
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
        await this.waitForUrlToContain(`${process.env.BASE_URL}`, false);
        expect.soft(await this.errorMessage.isVisible()).toBeTruthy();
        expect.soft(await this.errorMessage.getText()).toEqual(message);
    }
}
