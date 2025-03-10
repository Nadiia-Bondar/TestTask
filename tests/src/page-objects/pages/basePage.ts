import {expect} from 'playwright/test';
import {Page} from 'playwright';
import {UI_ENDPOINTS} from "../../data/constants/endPoints";
import {Button} from "../elements/button";

export abstract class BasePage {
    url: string;
    page: Page;

    protected constructor(page: Page, url: string, options?: { fullUrl?: string }) {
        if (options?.fullUrl) {
            this.url = options.fullUrl;
        } else {
            this.url = `${process.env.BASE_URL}${url}`;
        }
        this.page = page;
    }

    get logoutButton(): Button {
        return new Button(this.page, `//*[contains(text(),'Logout')]`);
    }

    get profileMenuButton(): Button {
        return new Button(this.page, '[name="nav-arrow-right"]');
    }

    getButton(text: string | number): Button {
        return new Button(this.page, `//*[contains(text(),'${text}')]`);
    }

    async navigateTo(
        url?: string,
        waitType = 'load' as 'load' | 'domcontentloaded' | 'networkidle',
        timeout = 30000
    ): Promise<void> {
        const finalUrl = url ? `${this.url}${url}` : this.url;
        await this.page.goto(finalUrl, {waitUntil: waitType, timeout});
    }

    async waitForUrlToContain(url: string, isContain: boolean = true): Promise<void> {
        isContain
            ? await expect.soft(this.page).toHaveURL(new RegExp(url), {timeout: 50000})
            : await expect.soft(this.page).not.toHaveURL(new RegExp(url), {timeout: 50000});
    }

    async waitForLoadState(
        state?: 'load' | 'domcontentloaded' | 'networkidle',
        options?: { timeout?: number }
    ): Promise<void> {
        await this.page.waitForLoadState(state, options);
    }

    async waitToBeLoaded(): Promise<void> {
        for (const condition of [true, false]) {
            try {
                await this.page.waitForSelector('.ant-spin-container', {
                    state: condition ? 'visible' : 'hidden',
                    timeout: condition ? 500 : 15000,
                });
            } catch (e) {
            }
        }
    }

    async waitSeconds(x: number): Promise<void> {
        return await this.page.waitForTimeout(x * 1000);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async logout(): Promise<void> {
        await this.navigateTo(UI_ENDPOINTS.ORDERS_OPEN);
        await this.profileMenuButton.click();
        await this.logoutButton.click();
        await this.waitForLoadState();
        await this.waitForUrlToContain(process.env.BASE_LANDING_URL);
    }
}
