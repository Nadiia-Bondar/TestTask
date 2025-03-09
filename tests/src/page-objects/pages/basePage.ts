import {expect} from 'playwright/test';
import {Page} from 'playwright';

export abstract class BasePage {
    url: string;
    page: Page;

    protected constructor(page: Page, url: string, options?: { fullUrl?: string }) {
        this.page = page;
        if (options?.fullUrl) {
            this.url = options.fullUrl;
        } else {
            this.url = `${process.env.BASE_URL}${url}`;
        }
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
            ? await expect.soft(this.page).toHaveURL(new RegExp(url), {timeout: 30000})
            : await expect.soft(this.page).not.toHaveURL(new RegExp(url), {timeout: 30000});
    }

    async waitForLoadState(
        state?: 'load' | 'domcontentloaded' | 'networkidle',
        options?: { timeout?: number }
    ): Promise<void> {
        await this.page.waitForLoadState(state, options);
    }
}
