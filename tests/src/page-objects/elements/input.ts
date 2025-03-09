import {Page} from 'playwright';
import {BaseElement} from './baseElement';

export class Input extends BaseElement {
    constructor(page: Page, locator: string) {
        super(page, locator);
    }

    async fill(valueText: string): Promise<void> {
        await this.waitForVisible(10000);
        await this.element.fill(valueText);
    }
}