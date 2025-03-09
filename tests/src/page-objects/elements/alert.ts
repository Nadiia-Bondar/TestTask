import {Page} from 'playwright';
import {BaseElement} from './baseElement';

export class Alert extends BaseElement {
    constructor(page: Page, locator: string) {
        super(page, locator);
    }

    async getAlertText(): Promise<string | undefined> {
        return this.getText();
    }
}