import {BaseElement} from './baseElement';
import {Page} from 'playwright';

export class Label extends BaseElement {
    constructor(page: Page, locator: string, index: number = 0) {
        super(page, locator, index);
    }
}