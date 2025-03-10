import {Page} from 'playwright';
import {BasePage} from "./basePage";
import {Button} from "../elements/button";

export class LandingPage extends BasePage {
    constructor(page: Page) {
        super(page, '', {fullUrl: process.env.BASE_LANDING_URL});
    }

    get logInButton(): Button {
        return new Button(this.page, `//*[contains(text(),'Log In')]`);
    }

    async openLogin(): Promise<void> {
        await this.navigateTo();
        await this.logInButton.click();
    }
}