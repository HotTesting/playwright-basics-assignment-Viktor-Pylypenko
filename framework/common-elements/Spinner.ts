import {expect, Locator, Page} from "@playwright/test";

export class Spinner {

    private static instance: Spinner;

    private spinner: Locator = this.page.locator('.spinner');

    private constructor(private page: Page) {}

    public static getInstance(page: Page): Spinner {
        if (!Spinner.instance) {
            Spinner.instance = new Spinner(page);
        }

        return Spinner.instance;
    }

    async assertSpinnerIsNotPresent() {
        await expect(this.spinner).toBeHidden();
    }

}