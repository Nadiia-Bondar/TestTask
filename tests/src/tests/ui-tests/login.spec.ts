import {LoginPage} from '../../page-objects/pages/loginPage';
import {faker} from '@faker-js/faker';
import {ERROR_MESSAGES} from '../../data/constants/errorMessages';
import {test} from '@playwright/test';
import {Page} from "playwright";
import {Initializer} from "../../config/initializer";
import {LandingPage} from "../../page-objects/pages/landingPage";

const initializer = new Initializer();
let loginPage: LoginPage;
let landingPage: LandingPage;
let page: Page;

test.describe('Login test', () => {
    test.beforeAll(async () => {
        page = await initializer.initPage();
        landingPage = new LandingPage(page);
        loginPage = new LoginPage(page);
    });

    [true, false].forEach((login) => {
        [true, false].forEach((password) => {
            const loginInput = login ? process.env.USER_LOGIN : faker.internet.email();
            const passwordInput = password ? process.env.USER_PASSWORD : faker.internet.password();
            test((`Login test with email: ${login} password: ${password}`), async () => {
                await landingPage.openLogin();
                await loginPage.login(`${loginInput}`, `${passwordInput}`);
                if (login && password) {
                    await loginPage.verifyUserIsLoggedIn();
                    await loginPage.logout();
                } else {
                    await loginPage.verifyUserIsNotLoggedIn(ERROR_MESSAGES.INCORRECT_EMAIL_OR_PASSWORD);
                }
            });
        });
    });
});
