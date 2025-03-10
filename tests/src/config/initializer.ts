import {Browser, BrowserContext, chromium, Page} from 'playwright';
import {LoginPage} from '../page-objects/pages/loginPage';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({path: path.resolve('tests/.env')});

let browsers: { browser: Browser; context: BrowserContext };
let page: Page;

export class Initializer {
    async initPage(): Promise<Page> {
        const browser = await this.defaultBrowser(process.env.HEADLESS === '1');
        const context = await browser.newContext({
            viewport: {
                width: 1440,
                height: 800,
            },
            acceptDownloads: true,
        });

        browsers = {browser, context};
        page = await context.newPage();
        return page;
    }

    async defaultBrowser(headless: boolean): Promise<Browser> {
        const browserConfig = {
            headless: headless,
            args: ['--no-sandbox'],
        };
        return await chromium.launch(browserConfig);
    }

    async loginInApp(email = `${process.env.USER_LOGIN}`, password = `${process.env.USER_PASSWORD}`): Promise<Page> {
        const page = await this.initPage();
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.login(email, password);
        return page;
    }
}
