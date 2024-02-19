import {expect, Page} from "@playwright/test";

export class Toaster {

    private static instance: Toaster;

    private constructor(private page: Page) {}

    public static getInstance(page: Page): Toaster {
        if (!Toaster.instance) {
            Toaster.instance = new Toaster(page);
        }

        return Toaster.instance;
    }

    async assertWishlistToasterPresent(message: string) {
        await expect(this.page.getByRole('heading', {
            name: message,
            level: 4
        })).toBeVisible();
    }

}