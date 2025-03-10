import {BaseElement} from './baseElement';
import {Page} from 'playwright';

export class Select extends BaseElement {
    constructor(page: Page, selectLocator: string, index: number = 0) {
        super(page, selectLocator, index);
    }
}