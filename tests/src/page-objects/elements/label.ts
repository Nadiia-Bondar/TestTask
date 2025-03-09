import {BaseElement} from './baseElement';
import {Page} from 'playwright';

export class Label extends BaseElement {
    constructor(page: Page, locator: string) {
        super(page, locator);
    }
}