import {Page} from 'playwright';
import {BasePage} from "./basePage";
import {UI_ENDPOINTS} from "../../data/constants/endPoints";
import {Input} from "../elements/input";

export class DepositPage extends BasePage {
    constructor(page: Page) {
        super(page, UI_ENDPOINTS.DEPOSIT);
    }

    get acceptTerms(): Input {
        return new Input(this.page, `input[type="checkbox"]`);
    }

    get cardNumber(): Input {
        return new Input(this.page, `#ccnumber`);
    }

    get expiryDate(): Input {
        return new Input(this.page, `#cardExpiry`);
    }

    get cvvCode(): Input {
        return new Input(this.page, `#cvv2`);
    }

    get nameOnCard(): Input {
        return new Input(this.page, `#nameoncard`);
    }

    async selectAcceptTerms(): Promise<void> {
        await this.acceptTerms.click();
        await this.getButton('Proceed').click();
        await this.waitForLoadState();
        await this.waitToBeLoaded();
    }

    async fillCardDetails(cardDetails: {
        cardNumber: string;
        expiryDate: string;
        cvvCode: string;
        nameOnCard: string;
    }): Promise<void> {
        //const frame = this.page.frameLocator('iframe[name="coview-class-references"]');
        ///await frame.locator(this.cardNumber.selector).fill(cardDetails.cardNumber);
        // await this.page.keyboard.type(cardDetails.cardNumber);
        // await this.page.keyboard.type(cardDetails.expiryDate);
        // await this.page.keyboard.type(cardDetails.cvvCode);
        // await this.page.keyboard.type(cardDetails.nameOnCard);
        await this.cardNumber.fill(cardDetails.cardNumber);
        await this.expiryDate.fill(cardDetails.expiryDate);
        await this.cvvCode.fill(cardDetails.cvvCode);
        await this.nameOnCard.fill(cardDetails.nameOnCard);
    }

    async selectProceedPayment(): Promise<void> {
        await this.getButton('Proceed').click();
        await this.waitForUrlToContain(process.env.BASE_URL + UI_ENDPOINTS.DEPOSIT);
    }
}