import {Page} from 'playwright';
import {BaseElement} from './baseElement';

export class Input extends BaseElement {
    constructor(page: Page, locator: string, index: number = 0) {
        super(page, locator, index);
    }

    async fill(valueText: string): Promise<void> {
        await this.waitForVisible(10000);
        await this.element.fill(valueText);
    }
}