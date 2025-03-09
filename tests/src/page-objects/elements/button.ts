import {BaseElement} from './baseElement';
import {Page} from 'playwright';

export class Button extends BaseElement {
    constructor(page: Page, buttonLocator: string, index: number = 0) {
        super(page, buttonLocator, index);
    }
}