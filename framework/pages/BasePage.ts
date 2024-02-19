import { Locator, Page } from "@playwright/test";

export abstract class BasePage {

    protected abstract path: string;

    protected title: string = 'MERN Store';

    protected mainBlock: Locator = this.page.getByRole('main');

    constructor(protected page: Page) {}

    async open() {
        await this.page.goto(this.path);
    }

}