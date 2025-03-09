import {Locator, Page} from 'playwright';

export abstract class BaseElement {
    page: Page;
    element: Locator;
    selector: string;
    index: number;
    arrayOfElements: Locator;

    protected constructor(page: Page, selector: string, index: number = 0) {
        this.page = page;
        this.selector = selector;
        this.index = index;
        this.arrayOfElements = this.page.locator(selector);
        this.element = this.arrayOfElements.nth(index);
    }

    async click(options?: Record<string, unknown>): Promise<void> {
        if (!options) {
            await this.waitForVisible(20000);
        }
        await this.element.click(options);
    }

    async waitForVisible(timeToWait?: number): Promise<void> {
        await this.element.waitFor({state: 'visible', timeout: timeToWait});
    }

    async getText(): Promise<string> {
        await this.waitForVisible(10000);
        return (await this.element.innerText({timeout: 5000}))?.trim();
    }
}