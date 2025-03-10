import {test} from '@playwright/test';
import {Page} from "playwright";
import {Initializer} from "../../config/initializer";
import {OrdersPage} from "../../page-objects/pages/ordersPage";
import {NewOrderPage} from "../../page-objects/pages/newOrderPage";
import {faker} from "@faker-js/faker";
import {DepositPage} from "../../page-objects/pages/depositPage";
import {DraftsPage} from "../../page-objects/pages/draftsPage";

const initializer = new Initializer();
let ordersPage: OrdersPage;
let newOrderPage: NewOrderPage;
let depositPage: DepositPage;
let draftsPage: DraftsPage;
let page: Page;
let orderId;

const orderOptions = {
    contentType: 'Website content',
    service: "Writing",
    language: "English (US)",
    size: {type: 'Pages', amountOfItems: 5, lineSpacing: "Double"},
    date: 12,
    topic: faker.person.lastName() + '_TASK_' + faker.word.sample(),
    theme: 'English',
    contentRequirements: faker.word.words(10)
}
const cardDetails = {
    cardNumber: "8171999900000000021",
    expiryDate: "1030",
    cvvCode: "737",
    nameOnCard: "user",
}

test.describe('Create order and discard draft', () => {
    test.beforeAll(async () => {
        page = await initializer.loginInApp();
        ordersPage = new OrdersPage(page);
        newOrderPage = new NewOrderPage(page);
        depositPage = new DepositPage(page);
        draftsPage = new DraftsPage(page);
    });

    test((`Create order`), async () => {
        await ordersPage.selectNewOrderButton();
        await newOrderPage.fillNewOrder(orderOptions);
        orderId = await newOrderPage.selectConfirmOrder();
        await depositPage.selectAcceptTerms();
        //await depositPage.fillCardDetails(cardDetails);
        //await depositPage.selectProceedPayment();
    });

    test((`Discard draft`), async () => {
        await draftsPage.navigateTo();
        await draftsPage.checkDraftPresence(orderId);
        await draftsPage.checkDraftData(orderId, orderOptions.topic);
        await draftsPage.discardDraft(orderId);
    });
});