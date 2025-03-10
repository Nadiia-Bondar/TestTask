import {Page} from 'playwright';
import {BasePage} from "./basePage";
import {Button} from "../elements/button";
import {UI_ENDPOINTS} from "../../data/constants/endPoints";
import {Select} from "../elements/select";
import {Input} from "../elements/input";
import {expect} from 'playwright/test';

export class NewOrderPage extends BasePage {
    constructor(page: Page) {
        super(page, UI_ENDPOINTS.NEW_ORDER);
    }

    expandDropdownArrow(index: number = 0): Button {
        return new Button(this.page, `[data-icon="down"]`, index);
    }

    getDropDownOption(title: string): Select {
        return new Select(this.page, `[class*='option'][title="${title}"]`);
    }

    get plusIcon(): Button {
        return new Button(this.page, `iconoir[name="plus"]`, 1)
    }

    getDateTimeInput(index: number = 0): Input {
        return new Input(this.page, `#deadline`, index);
    }

    get topicInput(): Input {
        return new Input(this.page, `[name="topic"]`);
    }

    get contentRequirements(): Input {
        return new Input(this.page, `[class*=textarea]`);
    }

    async fillNewOrder(orderOptions: {
        contentRequirements: string;
        theme: string;
        topic: string;
        date: number;
        size: { type: string, amountOfItems: number, lineSpacing: string };
        language: string;
        service: string;
        contentType: string;
    }): Promise<void> {
        await this.expandDropdownArrow().click();
        await this.getDropDownOption(orderOptions.contentType).click();
        await this.getButton(orderOptions.service).click();
        await this.getButton(orderOptions.language).click();
        await this.getButton(orderOptions.size.type).click();
        for (let i = 0; i < orderOptions.size.amountOfItems - 1; i++) {
            await this.plusIcon.click();
        }
        await this.expandDropdownArrow(1).click();
        await this.getDropDownOption(orderOptions.size.lineSpacing).click();
        await this.getButton('Next').click();
        await this.getDateTimeInput().click();
        await this.page.getByRole('gridcell', {name: `${orderOptions.date}`}).click();
        await this.getButton('Next').click();
        await this.topicInput.fill(orderOptions.topic);
        await this.getButton('Next').click();
        await this.getButton(orderOptions.theme).click();
        await this.contentRequirements.fill(orderOptions.contentRequirements);
        await this.getButton('Next').click();
        await expect(this.getButton('Confirm').element).toBeEnabled({timeout: 30000});
    }

    async selectConfirmOrder(): Promise<string> {
        await this.getButton('Confirm').click();
        await this.waitForUrlToContain(process.env.BASE_URL + UI_ENDPOINTS.DEPOSIT);
        return (await this.getCurrentUrl()).split('orderId=')[1];
    }
}